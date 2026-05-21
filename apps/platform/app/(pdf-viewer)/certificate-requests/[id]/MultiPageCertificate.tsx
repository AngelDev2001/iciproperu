"use client"

import React from "react"
import {QRCodeSVG} from "qrcode.react";
import dayjs from "dayjs";
import 'dayjs/locale/es';

dayjs.locale('es');

const CertificateFront = ({ data }: any) => (
    <div className="h-full w-full p-[12mm] relative overflow-hidden font-sans bg-white">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <img src="/logo-iciproperu.png" alt="" className="w-[550px]" />
        </div>

        <div className="h-full w-full border-[1px] border-[#b08d57] p-1 relative flex flex-col items-center">
            <div className="h-full w-full border-[3px] border-[#b08d57] p-8 flex flex-col items-center justify-between bg-transparent">

                <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold text-[#004d40] leading-tight">
                        INSTITUTO DE CAPACITACIÓN INTEGRAL PROFESIONAL
                    </h2>
                    <p className="text-2xl font-serif text-[#b08d57] leading-none">
                        "SANTA ROSA DE LIMA"
                    </p>
                    <div className="text-[10px] text-zinc-500 font-medium">
                        <p>Inscrito en la Superintendencia Nacional de los Registros Públicos</p>
                        <p className="uppercase">
                            Partida Electrónica Nº 11293042 - RUC Nº 20610542124
                        </p>
                    </div>
                </div>

                <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                    <div>
                        <h1 className="text-5xl font-serif text-zinc-800">Certificado</h1>
                        <p className="text-sm text-zinc-500 mt-1 uppercase">Se otorga el presente a:</p>
                    </div>

                    <h3 className="text-4xl font-bold text-zinc-900 py-1">
                        {data.studentName}
                    </h3>

                    <div className="space-y-3 max-w-3xl mx-auto">
                        <p className="text-base text-zinc-600">
                            Por haber participado y aprobado satisfactoriamente el curso de:
                        </p>
                        <div className="bg-[#004d40] py-3 px-10 rounded-sm shadow-lg">
                            <h4 className="text-xl font-bold text-white uppercase">
                                {data.courseName}
                            </h4>
                        </div>
                        <p className="text-[11px] text-zinc-500">
                            Realizado por <span className="font-bold text-zinc-700 ">ICIPRO PERÚ - SANTA ROSA DE LIMA</span>, en la modalidad de <span className="font-bold text-zinc-700 uppercase">Educación Virtual</span>.
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-6">
                    <div className="flex justify-center items-center gap-8 py-2 border-y border-zinc-100">
                        <div className="text-center">
                            <p className="text-[9px] text-zinc-400 uppercase">Fecha de Inicio</p>
                            <p className="text-sm font-bold text-zinc-800">{dayjs(data.created_at).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="w-px h-6 bg-zinc-200"></div>
                        <div className="text-center">
                            <p className="text-[9px] text-zinc-400 uppercase">Horas Lectivas</p>
                            <p className="text-sm font-bold text-zinc-800">{data.courseHours}</p>
                        </div>
                        <div className="w-px h-6 bg-zinc-200"></div>
                        <div className="text-center">
                            <p className="text-[9px] text-zinc-400 uppercase">ID del Curso</p>
                            <p className="text-sm font-bold text-zinc-800">{data.certificateCode}</p>
                        </div>
                        <div className="w-px h-6 bg-zinc-200"></div>
                        <div className="text-center">
                            <p className="text-[9px] text-zinc-400 uppercase">Emisión</p>
                            <p className="text-sm font-bold text-zinc-800">Lima, {dayjs(data.created_at).format("DD [de] MMMM [del] YYYY")}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end px-10">
                        <div className="text-center">
                            <img src="/firma1.png" alt="" className="h-14 mb-[-15px] mix-blend-multiply relative z-10" />
                            <div className="w-40 border-t border-zinc-300"></div>
                            <p className="text-[9px] font-bold text-zinc-800 mt-1 uppercase">Lic. Angel Emilio Gala Flores</p>
                            <p className="text-[8px] text-zinc-500 uppercase">Coordinador Académico</p>
                            <p className="text-[8px] text-zinc-500 uppercase">ICIPRO PERÚ</p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 border border-zinc-100 rounded-md bg-white">
                                <QRCodeSVG
                                    value={`https://icipro.pe/verificar/${data.certificateCode}`}
                                    size={80}
                                    level="H"
                                    fgColor="#004d40"
                                    includeMargin={false}
                                    imageSettings={{
                                        src: "/logo-iciproperu.png",
                                        height: 20,
                                        width: 20,
                                        excavate: true,
                                    }}
                                />
                            </div>
                            <img src="/logo-peru-educa.png" alt="PeruEduca" className="h-7 opacity-60" />
                        </div>

                        <div className="text-center">
                            <img src="/firma2.png" alt="" className="h-14 mb-[-15px] mix-blend-multiply relative z-10" />
                            <div className="w-40 border-t border-zinc-300"></div>
                            <p className="text-[9px] font-bold text-zinc-800 mt-1 uppercase">Robert Flores Menzala</p>
                            <p className="text-[8px] text-zinc-500 uppercase">Director Académico</p>
                            <p className="text-[8px] text-zinc-500 uppercase">ICIPRO PERÚ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CertificateBack = ({ data }: any) => (
    <div className="h-full w-full bg-white p-[12mm] relative overflow-hidden font-sans text-zinc-800 flex flex-col">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <img src="/logo-iciproperu.png" alt="" className="w-[500px]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
            <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-[#004d40] leading-tight">
                    INSTITUTO DE CAPACITACIÓN INTEGRAL PROFESIONAL
                </h2>
                <p className="text-2xl font-serif text-[#b08d57] leading-none">
                    "SANTA ROSA DE LIMA"
                </p>
                <div className="text-[10px] text-zinc-500 font-medium">
                    <p>Inscrito en la Superintendencia Nacional de los Registros Públicos</p>
                    <p className="uppercase">
                        Partida Electrónica Nº 11293042 - RUC Nº 20610542124
                    </p>
                </div>
            </div>

            <div className="mt-6 text-center border-b-2 border-[#004d40] pb-2">
                <h2 className="text-2xl font-bold uppercase text-zinc-700">Constancia de Notas</h2>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-6 p-5 bg-zinc-50 rounded-lg border border-zinc-100">
                <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                        <span className="flex-1 self-start text-zinc-400 uppercase text-[10px] font-bold">Otorgado a:</span>
                        <span className="flex-2 self-start font-bold">{data.studentName}</span>
                    </p>
                    <p className="flex items-center">
                        <span className="flex-1 text-zinc-400 uppercase text-[10px] font-bold">Curso / Diploma:</span>
                        <span className="flex-2 font-bold leading-tight uppercase">{data.courseName}</span>
                    </p>
                </div>
                <div className="space-y-2 text-sm border-l border-zinc-200 pl-8">
                    <p className="flex items-center">
                        <span className="flex-1 text-zinc-400 uppercase text-[10px] font-bold">Código Registro:</span>
                        <span className="flex-2 font-mono font-bold text-[#b08d57]">{data.certificateCode}</span>
                    </p>
                    <p className="flex items-center">
                        <span className=" flex-1 text-zinc-400 uppercase text-[10px] font-bold">Fecha Emisión:</span>
                        <span className="flex-2 font-bold">Lima, {data.issueDate}</span>
                    </p>
                </div>
            </div>

            <div className="flex-1 mt-6">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-[#004d40] text-white uppercase text-[10px]">
                        <th className="py-3 px-4 text-left rounded-tl-lg w-20">Módulo</th>
                        <th className="py-3 px-4 text-left">Temas de Aprendizaje</th>
                        <th className="py-3 px-4 text-center w-24">Horas</th>
                        <th className="py-3 px-4 text-center w-28 rounded-tr-lg">Calificación</th>
                    </tr>
                    </thead>
                    <tbody className="text-[12px]">
                    {data.syllabus.map((item: any, index: number) => (
                        <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50/50">
                            <td className="py-2.5 px-4 font-bold text-zinc-400">{(index + 1).toString().padStart(2, '0')}</td>
                            <td className="py-2.5 px-4 font-medium text-zinc-700">{item.topic}</td>
                            <td className="py-2.5 px-4 text-center text-zinc-500">20</td>
                            <td className="py-2.5 px-4 text-center font-black text-[#004d40]">{item.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-4 flex justify-between items-start px-4 text-[11px] uppercase">
                    <div className="space-y-1">
                        <p className=" text-zinc-600">Total de horas: <span className="font-bold text-zinc-800">{data.hours} HRS</span></p>
                        <p className=" text-zinc-600">Calificación Promedio: <span className="font-bold text-zinc-800">18 (Dieciocho)</span></p>
                        <p className=" text-zinc-600">Coordinador / Asesor: <span className="font-bold text-zinc-800">Lic. Angel Emilio Gala Flores</span></p>
                        <div className="font-bold">
                            <p>Según Consta en los registros institucionales, Libro 02, Registro Nº {data.certificateCode.replace('SRL', '')}-2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto py-6 flex flex-col items-center gap-2 border-t border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">En colaboración con:</p>
                <div className="flex gap-8 items-center justify-center">
                    <img src="/logo-hbn-agency.png" alt="HBN" className="h-10" />
                    <img src="/logo-policia-emprendedor.png" alt="Policia" className="h-10" />
                    <img src="/logo-legaliter-bufette-juridico.png" alt="Legaliter" className="h-10" />
                </div>
            </div>

            <div className="flex justify-between items-end px-10 pb-4">
                <div className="text-center">
                    <img src="/firma1.png" alt="" className="h-14 mb-[-15px] mix-blend-multiply relative z-10" />
                    <div className="w-40 border-t border-zinc-300"></div>
                    <p className="text-[9px] font-bold text-zinc-800 mt-1 uppercase">Lic. Angel Emilio Gala Flores</p>
                    <p className="text-[8px] text-zinc-500 uppercase leading-none">Coordinador Académico</p>
                    <p className="text-[8px] text-zinc-500 uppercase font-medium">ICIPRO PERÚ</p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="p-2 border border-zinc-100 rounded-md bg-white shadow-sm">
                        <QRCodeSVG
                            value={`https://icipro.pe/verificar/${data.certificateCode}`}
                            size={70}
                            level="H"
                            fgColor="#004d40"
                            includeMargin={false}
                            imageSettings={{
                                src: "/logo-iciproperu.png",
                                height: 16,
                                width: 16,
                                excavate: true,
                            }}
                        />
                    </div>
                    <img src="/logo-peru-educa.png" alt="PeruEduca" className="h-7 opacity-60" />
                </div>

                <div className="text-center">
                    <img src="/firma2.png" alt="" className="h-14 mb-[-15px] mix-blend-multiply relative z-10" />
                    <div className="w-40 border-t border-zinc-300"></div>
                    <p className="text-[9px] font-bold text-zinc-800 mt-1 uppercase">Robert Flores Menzala</p>
                    <p className="text-[8px] text-zinc-500 uppercase leading-none">Director Académico</p>
                    <p className="text-[8px] text-zinc-500 uppercase font-medium">ICIPRO PERÚ</p>
                </div>
            </div>
        </div>
    </div>
);

export function MultiPageCertificate({ data }: { data: any }) {
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="page-landscape bg-white shadow-2xl print:shadow-none"
                 style={{
                     width: '297mm',
                     height: '210mm',
                     position: 'relative',
                     overflow: 'hidden',
                     display: 'block'
                 }}>
                <CertificateFront data={data} />
            </div>

            <div className="page-portrait bg-white shadow-2xl print:shadow-none"
                 style={{
                     width: '210mm',
                     height: '297mm',
                     position: 'relative',
                     overflow: 'hidden',
                     display: 'block'
                 }}>
                <CertificateBack data={data} />
            </div>

            <style jsx global>{`
                @media print {
                    @page landscape-page {
                        size: 297mm 210mm landscape;
                        margin: 0;
                    }

                    @page portrait-page {
                        size: 210mm 297mm portrait;
                        margin: 0;
                    }

                    .page-landscape {
                        page: landscape-page;
                        break-after: page;
                        width: 297mm !important;
                        height: 210mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    .page-portrait {
                        page: portrait-page;
                        width: 210mm !important;
                        height: 297mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    )
}