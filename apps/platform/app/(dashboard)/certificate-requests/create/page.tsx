'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {BookOpen, FileBadge2, GraduationCap, IdCard, Send, User,} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectItem} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';

import {useFormHelpers} from '@/hooks/useFormHelpers';
import {type CertificateRequest, certificateRequestSchema,} from '@/lib/validations/certificates-request';

export default function NewCertificateRequestPage() {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<CertificateRequest>({
    resolver: zodResolver(certificateRequestSchema),
    defaultValues: {
      status: 'pending',
      document_type: 'DNI',
      document_number: '',
      first_names: '',
      paternal_surname: '',
      maternal_surname: '',
      course_name: '',
      internal_observations: '',
      course_hours: 40,
      grades: [{ topic: '', score: 14 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'grades',
  });

  async function onSubmit(values: CertificateRequest) {
    setIsPending(true);
    try {
      console.log('Enviando a Supabase:', values);
      // const result = await createCertificateRequest(values);
      toast.success('Solicitud enviada correctamente');
      router.push('/administration/certificates');
    } catch (error) {
      toast.error('Error al procesar la solicitud');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crear Nueva Solicitud</h1>
        <p className="text-muted-foreground text-lg">
          Inicia el proceso de certificación registrando los datos del alumno y sus calificaciones.
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
                      {...useFormHelpers('document_type', certificateRequestSchema)}
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
                        {...useFormHelpers('document_number', certificateRequestSchema)}
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
                      {...useFormHelpers('first_names', certificateRequestSchema)}
                      label="Nombres"
                      placeholder="Ej. Juan"
                      icon={User}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="paternal_surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...useFormHelpers('paternal_surname', certificateRequestSchema)}
                      label="Apellido Paterno"
                      placeholder="Ej. Pérez"
                      icon={User}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="maternal_surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...useFormHelpers('maternal_surname', certificateRequestSchema)}
                      label="Apellido Materno"
                      placeholder="Ej. Ramos"
                      icon={User}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <CardTitle>Detalles Académicos</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                  control={form.control}
                  name="course_name"
                  render={({ field }) => (
                      <Input {...field} {...useFormHelpers('course_name', certificateRequestSchema)} label="Nombre del Curso" icon={BookOpen} />
                  )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <FormField
                control={form.control}
                name="internal_observations"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    {...useFormHelpers('internal_observations', certificateRequestSchema)}
                      label="Observaciones Internas"
                    placeholder="Notas adicionales para gerencia..."
                    className="min-h-[100px] bg-muted/5"
                  />
                )}
              />
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
            <Button size="lg" type="submit" disabled={isPending} className="px-10 gap-2">
              {isPending ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="w-4 h-4" /> Enviar Solicitud
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
