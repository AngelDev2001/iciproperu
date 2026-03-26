"use client"

import * as React from "react"
import {startTransition} from "react"
import {useRouter} from "next/navigation"
import {useFieldArray, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectItem} from "@/components/ui/select"
import {BookOpen, FileCode, ListChecks, Plus, Save, Trash2, Type} from "lucide-react"
import {useFormHelpers} from "@/hooks/useFormHelpers";
import {FileUpload} from "@/components/shared";
import {saveCourse} from "@/actions/course-actions"
import {toast} from "sonner"
import {Course, courseSchema} from "@/lib/validations/course"

export default function NewCoursePage() {
    const router = useRouter()
    const [isPending, setIsPending] = React.useTransition()

    const onSubmit = (values: Course) => {
        startTransition(async () => {
            try {
                const fileToUpload = values.image_url?.[0] || null;

                const result = await saveCourse({
                    ...values,
                    image_url: fileToUpload
                });

                if (result.success) {
                    toast.success("Curso guardado exitosamente");
                    router.push("/courses");
                    router.refresh();
                } else {
                    toast.error(result.error || "Ocurrió un error al guardar");
                }
            } catch (error) {
                toast.error("Error de conexión con el servidor");
            }
        });
    };

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 lg:p-10 max-w-400 mx-auto">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b pb-4">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Nuevo Curso</h2>
                    <p className="text-sm text-muted-foreground">
                        Crea un nuevo programa académico para la plataforma.
                    </p>
                </div>
            </div>

           <CourseForm onSubmit={onSubmit} isPending={isPending} />
        </div>
    );
}

const CourseForm = ({onSubmit, isPending}) => {

    const form = useForm<Course>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            course_code: "",
            description: "",
            modality: "online",
            modules: [{ title: "", order: 1 }],
            image_url: null,
            internal_observations: ""
        },
    })

    const {handleSubmit, control} = form;

    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "modules"
    })

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Información General
                        </CardTitle>
                        <CardDescription>Detalles identificadores del curso</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                                <FormField
                                    control={control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input
                                                {...field}
                                                {...useFormHelpers('title', courseSchema)}
                                                label="Título del Curso"
                                                placeholder="Ej: Especialista en SIG"
                                                icon={Type}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="modality"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            label="Modalidad"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectItem value="online">Virtual</SelectItem>
                                            <SelectItem value="in_person">Presencial</SelectItem>
                                            <SelectItem value="hybrid">Híbrido</SelectItem>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                            <div className="md:col-span-1">
                                <FormField
                                    control={control}
                                    name="course_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input
                                                {...field}
                                                {...useFormHelpers('course_code', courseSchema)}
                                                label="Código"
                                                placeholder="CUR-001"
                                                icon={FileCode}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input
                                                {...field}
                                                {...useFormHelpers('description', courseSchema)}
                                                label="Breve descripción"
                                                placeholder="Resumen para la tarjeta de presentación..."
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <FormField
                                control={control}
                                name="image_url"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                                label="Imagen de Portada"
                                                accept="image/*"
                                                multiple={false} // Si es solo una portada
                                                value={field.value ? [field.value] : []} // Convertir a array para el componente
                                                onChange={(files) => field.onChange(files?.[0] || null)} // Tomar solo el primero
                                                error={fieldState.error?.message}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-stretch md:items-center justify-between pb-4">
                        <div className="space-y-1">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <ListChecks className="h-5 w-5 text-primary" />
                                Temario del Curso
                            </CardTitle>
                            <CardDescription>Define los temas o módulos que se tratarán</CardDescription>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-9 px-3 border-dashed border-primary/50 text-primary hover:bg-primary/5"
                            leftIcon={<Plus/>}
                            onClick={() => append({ title: "", order: fields.length + 1 })}
                        >
                            Agregar Item
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <div className="flex-1">
                                        <FormField
                                            control={control}
                                            name={`modules.${index}.title`} // ANTES decía .topic
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Nombre del módulo..." />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/5 shrink-0"
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}
                                    >
                                        <Trash2/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    className="w-full"
                    leftIcon={<Save/>}
                    disabled={isPending}
                >
                    {isPending ? "Guardando..." : "Guardar Curso"}
                </Button>
            </form>
        </Form>
    );
};