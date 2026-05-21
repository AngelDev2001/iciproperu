"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
                <p className="text-muted-foreground">Gestiona tu información personal y configuración de cuenta.</p>
            </div>

            <div className="grid gap-6">
                {/* Sección de Foto de Perfil */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24 border">
                                <AvatarImage src="/avatars/angel.jpg" />
                                <AvatarFallback className="text-2xl">AG</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <Button size="sm">Cambiar Foto</Button>
                                <p className="text-xs text-muted-foreground text-balance">
                                    JPG, GIF o PNG. Tamaño máximo de 2MB.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Datos Personales */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información General</CardTitle>
                        <CardDescription>Estos datos son visibles para la administración.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input id="name" defaultValue="Angel Gala" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" defaultValue="galafloresangelemilio@gmail.com" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" placeholder="+51 ..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Rol asignado</Label>
                            <Input id="role" defaultValue="Super Admin" disabled className="bg-muted" />
                        </div>
                    </CardContent>
                </Card>

                {/* Seguridad */}
                <Card>
                    <CardHeader>
                        <CardTitle>Seguridad</CardTitle>
                        <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label>Contraseña actual</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>Nueva contraseña</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirmar contraseña</Label>
                                <Input type="password" />
                            </div>
                        </div>
                        <Button variant="outline">Cambiar Contraseña</Button>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="ghost">Descartar</Button>
                    <Button>Guardar Cambios</Button>
                </div>
            </div>
        </div>
    );
}