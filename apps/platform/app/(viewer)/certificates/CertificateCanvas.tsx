export function CertificateCanvas() {
    return (
        <div
            className="bg-white text-black shadow-2xl relative overflow-hidden"
            style={{
                width: '297mm',
                height: '210mm',
                padding: '15mm',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Borde Decorativo Externo */}
            <div className="border-[10px] border-double border-amber-600 h-full w-full p-8 flex flex-col items-center justify-between relative">

                {/* Marca de agua o fondo sutil */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                    <h1 className="text-[120px] font-bold -rotate-45 italic">ICIPRO PERÚ</h1>
                </div>

                {/* Logo y Encabezado */}
                <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        IP
                    </div>
                    <h1 className="text-5xl font-serif tracking-widest text-amber-800 uppercase">Certificado</h1>
                    <p className="text-xl font-medium">Otorgado a:</p>
                </div>

                {/* Nombre del Alumno */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-6xl font-serif text-zinc-900 border-b-2 border-zinc-300 px-10 pb-2">
                        Angel Gala
                    </h2>
                    <p className="text-lg text-zinc-600 mt-4 max-w-2xl text-center leading-relaxed">
                        Por haber completado satisfactoriamente el curso de especialización profesional en:
                        <br />
                        <strong className="text-zinc-800">DESARROLLO WEB FULLSTACK CON NEXT.JS & SUPABASE</strong>
                    </p>
                </div>

                {/* Footer: Firmas y Fecha */}
                <div className="w-full flex justify-around items-end pb-8">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-48 border-t border-zinc-400"></div>
                        <p className="text-sm font-bold uppercase text-zinc-700">Director Académico</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="bg-zinc-100 p-2 border border-zinc-200 mb-2">
                            {/* Aquí iría el QR dinámico */}
                            <div className="w-16 h-16 bg-zinc-300 flex items-center justify-center text-[8px]">QR VERIFICATION</div>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-500 italic">ID: ICP-2026-001</p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-48 border-t border-zinc-400"></div>
                        <p className="text-sm font-bold uppercase text-zinc-700">Firma Autorizada</p>
                    </div>
                </div>
            </div>
        </div>
    )
}