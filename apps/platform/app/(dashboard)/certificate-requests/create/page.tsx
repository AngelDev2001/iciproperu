'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {BookOpen, ClipboardList, FileBadge2, GraduationCap, IdCard, Loader2, Mail, Phone, User} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectItem} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';

import {useFormHelpers} from '@/hooks/useFormHelpers';
import {type Certificate, certificateSchema} from '@/lib/validations/certificate';
import {getActiveCourses, getCourseModules} from "@/actions/course-actions";
import {saveCertificate} from "@/actions/certificate-actions";

export default function NewCertificateRequestPage() {
    const router = useRouter();
    const [isPending, setIsPending] = React.useState(false);
    const [courses, setCourses] = React.useState<{id: string, title: string}[]>([]);

    React.useEffect(() => {
        async function loadCourses() {
            try {
                const data = await getActiveCourses();
                setCourses(data);
            } catch (error) {
                toast.error("Error al cargar la lista de cursos");
            }
        }
        loadCourses();
    }, []);

    const form = useForm<Certificate>({
        resolver: zodResolver(certificateSchema) as any,
        defaultValues: {
            status: 'pending',
            document_type: 'DNI',
            document_number: '',
            first_names: '',
            paternal_surname: '',
            maternal_surname: '',
            email: '',
            phone_prefix: '+51',
            phone_number: '',
            course_id: '',
            course_name: '',
            internal_observations: '',
            course_hours: 40,
            grades_snapshot: [],
        },
    });

    const { fields, replace } = useFieldArray({
        control: form.control,
        name: 'grades_snapshot',
    });

    const handleCourseSelect = async (courseId: string) => {
        const selectedCourse = courses.find(c => c.id === courseId);
        if (!selectedCourse) return;

        form.setValue('course_id', courseId);
        form.setValue('course_name', selectedCourse.title);

        try {
            const modules = await getCourseModules(courseId);

            const autoGrades = modules.map((mod: any) => ({
                topic: mod.title,
                score: Math.floor(Math.random() * (18 - 15 + 1)) + 15,
            }));

            replace(autoGrades);
            toast.info(`${autoGrades.length} temas cargados automáticamente`);
        } catch (error) {
            toast.error("Error al cargar el temario del curso");
        }
    };

    async function onSubmit(values: Certificate) {
        setIsPending(true);
        try {
            const result = await saveCertificate(values);

            if (result.success) {
                toast.success('Solicitud enviada correctamente');
                router.push('/certificate-requests');
                router.refresh();
            } else {
                toast.error(result.error || "Error al guardar");
            }
        } catch (error) {
            toast.error('Error crítico de conexión');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    Crear Nueva Solicitud
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Registra los datos del alumno. El temario se generará automáticamente al elegir el curso.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            <CardTitle>Información del Estudiante</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="document_type"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Tipo Documento"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            icon={FileBadge2}
                                        >
                                            <SelectItem value="DNI">DNI</SelectItem>
                                            <SelectItem value="CE">CE</SelectItem>
                                            <SelectItem value="PASSPORT">Pasaporte</SelectItem>
                                        </Select>
                                    )}
                                />
                                <div className="md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="document_number"
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                {...useFormHelpers('document_number', certificateSchema)}
                                                label="Número de Documento"
                                                icon={IdCard}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="first_names"
                                    render={({ field }) => (
                                        <Input {...field} {...useFormHelpers('first_names', certificateSchema)} label="Nombres" icon={User} />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="paternal_surname"
                                    render={({ field }) => (
                                        <Input {...field} {...useFormHelpers('paternal_surname', certificateSchema)} label="Apellido Paterno" icon={User} />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maternal_surname"
                                    render={({ field }) => (
                                        <Input {...field} {...useFormHelpers('maternal_surname', certificateSchema)} label="Apellido Materno" icon={User} />
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            <CardTitle>Información de Contacto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Correo Electrónico"
                                            placeholder="ejemplo@correo.com"
                                            icon={Mail}
                                        />
                                    )}
                                />
                                <div className="flex gap-2">
                                    <div className="w-24">
                                        <FormField
                                            control={form.control}
                                            name="phone_prefix"
                                            render={({ field }) => (
                                                <Input {...field} label="Prefijo" readOnly />
                                            )}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name="phone_number"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Número de Celular"
                                                    placeholder="999888777"
                                                    icon={Phone}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            <CardTitle>Detalles Académicos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="course_id"
                                render={({ field }) => (
                                    <Select
                                        label="Nombre del Curso"
                                        placeholder="Selecciona un curso para cargar temas..."
                                        onValueChange={(val) => handleCourseSelect(val)} // Dispara carga automática
                                        defaultValue={field.value}
                                        icon={BookOpen}
                                    >
                                        {courses.map((course) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.title}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            {fields.length > 0 && (
                                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20 border-dashed">
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Temario Cargado ({fields.length} items)</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-muted-foreground uppercase">
                                        {fields.slice(0, 4).map((f, i) => (
                                            <div key={f.id} className="flex justify-between border-b pb-1">
                                                <span>{i+1}. {f.topic}</span>
                                                <span className="font-bold text-foreground">{f.score}</span>
                                            </div>
                                        ))}
                                        {fields.length > 4 && <p className="italic">... y {fields.length - 4} temas más.</p>}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-primary" />
                            <CardTitle>Observaciones</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="internal_observations"
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Observaciones Internas"
                                        placeholder="Notas adicionales para gerencia..."
                                        className="min-h-[100px]"
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
                        <Button variant="outline" type="button" className="w-full sm:w-auto px-8" disabled={isPending} onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isPending || fields.length === 0} className="w-full sm:w-auto px-10 gap-2">
                            {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Enviar Solicitud"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}