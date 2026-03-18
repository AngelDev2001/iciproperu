"use client"

import React from "react"
import {QrCode} from "lucide-react"

// --- HOJA 1: CERTIFICADO (ANVERSO) ---
const CertificateFront = ({ data }: any) => (
    <div className="h-full w-full bg-white p-[10mm] relative overflow-hidden">
        {/* Marco Dorado Doble */}
        <div className="h-full w-full border-[6px] border-double border-[#b08d57] p-8 flex flex-col items-center justify-between relative bg-white">

            {/* Encabezado: Logos e Institución */}
            <div className="w-full flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="h-14 w-14 bg-[#b08d57] rounded-full flex items-center justify-center text-white font-bold text-xs uppercase text-center p-1">Logo Icipro</div>
                    <span className="font-bold text-zinc-800 text-lg">Icipro Perú</span>
                </div>
                <div className="text-center flex-1 mx-4">
                    <p className="text-[10px] uppercase font-bold text-zinc-500">Instituto de Capacitación Integral Profesional</p>
                    <h2 className="text-2xl font-serif font-bold text-[#b08d57] uppercase leading-tight">"SANTA ROSA DE LIMA"</h2>
                    <p className="text-[8px] text-zinc-400 italic">Inscrito en los Registros Públicos - Partida Electrónica N° 11204412</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="h-10 w-24 bg-red-600 flex items-center justify-center text-white font-bold text-[10px]">PERÚEDUCA</div>
                </div>
            </div>

            {/* Título Principal */}
            <div className="text-center space-y-2 mt-4">
                <p className="text-sm font-medium text-zinc-600">Se otorga el presente a:</p>
                <h1 className="text-5xl font-serif font-bold text-zinc-900 tracking-tighter">Certificado</h1>
                <p className="text-sm font-medium text-zinc-600 pt-2">A favor de:</p>
                <h3 className="text-3xl font-bold text-[#b08d57] border-b-2 border-zinc-100 px-8 pb-1 inline-block uppercase">
                    {data.studentName}
                </h3>
            </div>

            {/* Cuerpo del texto */}
            <div className="text-center space-y-4">
                <p className="text-sm text-zinc-600 max-w-2xl mx-auto">
                    Por haber participado y aprobado satisfactoriamente el <br/>
                    <span className="font-bold text-zinc-800 uppercase italic">Curso de Capacitación:</span>
                </p>
                <div className="bg-[#004d40] text-white py-3 px-10 rounded-sm inline-block shadow-lg">
                    <h4 className="text-xl font-bold uppercase tracking-wide">{data.courseName}</h4>
                </div>
            </div>

            {/* Datos y Sello Central */}
            <div className="w-full grid grid-cols-3 items-center mt-6">
                <div className="text-[11px] space-y-1 font-medium text-zinc-700 uppercase">
                    <p>FECHA DE INICIO: <span className="font-bold">{data.startDate}</span></p>
                    <p>HORAS ACADÉMICAS: <span className="font-bold">{data.hours} HRS</span></p>
                    <p>CÓDIGO: <span className="font-bold">{data.certificateCode}</span></p>
                    <p>FECHA: <span className="font-bold">{data.issueDate}</span></p>
                </div>

                <div className="flex justify-center">
                    {/* Sello Dorado Circular */}
                    <div className="h-28 w-28 border-4 border-[#b08d57] rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-2 border border-[#b08d57] rounded-full border-dashed"></div>
                        <div className="text-center text-[#b08d57] font-bold text-[10px]">
                            <p>ICIPRO</p>
                            <p className="text-xs">SELLO</p>
                            <p>OFICIAL</p>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <div className="h-20 flex flex-col justify-end items-center">
                        <div className="w-40 border-t border-zinc-400"></div>
                        <p className="text-[9px] font-bold uppercase text-zinc-800 leading-tight mt-1">
                            Lic. Angel Emilio Aceres <br/> <span className="text-zinc-500 font-medium">Director General ICIPRO PERÚ</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

// --- HOJA 2: CONSTANCIA DE NOTAS (REVERSO) ---
const CertificateBack = ({ data }: any) => (
    <div className="h-full w-full bg-white p-[10mm] relative overflow-hidden">
        <div className="h-full w-full border-[6px] border-double border-[#b08d57] p-8 flex flex-col justify-between bg-white">

            {/* Encabezado Hoja 2 */}
            <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-zinc-800 uppercase tracking-widest">Constancia de Notas</h2>
                <p className="text-xs font-bold text-[#b08d57] uppercase tracking-tighter">"SANTA ROSA DE LIMA"</p>
                <h3 className="text-lg font-bold uppercase underline decoration-[#b08d57] underline-offset-4">{data.studentName}</h3>
            </div>

            {/* Tabla de Calificaciones / Syllabus */}
            <div className="flex-1 my-6 overflow-hidden">
                <table className="w-full text-xs border-collapse">
                    <thead>
                    <tr className="bg-zinc-100 text-zinc-700 uppercase">
                        <th className="border p-2 text-left w-12">N°</th>
                        <th className="border p-2 text-left">Módulos de Aprendizaje / Contenido Detallado</th>
                        <th className="border p-2 text-center w-24">Calificación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.syllabus.map((item: any, index: number) => (
                        <tr key={index} className="hover:bg-zinc-50 transition-colors">
                            <td className="border p-2 text-center text-zinc-500">{index + 1}</td>
                            <td className="border p-2 font-medium text-zinc-700">{item.topic}</td>
                            <td className="border p-2 text-center font-bold text-zinc-900">18</td>
                        </tr>
                    ))}
                    {/* Relleno para completar el espacio si hay pocos temas */}
                    {Array.from({ length: Math.max(0, 8 - data.syllabus.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} className="h-8">
                            <td className="border p-2"></td>
                            <td className="border p-2"></td>
                            <td className="border p-2"></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Hoja 2: QR y Firmas */}
            <div className="grid grid-cols-3 gap-4 items-end">
                <div className="text-[10px] space-y-1 font-mono uppercase text-zinc-500">
                    <p>Total Horas: {data.hours}</p>
                    <p>N° Registro: {data.certificateCode}</p>
                    <p>Promedio: 18 (Dieciocho)</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="p-1 border border-zinc-200 rounded-sm mb-1">
                        <QrCode className="h-16 w-16 text-zinc-800" />
                    </div>
                    <p className="text-[8px] font-bold text-zinc-400">Verificación de Certificados</p>
                </div>

                <div className="text-center">
                    <p className="text-[10px] font-medium text-zinc-700 mb-8">Lima, {data.issueDate}</p>
                    <div className="flex flex-col items-center">
                        <div className="w-32 border-t border-zinc-400"></div>
                        <p className="text-[8px] font-bold uppercase mt-1">Coordinador Académico</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

// --- COMPONENTE PRINCIPAL ---
export function MultiPageCertificate({ data }: { data: any }) {
    return (
        <div className="flex flex-col items-center gap-10 pb-20 print:gap-0 print:pb-0">
            {/* PÁGINA 1 */}
            <div className="bg-white shadow-2xl print:shadow-none" style={{ width: '297mm', height: '210mm', breakAfter: 'page' }}>
                <CertificateFront data={data} />
            </div>

            {/* PÁGINA 2 */}
            <div className="bg-white shadow-2xl print:shadow-none" style={{ width: '210mm', height: '297mm', breakAfter: 'page' }}>
                <CertificateBack data={data} />
            </div>

            <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; }
          @page { size: A4 landscape; margin: 0; }
        }
      `}</style>
        </div>
    )
}