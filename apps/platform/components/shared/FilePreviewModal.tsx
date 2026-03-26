import * as React from "react"
import {Download, RotateCw, ZoomIn, ZoomOut} from "lucide-react"
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"

interface FilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    fileName: string;
}

export function FilePreviewModal({
                                     isOpen,
                                     onClose,
                                     fileUrl,
                                     fileName
                                 }: FilePreviewModalProps) {
    const [scale, setScale] = React.useState(1);
    const [rotation, setRotation] = React.useState(0);
    // Estado para el movimiento (Pan)
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const isPDF = fileName.toLowerCase().endsWith('.pdf');

    // Resetear ajustes al cerrar o cambiar
    React.useEffect(() => {
        if (!isOpen) {
            setScale(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen, fileUrl]);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => {
        const newScale = Math.max(scale - 0.25, 0.5);
        if (newScale <= 1) setPosition({ x: 0, y: 0 }); // Resetear posición si vuelve al tamaño original
        setScale(newScale);
    };

    const handleRotate = () => setRotation(prev => (prev + 90) % 360);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();
    };

    // Lógica de Zoom con Rueda del Ratón
    const handleWheel = (e: React.WheelEvent) => {
        if (isPDF) return; // No interferir con el scroll del PDF
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    // Lógica de Arrastre (Panning)
    const onMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || scale <= 1) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const onMouseUp = () => setIsDragging(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* Agregamos un ajuste al DialogContent para que la X de cierre sea visible y esté al frente */}
            <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden border-none shadow-none [&>button]:z-50 [&>button]:right-4 [&>button]:top-4">
                <Card className="w-full h-full flex flex-col shadow-2xl overflow-hidden border-none p-0 gap-0">
                    <CardHeader className="p-4 bg-background border-b flex flex-row items-center justify-between space-y-0 pr-12">
                        <div className="flex flex-col min-w-0">
                            <DialogTitle className="text-sm font-semibold truncate max-w-[300px] md:max-w-md">
                                {fileName}
                            </DialogTitle>
                            <span className="text-[10px] text-muted-foreground uppercase font-medium">
                                Vista Previa de Recurso
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            {!isPDF && (
                                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 mr-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut} title="Alejar">
                                        <ZoomOut className="h-4 w-4" />
                                    </Button>
                                    <div className="text-[10px] font-mono w-10 text-center">
                                        {Math.round(scale * 100)}%
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn} title="Acercar">
                                        <ZoomIn className="h-4 w-4" />
                                    </Button>
                                    <div className="w-[1px] h-4 bg-border mx-1" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRotate} title="Rotar">
                                        <RotateCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            <Button
                                variant="default"
                                size="sm"
                                className="h-8 gap-2 px-3"
                                onClick={handleDownload}
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Descargar</span>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent
                        className="flex-1 relative overflow-hidden flex items-center justify-center bg-neutral-100/50 p-0 cursor-grab active:cursor-grabbing"
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onWheel={handleWheel}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            {isPDF ? (
                                <iframe
                                    src={`${fileUrl}#toolbar=0&navpanes=0`}
                                    className="w-full h-full"
                                    title={fileName}
                                />
                            ) : (
                                <div
                                    className="transition-transform duration-200 ease-out flex items-center justify-center"
                                    style={{
                                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                                    }}
                                >
                                    <img
                                        src={fileUrl}
                                        alt={fileName}
                                        className="max-w-full max-h-[65vh] object-contain shadow-2xl border bg-white pointer-events-none"
                                        draggable={false}
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="p-3 bg-background border-t justify-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-2">
                            {isPDF ? 'Visor de PDF' : scale > 1 ? 'Modo Panorámico Activo (Arrastra para mover • Scroll para Zoom)' : 'Visor de Imagen'}
                        </p>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
}