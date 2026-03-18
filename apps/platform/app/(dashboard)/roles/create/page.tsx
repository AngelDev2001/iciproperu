'use client';

// Esquema de validación
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IconArrowLeft, IconBook, IconUsers} from "@tabler/icons-react";
import {Form, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";

const roleSchema = z.object({
    name: z.string().min(3, 'Nombre requerido'),
    description: z.string().min(5, 'Descripción requerida'),
    permissions: z.record(z.array(z.string())), // Estructura: { modulo: ['ver', 'editar'] }
});

export default function CreateRolePage() {
    const form = useForm({
        resolver: zodResolver(roleSchema),
        defaultValues: { name: '', description: '', permissions: {} }
    });

    return (
        <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
            {/* Header con botón de regreso */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/roles"><IconArrowLeft /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Crear Nuevo Rol</h1>
                    <p className="text-muted-foreground">Configura un cargo y sus niveles de acceso.</p>
                </div>
            </div>

            <Form {...form}>
                <form className="space-y-6">
                    {/* Sección 1: Datos Generales */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Básica</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Rol</FormLabel>
                                        <Input placeholder="Ej. Promotor de Ventas" {...field} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <Textarea placeholder="Define las funciones de este rol..." {...field} />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Sección 2: Matriz de Permisos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Matriz de Accesos</CardTitle>
                            <CardDescription>Selecciona qué puede hacer este rol en cada módulo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <PermissionModule
                                title="Usuarios"
                                icon={<IconUsers size={20}/>}
                                options={['Ver Lista', 'Crear', 'Editar', 'Suspender']}
                            />
                            <Separator />
                            <PermissionModule
                                title="Cursos"
                                icon={<IconBook size={20}/>}
                                options={['Ver Lista', 'Crear', 'Asignar Docentes', 'Eliminar']}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Guardar Rol</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

function PermissionModule({ title, icon, options }: { title: string, icon: any, options: string[] }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold">
                {icon}
                <span>Módulo de {title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {options.map(opt => (
                    <div key={opt} className="flex items-center justify-between p-3 border rounded-md bg-muted/20">
                        <span className="text-sm">{opt}</span>
                        <Switch />
                    </div>
                ))}
            </div>
        </div>
    );
}