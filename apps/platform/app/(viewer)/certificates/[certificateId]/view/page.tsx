"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {ArrowLeft, Download, Printer, Share2, ZoomIn, ZoomOut} from "lucide-react"
import {Button} from "@/components/ui/button"
import {MultiPageCertificate} from "@/app/(viewer)/certificates/MultiPageCertificate";

const mockData = {
    studentName: "ANGEL GALA",
    courseName: "Especialista en Gestión Pública SIGA/SIAF",
    syllabus: [
        { topic: "Introducción a los Sistemas Administrativos" },
        { topic: "Módulo de Configuración de Tablas" },
        { topic: "Gestión de Pedidos y Almacenes" },
        { topic: "Devengado y Giro de Comprobantes" },
    ]
}

export default function CertificateViewPage() {
    const router = useRouter()
    const [zoom, setZoom] = useState(100)

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col items-center">

            {/* Barra de Herramientas Flotante */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-3 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl z-50 print:hidden">
                <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.min(prev + 10, 150))} className="text-white hover:bg-zinc-700">
                    <ZoomIn className="h-5 w-5" />
                </Button>
                <div className="text-center text-[10px] font-bold text-zinc-500">{zoom}%</div>
                <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.max(prev - 10, 50))} className="text-white hover:bg-zinc-700">
                    <ZoomOut className="h-5 w-5" />
                </Button>
                <hr className="border-zinc-700" />
                <Button variant="ghost" size="icon" onClick={handlePrint} className="text-primary hover:bg-primary/10">
                    <Printer className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-700">
                    <Download className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-700">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            {/* Botón Volver */}
            <div className="absolute top-6 left-6 print:hidden">
                <Button variant="outline" className="text-white border-zinc-700 hover:bg-zinc-800" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
                </Button>
            </div>

            <div className="my-10">
                <MultiPageCertificate data={mockData} />
            </div>

            {/* Estilos para impresión */}
            <style jsx global>{`
        @media print {
          body { background: white !important; margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          @page { size: A4 landscape; margin: 0; }
        }
      `}</style>
        </div>
    )
}