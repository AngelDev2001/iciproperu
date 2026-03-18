"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {FileBadge2, FileText, Plus, Search} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {IconBrandWhatsapp} from "@tabler/icons-react";

// Datos de ejemplo (Mock data) para visualizar la tabla
const certificatesData = [
    {
        id: "1",
        code: "ICP-2026-001",
        student: "Angel Gala",
        course: "Gestión Pública SIGA/SIAF",
        issueDate: "14/03/2026",
        status: "Emitido"
    },
    {
        id: "2",
        code: "ICP-2026-042",
        student: "Juan Perez",
        course: "Desarrollo Web Fullstack",
        issueDate: "12/03/2026",
        status: "Emitido"
    },
]

export default function CertificatesPage() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileBadge2 className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight">Certificados Emitidos</h2>
                </div>
                <Button onClick={() => router.push("/certificates-requests/new")}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Trámite
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Documentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Barra de búsqueda */}
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por alumno o código..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Tabla de Certificados */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[150px]">Código</TableHead>
                                    <TableHead>Alumno</TableHead>
                                    <TableHead>Curso</TableHead>
                                    <TableHead>Fecha Emisión</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Documento</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {certificatesData.map((cert) => (
                                    <TableRow key={cert.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-mono text-xs font-bold">
                                            {cert.code}
                                        </TableCell>
                                        <TableCell className="font-medium">{cert.student}</TableCell>
                                        <TableCell>{cert.course}</TableCell>
                                        <TableCell>{cert.issueDate}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                                {cert.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                {/* Ver PDF (El que ya teníamos) */}
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                                    <FileText className="h-4 w-4" />
                                                </Button>

                                                {/* Enviar por WhatsApp */}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                                    onClick={() => console.log("Enviando por WhatsApp...")}
                                                >
                                                    <IconBrandWhatsapp/>
                                                </Button>

                                                {/* Enviar por Email */}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                                                    onClick={() => console.log("Enviando por Email...")}
                                                >
            <span className="relative flex h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}