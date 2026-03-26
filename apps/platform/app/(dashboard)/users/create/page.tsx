'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

import {Button} from '@/components/ui/button';
import {Form, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectItem} from '@/components/ui/select';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {
    Activity,
    Award,
    Briefcase,
    FileBadge2,
    Fingerprint,
    Globe,
    GraduationCap,
    IdCard,
    Mail,
    MapPin,
    Monitor,
    Navigation,
    Phone,
    Settings2,
    ShieldCheck,
    User,
    UserCircle2,
} from 'lucide-react';

import {useFormHelpers} from '@/hooks/useFormHelpers';
import {userSchema} from '@/lib/validations/user';
import {PERU_LOCATIONS} from '@/lib/validations/locations';
import {saveUser} from '@/actions/user-actions';

export default function CreateUserPage() {
    const router = useRouter();
    const [isPending, setIsPending] = React.useState(false);

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: 'promoter',
            status: 'active',
            first_names: '',
            paternal_surname: '',
            maternal_surname: '',
            document_type: 'DNI',
            document_number: '',
            email: '',
            phone: '',
            region: '',
            province: '',
            district: '',
            promoter_code: '',
            assigned_zone: '',
            academic_specialty: '',
            academic_degree: '',
            student_code: '',
            modality: 'presencial',
        },
    });

    const selectedRole = form.watch('role');
    const selectedRegionName = form.watch('region');
    const selectedProvinceName = form.watch('province');

    const filteredProvinces = PERU_LOCATIONS.find((r) => r.name === selectedRegionName)?.provinces || [];
    const filteredDistricts = filteredProvinces.find((p) => p.name === selectedProvinceName)?.districts || [];

    const handleRegionChange = (value: string) => {
        form.setValue('region', value);
        form.setValue('province', '');
        form.setValue('district', '');
    };

    const handleProvinceChange = (value: string) => {
        form.setValue('province', value);
        form.setValue('district', '');
    };

    async function onSubmit(values: z.infer<typeof userSchema>) {
        setIsPending(true);
        try {
            const result = await saveUser(values);
            if (result.success) {
                toast.success('¡Usuario registrado con éxito!');
                router.push('/users');
            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch (error) {
            toast.error('Error inesperado al registrar.');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    Crear Nuevo Usuario
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Configura el acceso y la información personal del nuevo integrante.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 pb-4">
                            <Settings2 className="size-4 text-primary" />
                            <CardTitle className="text-base font-bold">Configuración de Cuenta</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            {...useFormHelpers('role', userSchema)}
                                            label="Rol del Usuario"
                                            placeholder="Seleccionar rol"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            icon={ShieldCheck}
                                            required
                                        >
                                            <SelectItem value="superadmin">Super Admin</SelectItem>
                                            <SelectItem value="admin">Administrador</SelectItem>
                                            <SelectItem value="promoter">Promotor</SelectItem>
                                            <SelectItem value="teacher">Docente</SelectItem>
                                            <SelectItem value="student">Estudiante</SelectItem>
                                        </Select>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            {...useFormHelpers('status', userSchema)}
                                            label="Estado Inicial"
                                            placeholder="Seleccionar estado"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            icon={Activity}
                                            required
                                        >
                                            <SelectItem value="active">Activo</SelectItem>
                                            <SelectItem value="inactive">Inactivo</SelectItem>
                                            <SelectItem value="suspended">Suspendido</SelectItem>
                                        </Select>
                                    )}
                                />
                            </div>

                            {['promoter', 'teacher', 'student'].includes(selectedRole) && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Separator className="mb-6 opacity-50" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {selectedRole === 'promoter' && (
                                            <>
                                                <FormField control={form.control} name="promoter_code" render={({ field }) => (
                                                    <Input {...field} {...useFormHelpers('promoter_code', userSchema)} label="Código" placeholder="Ej. PRM-001" icon={Briefcase} />
                                                )} />
                                                <FormField control={form.control} name="assigned_zone" render={({ field }) => (
                                                    <Input {...field} {...useFormHelpers('assigned_zone', userSchema)} label="Zona" placeholder="Ej. Lima Norte" icon={MapPin} />
                                                )} />
                                            </>
                                        )}
                                        {selectedRole === 'teacher' && (
                                            <>
                                                <FormField control={form.control} name="academic_specialty" render={({ field }) => (
                                                    <Input {...field} {...useFormHelpers('academic_specialty', userSchema)} label="Especialidad" placeholder="Ej. Ingeniería de Sistemas" icon={GraduationCap} />
                                                )} />
                                                <FormField control={form.control} name="academic_degree" render={({ field }) => (
                                                    <Input {...field} {...useFormHelpers('academic_degree', userSchema)} label="Grado" placeholder="Ej. Magíster" icon={Award} />
                                                )} />
                                            </>
                                        )}
                                        {selectedRole === 'student' && (
                                            <>
                                                <FormField control={form.control} name="student_code" render={({ field }) => (
                                                    <Input {...field} {...useFormHelpers('student_code', userSchema)} label="Código" placeholder="Ej. u20241234" icon={Fingerprint} />
                                                )} />
                                                <FormField control={form.control} name="modality" render={({ field }) => (
                                                    <Select {...field} {...useFormHelpers('modality', userSchema)} label="Modalidad" placeholder="Seleccionar" onValueChange={field.onChange} defaultValue={field.value} icon={Monitor} required>
                                                        <SelectItem value="presencial">Presencial</SelectItem>
                                                        <SelectItem value="virtual">Virtual</SelectItem>
                                                    </Select>
                                                )} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 pb-4">
                            <User className="size-4 text-muted-foreground" />
                            <CardTitle className="text-base font-bold">Información Personal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FormField control={form.control} name="document_type" render={({ field }) => (
                                    <Select {...field} {...useFormHelpers('document_type', userSchema)} label="Tipo" placeholder="DNI" onValueChange={field.onChange} defaultValue={field.value} icon={FileBadge2} required>
                                        <SelectItem value="DNI">DNI</SelectItem>
                                        <SelectItem value="CE">CE</SelectItem>
                                        <SelectItem value="PASSPORT">Pasaporte</SelectItem>
                                    </Select>
                                )} />
                                <div className="lg:col-span-2">
                                    <FormField control={form.control} name="document_number" render={({ field }) => (
                                        <Input {...field} {...useFormHelpers('document_number', userSchema)} label="Nro Documento" placeholder="Ej. 71234567" icon={IdCard} required />
                                    )} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FormField control={form.control} name="first_names" render={({ field }) => (
                                    <Input {...field} {...useFormHelpers('first_names', userSchema)} label="Nombres" placeholder="Ej. Juan Alberto" icon={User} required />
                                )} />
                                <FormField control={form.control} name="paternal_surname" render={({ field }) => (
                                    <Input {...field} {...useFormHelpers('paternal_surname', userSchema)} label="Apellido Paterno" placeholder="Ej. Pérez" icon={UserCircle2} required />
                                )} />
                                <FormField control={form.control} name="maternal_surname" render={({ field }) => (
                                    <Input {...field} {...useFormHelpers('maternal_surname', userSchema)} label="Apellido Materno" placeholder="Ej. García" icon={UserCircle2} required />
                                )} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 pb-4">
                            <MapPin className="size-4 text-muted-foreground" />
                            <CardTitle className="text-base font-bold">Contacto y Ubicación</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <Input {...field} {...useFormHelpers('email', userSchema)} type="email" label="Correo" placeholder="Ej. usuario@dominio.com" icon={Mail} required />
                                )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <Input {...field} {...useFormHelpers('phone', userSchema)} label="Celular" placeholder="Ej. 987654321" icon={Phone} required />
                                )} />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FormField control={form.control} name="region" render={({ field }) => (
                                    <Select {...field} {...useFormHelpers('region', userSchema)} label="Región" placeholder="Seleccionar" onValueChange={handleRegionChange} defaultValue={field.value} icon={Globe} required>
                                        {PERU_LOCATIONS.map((loc) => <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>)}
                                    </Select>
                                )} />
                                <FormField control={form.control} name="province" render={({ field }) => (
                                    <Select {...field} {...useFormHelpers('province', userSchema)} label="Provincia" placeholder="Seleccionar" onValueChange={handleProvinceChange} defaultValue={field.value} disabled={!selectedRegionName} icon={Navigation} required>
                                        {filteredProvinces.map((prov) => <SelectItem key={prov.id} value={prov.name}>{prov.name}</SelectItem>)}
                                    </Select>
                                )} />
                                <FormField control={form.control} name="district" render={({ field }) => (
                                    <Select {...field} {...useFormHelpers('district', userSchema)} label="Distrito" placeholder="Seleccionar" onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedProvinceName} icon={MapPin} required>
                                        {filteredDistricts.map((dist) => <SelectItem key={dist} value={dist}>{dist}</SelectItem>)}
                                    </Select>
                                )} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
                        <Button variant="outline" type="button" className="w-full sm:w-auto px-8" disabled={isPending} onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="w-full sm:w-auto px-8" disabled={isPending}>
                            {isPending ? 'Registrando...' : 'Registrar Usuario'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}