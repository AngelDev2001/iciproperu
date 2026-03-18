"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {useFieldArray, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ArrowLeft, Image as ImageIcon, ListChecks, Plus, Save, Trash2, Upload, X} from "lucide-react"

const courseSchema = z.object({
    title: z.string().min(5, "El título es demasiado corto"),
    code: z.string().min(3, "Código obligatorio"),
    description: z.string().min(10, "La descripción es muy breve"),
    modality: z.string().min(1, "Selecciona una modalidad"),
    syllabus: z.array(z.object({
        topic: z.string().min(1, "El nombre del tema es obligatorio")
    })).min(1, "Debes agregar al menos un tema"),
    image: z.any().optional()
})

export default function NewCoursePage() {
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            code: "",
            description: "",
            modality: "virtual",
            syllabus: [{ topic: "" }]
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "syllabus"
    })

    // Lógica para el Drag & Drop
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        const file = 'dataTransfer' in e ? e.dataTransfer.files[0] : e.target.files?.[0];
        if (file) {
            form.setValue("image", file)
            const reader = new FileReader()
            reader.onloadend = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    function onSubmit(values: z.infer<typeof courseSchema>) {
        console.log("Datos del nuevo curso:", values)
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Nuevo Curso</h2>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información General</CardTitle>
                            <CardDescription>Configura los detalles base y el contenido del curso</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Título del Curso</FormLabel>
                                                        <FormControl><Input placeholder="Ej: Especialista en SIG" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="modality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Modalidad</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger><SelectValue placeholder="Modalidad" /></SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="presencial">Presencial</SelectItem>
                                                            <SelectItem value="virtual">Virtual</SelectItem>
                                                            <SelectItem value="hibrido">Híbrido</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Zona de Imagen Drag & Drop */}
                                    <div className="space-y-2">
                                        <FormLabel>Imagen de Portada</FormLabel>
                                        <div
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => { e.preventDefault(); handleImageChange(e); }}
                                            className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer group relative"
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleImageChange}
                                            />
                                            {imagePreview ? (
                                                <div className="relative h-40 w-full">
                                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-md" />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2 h-6 w-6"
                                                        onClick={(e) => { e.preventDefault(); setImagePreview(null); form.setValue("image", null); }}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                                                    <Upload className="h-8 w-8 mb-2 group-hover:text-primary transition-colors" />
                                                    <p className="text-sm">Arrastra una imagen o haz clic para subir</p>
                                                    <p className="text-xs opacity-50">PNG, JPG hasta 5MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <FormField
                                                control={form.control}
                                                name="code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Código</FormLabel>
                                                        <FormControl><Input placeholder="CUR-001" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Breve descripción</FormLabel>
                                                        <FormControl><Input placeholder="Resumen del curso para la tarjeta..." {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-t pt-4">
                                            <div className="flex items-center gap-2">
                                                <ListChecks className="h-4 w-4 text-primary" />
                                                <h3 className="text-lg font-semibold">Temario</h3>
                                            </div>
                                            <Button type="button" variant="outline" size="sm" onClick={() => append({ topic: "" })}>
                                                <Plus className="h-4 w-4 mr-1" /> Agregar Item
                                            </Button>
                                        </div>
                                        <div className="grid gap-3">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="flex gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name={`syllabus.${index}.topic`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormControl><Input placeholder={`Tema ${index + 1}`} {...field} /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90">
                                        <Save className="mr-2 h-4 w-4" /> Guardar Curso
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-3">
                    <Card className="sticky top-6 overflow-hidden border-primary/20">
                        <div className="h-48 bg-muted relative">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="h-12 w-12 opacity-20" />
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-1 rounded">
                                    {form.watch("modality")}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h3 className="font-bold text-xl leading-tight line-clamp-2">
                                    {form.watch("title") || "Nombre del Curso"}
                                </h3>
                                <p className="text-xs font-mono text-primary mt-1">{form.watch("code") || "COD-XXX"}</p>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-3 italic">
                                "{form.watch("description") || "Sin descripción corta todavía..."}"
                            </p>

                            <div className="pt-4 border-t space-y-3">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contenido del programa</h4>
                                <ul className="space-y-2">
                                    {form.watch("syllabus")?.slice(0, 3).map((item, i) => (
                                        item.topic && (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                                <span className="flex-1 truncate">{item.topic}</span>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}