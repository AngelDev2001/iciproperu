"use client";

import * as React from "react"
import {startTransition} from "react"
import {useRouter} from "next/navigation"
import {useFieldArray, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectItem} from "@/components/ui/select"
import {BookOpen, FileCode, ListChecks, Plus, Trash2, Type} from "lucide-react"
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
                const result = await saveCourse(values);

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
        <CourseForm onSubmit={onSubmit} isPending={isPending} />
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
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    Crear Nuevo Curso
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Crea un nuevo programa académico para la plataforma.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                                    multiple={false}
                                                    value={field.value ? [field.value] : []} // Esto está bien
                                                    onChange={(files) => {
                                                        field.onChange(files && files.length > 0 ? files[0] : null);
                                                    }}
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

                    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
                        <Button variant="outline" type="button" className="w-full sm:w-auto px-8" disabled={isPending} onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto px-8"
                            disabled={isPending}
                        >
                            {isPending ? "Guardando..." : "Guardar Curso"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};