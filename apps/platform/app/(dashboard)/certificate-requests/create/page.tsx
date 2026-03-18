"use client"

import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {ArrowLeft, BookOpen, FileText, Fingerprint, Send, User} from "lucide-react"

const requestSchema = z.object({
    studentName: z.string().min(3, "Nombre completo requerido"),
    dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
    email: z.string().email("Email inválido"),
    courseId: z.string().min(1, "Selecciona un curso"),
    phone: z.string().min(9, "Teléfono inválido"),
    additionalNotes: z.string().optional(),
})

export default function NewCertificateRequestPage() {
    const router = useRouter()

    const form = useForm<z.infer<typeof requestSchema>>({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            studentName: "",
            dni: "",
            email: "",
            courseId: "",
            phone: "",
            additionalNotes: ""
        },
    })

    function onSubmit(values: z.infer<typeof requestSchema>) {
        console.log("Enviando solicitud de trámite:", values)
        // Lógica para guardar la solicitud con estado 'pendiente'
    }

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Nueva Solicitud</h2>
                </div>
            </div>

            <Card className="w-full">
                <CardHeader className="border-b mb-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle>Formulario de Trámite de Certificación</CardTitle>
                    </div>
                    <CardDescription>
                        Completa los datos del participante para iniciar el proceso de emisión.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Nombre del Alumno */}
                                <FormField
                                    control={form.control}
                                    name="studentName"
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 md:col-span-2">
                                            <FormLabel className="flex items-center gap-2">
                                                <User className="h-3.5 w-3.5" /> Nombres y Apellidos
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tal como aparecerá en el certificado" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* DNI */}
                                <FormField
                                    control={form.control}
                                    name="dni"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Fingerprint className="h-3.5 w-3.5" /> DNI
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="8 dígitos" maxLength={8} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo Electrónico de contacto</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Teléfono */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de Celular (WhatsApp)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="999 999 999" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Selección de Curso */}
                            <FormField
                                control={form.control}
                                name="courseId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <BookOpen className="h-3.5 w-3.5" /> Curso solicitado
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el curso para el certificado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="c1">Especialista en Gestión Pública</SelectItem>
                                                <SelectItem value="c2">SIAF, SIGA y SEACE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Notas Adicionales */}
                            <FormField
                                control={form.control}
                                name="additionalNotes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observaciones adicionales (Opcional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Indique si el envío es a provincia, si requiere duplicado, etc."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4 border-t pt-6">
                                <Button variant="ghost" type="button" onClick={() => router.back()}>
                                    Descartar
                                </Button>
                                <Button type="submit" className="bg-primary px-10">
                                    <Send className="mr-2 h-4 w-4" /> Enviar Solicitud
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}