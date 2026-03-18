'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
import { useFormHelpers } from '@/lib/hooks/useFormHelpers';
import { userSchema } from '@/lib/validations/user';
import { PERU_LOCATIONS } from '@/lib/validations/locations';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { saveUser } from '@/actions/user-actions';

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

  const filteredProvinces =
    PERU_LOCATIONS.find((r) => r.name === selectedRegionName)?.provinces || [];
  const filteredDistricts =
    filteredProvinces.find((p) => p.name === selectedProvinceName)?.districts || [];

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
        router.push('/administration/users');
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado al registrar.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Usuario</h1>
        <p className="text-muted-foreground text-lg">
          Configura el acceso y la información personal del nuevo integrante.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              <CardTitle>Configuración de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...useFormHelpers('role', userSchema)}
                      label="Rol del Usuario"
                      placeholder="Seleccionar un rol"
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

              {(selectedRole === 'promoter' ||
                selectedRole === 'teacher' ||
                selectedRole === 'student') && (
                <>
                  <Separator className="bg-primary/10" />
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {selectedRole === 'promoter' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="promoter_code"
                          render={({ field }) => (
                            <Input
                              {...field}
                              {...useFormHelpers('promoter_code', userSchema)}
                              label="Código de Promotor"
                              placeholder="PRM-0000"
                              icon={Briefcase}
                            />
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="assigned_zone"
                          render={({ field }) => (
                            <Input
                              {...field}
                              {...useFormHelpers('assigned_zone', userSchema)}
                              label="Zona Asignada"
                              placeholder="Ej. Lima Norte, Sur..."
                              icon={MapPin}
                            />
                          )}
                        />
                      </div>
                    )}

                    {selectedRole === 'teacher' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="academic_specialty"
                          render={({ field }) => (
                            <Input
                              {...field}
                              {...useFormHelpers('academic_specialty', userSchema)}
                              label="Especialidad Académica"
                              placeholder="Ingeniería, Gestión..."
                              icon={GraduationCap}
                            />
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="academic_degree"
                          render={({ field }) => (
                            <Input
                              {...field}
                              {...useFormHelpers('academic_degree', userSchema)}
                              label="Grado Académico"
                              placeholder="Magíster, Doctor..."
                              icon={Award}
                            />
                          )}
                        />
                      </div>
                    )}

                    {selectedRole === 'student' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="student_code"
                          render={({ field }) => (
                            <Input
                              {...field}
                              {...useFormHelpers('student_code', userSchema)}
                              label="Código de Estudiante"
                              placeholder="EST-2026-001"
                              icon={Fingerprint}
                            />
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="modality"
                          render={({ field }) => (
                            <Select
                              {...field}
                              {...useFormHelpers('modality', userSchema)}
                              label="Modalidad"
                              placeholder="Seleccionar modalidad"
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              icon={Monitor}
                              required
                            >
                              <SelectItem value="presencial">Presencial</SelectItem>
                              <SelectItem value="virtual">Virtual</SelectItem>
                            </Select>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="document_type"
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...useFormHelpers('document_type', userSchema)}
                      label="Tipo de Documento"
                      placeholder="Seleccionar tipo"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      icon={FileBadge2}
                      required
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
                        {...useFormHelpers('document_number', userSchema)}
                        label="Número de Documento"
                        placeholder="Ingrese el número de identidad"
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
                    <Input
                      {...field}
                      {...useFormHelpers('first_names', userSchema)}
                      label="Nombres"
                      placeholder="Ej. Juan Andrés"
                      icon={User}
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="paternal_surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...useFormHelpers('paternal_surname', userSchema)}
                      label="Apellido Paterno"
                      placeholder="Ej. Pérez"
                      icon={UserCircle2}
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="maternal_surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...useFormHelpers('maternal_surname', userSchema)}
                      label="Apellido Materno"
                      placeholder="Ej. Quispe"
                      icon={UserCircle2}
                      required
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <CardTitle>Contacto y Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...useFormHelpers('email', userSchema)}
                      type="email"
                      label="Correo Electrónico"
                      placeholder="nombre@icipro.edu.pe"
                      icon={Mail}
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...useFormHelpers('phone', userSchema)}
                      label="Teléfono Celular"
                      placeholder="999 999 999"
                      icon={Phone}
                      required
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...useFormHelpers('region', userSchema)}
                      label="Región"
                      placeholder="Seleccionar región"
                      onValueChange={handleRegionChange}
                      defaultValue={field.value}
                      icon={Globe}
                      required
                    >
                      {PERU_LOCATIONS.map((loc) => (
                        <SelectItem key={loc.id} value={loc.name}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...useFormHelpers('province', userSchema)}
                      label="Provincia"
                      placeholder="Seleccionar provincia"
                      onValueChange={handleProvinceChange}
                      defaultValue={field.value}
                      disabled={!selectedRegionName}
                      icon={Navigation}
                      required
                    >
                      {filteredProvinces.map((prov) => (
                        <SelectItem key={prov.id} value={prov.name}>
                          {prov.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <Select
                      {...field}
                      {...useFormHelpers('district', userSchema)}
                      label="Distrito"
                      placeholder="Seleccionar distrito"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedProvinceName}
                      icon={MapPin}
                      required
                    >
                      {filteredDistricts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end items-center gap-4 pt-4">
            <Button
              size="lg"
              variant="outline"
              type="button"
              className="px-8"
              disabled={isPending}
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button size="lg" type="submit" disabled={isPending} loading={isPending}>
              {isPending ? 'Registrando...' : 'Registrar Usuario'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
