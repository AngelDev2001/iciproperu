"use client"

import {useEffect, useState} from "react"
import {useParams, useRouter} from "next/navigation"
import {ArrowLeft, Download, Loader2, Printer, Share2, ZoomIn, ZoomOut} from "lucide-react"
import {Button} from "@/components/ui/button"
import {MultiPageCertificate} from "@/app/(pdf-viewer)/certificate-requests/[id]/MultiPageCertificate";
import {getCertificateById} from "@/actions/certificate-actions";

export default function CertificateViewPage() {
    const router = useRouter();
    const params = useParams();
    const [zoom, setZoom] = useState(100);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCertificate() {
            try {
                setLoading(true);

                const result = await getCertificateById(params.id as string);

                if (!result.success || !result.data) {
                    throw new Error(result.error || "No se encontró el certificado");
                }

                const cert = result.data;

                console.log("cert: ", cert);

                setData({
                    studentName: `${cert.first_names} ${cert.paternal_surname} ${cert.maternal_surname || ''}`.trim(),
                    courseName: cert.course_name,
                    courseHours: cert.course_hours,
                    startDate: cert.start_date,
                    hours: cert.total_hours,
                    certificateCode: cert.certificate_code,
                    issueDate: cert.approved_at
                        ? new Date(cert.approved_at).toLocaleDateString('es-PE', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })
                        : 'Fecha no disponible',
                    syllabus: cert?.grades_snapshot?.map((m: any) => ({
                        topic: m.topic,
                        score: m.score
                    })) || []
                });
            } catch (error) {
                console.error("Error cargando certificado:", error);
            } finally {
                setLoading(false);
            }
        }

        if (params.id) fetchCertificate();
    }, [params.id]);

    const handlePrint = () => {
        window.print()
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-[#b08d57] animate-spin" />
            </div>
        )
    }

    if (!data) return <div className="text-white">Certificado no encontrado.</div>;

    return (
        <div className="min-h-screen  flex flex-col items-center">

            <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-3 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl z-50 print:hidden">
                <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.min(prev + 10, 150))} className="text-white hover:bg-zinc-700">
                    <ZoomIn className="h-5 w-5" />
                </Button>
                <div className="text-center text-[10px] font-bold text-zinc-500">{zoom}%</div>
                <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.max(prev - 10, 50))} className="text-white hover:bg-zinc-700">
                    <ZoomOut className="h-5 w-5" />
                </Button>
                <hr className="border-zinc-700" />
                <Button variant="ghost" size="icon" onClick={handlePrint} className="text-white hover:bg-zinc-700">
                    <Printer className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-700">
                    <Download className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-700">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            <div className="absolute top-6 left-6 print:hidden">
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
                </Button>
            </div>

            <div
                className="my-10"
            >
                <MultiPageCertificate data={data} />
            </div>

            <style jsx global>{`
    @media print {
        .print\:hidden { display: none !important; }
        html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important;
            overflow: visible !important;
        }
    }
`}</style>
        </div>
    )
}