'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {IdCard} from "lucide-react";

const formSchema = z.object({
  nombres: z.string().min(2, 'Requerido'),
  apellidos: z.string().min(2, 'Requerido'),
  tipoDocumento: z.enum(['DNI', 'CE', 'PASAPORTE']),
  numeroDocumento: z.string().min(8, 'Documento inválido'),
  rol: z.enum(['superadmin', 'admin', 'promotor', 'docente', 'estudiante']),
  estado: z.enum(['activo', 'inactivo', 'suspendido']),
});

export default function CreateUserPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rol: 'estudiante',
      estado: 'activo',
    },
  });

  const selectedRole = form.watch('rol');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Crear Nuevo Usuario</h1>
        <p className="text-muted-foreground">Registra un nuevo usuario en la plataforma.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* SECCIÓN: ROL Y CAMPOS DINÁMICOS */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle>Configuración de Rol</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="rol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rol del Usuario</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="superadmin">Super Admin</SelectItem>
                                            <SelectItem value="admin">Administrador</SelectItem>
                                            <SelectItem value="promotor">Promotor</SelectItem>
                                            <SelectItem value="docente">Docente</SelectItem>
                                            <SelectItem value="estudiante">Estudiante</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator />

                    {/* CAMPOS ESPECÍFICOS: PROMOTOR */}
                    {selectedRole === 'promotor' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2">
                            <FormItem>
                                <FormLabel>Código de Promotor</FormLabel>
                                <Input placeholder="PRM-001" />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Región Asignada</FormLabel>
                                <Input />
                            </FormItem>
                        </div>
                    )}

                    {/* CAMPOS ESPECÍFICOS: DOCENTE */}
                    {selectedRole === 'docente' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                            <FormItem>
                                <FormLabel>Especialidad</FormLabel>
                                <Input placeholder="Matemáticas, Historia..." />
                            </FormItem>
                        </div>
                    )}

                    {/* CAMPOS ESPECÍFICOS: ESTUDIANTE */}
                    {selectedRole === 'estudiante' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                            <FormItem>
                                <FormLabel>Código de Estudiante</FormLabel>
                                <Input placeholder="EST-2024" />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Modalidad</FormLabel>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="presencial">Presencial</SelectItem>
                                        <SelectItem value="virtual">Virtual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </div>
                    )}
                </CardContent>
            </Card>

          {/* SECCIÓN: INFORMACIÓN PERSONAL */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Documento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="DNI">DNI</SelectItem>
                                    <SelectItem value="CE">CE</SelectItem>
                                    <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                      <Input
                          {...field}
                          type="email"
                          label="Correo Electrónico"
                          placeholder="angel@servitec.com"
                          icon={IdCard}
                      />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Paterno</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Materno</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SECCIÓN: CONTACTO Y UBICACIÓN */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto y Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@ejemplo.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+51 ..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button size="lg" variant="outline" type="button">
              Cancelar
            </Button>
            <Button size="lg" type="submit">Guardar Usuario</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
