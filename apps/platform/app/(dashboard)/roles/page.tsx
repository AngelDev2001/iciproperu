import {Switch} from "@/components/ui/switch"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {IconUsers} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator";
import {CreateRoleModal} from "@/app/(dashboard)/roles/CreateRoleModal";

const rolesPermissionsData = [
    {
        id: "rol-1",
        name: "Administrador",
        description: "Acceso total al sistema y gestión de personal.",
        userCount: 3,
        permissions: {
            usuarios: ["ver", "create", "editar", "borrar"],
            cursos: ["ver", "create", "editar", "borrar"],
            certificados: ["ver", "validar", "emitir"]
        }
    },
    {
        id: "rol-2",
        name: "Docente",
        description: "Gestión de contenidos de cursos asignados.",
        userCount: 15,
        permissions: {
            usuarios: ["ver"],
            cursos: ["ver", "editar"],
            certificados: ["ver"]
        }
    }
];

export default function RolesPermissionsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Roles y Permisos</h1>
                    <p className="text-muted-foreground">Define qué acciones pueden realizar los usuarios según su cargo.</p>
                </div>

                <CreateRoleModal />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna Izquierda: Lista de Roles */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Roles Disponibles</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {rolesPermissionsData.map((rol) => (
                            <Button key={rol.id} variant="ghost" className="justify-start w-full">
                                <div className="flex flex-col items-start text-left">
                                    <span>{rol.name}</span>
                                    <span className="text-xs text-muted-foreground">{rol.userCount} usuarios</span>
                                </div>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Columna Derecha: Matriz de Configuración */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Configuración de Permisos</CardTitle>
                                <CardDescription>Editando permisos para: <strong>Administrador</strong></CardDescription>
                            </div>
                            <Button size="sm" variant="outline">Guardar Cambios</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Sección de Ejemplo: Usuarios */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <IconUsers className="size-5 text-primary" />
                                <h3 className="font-semibold">Módulo de Usuarios</h3>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <PermissionItem label="Ver lista de usuarios" description="Permite visualizar el directorio." />
                                <PermissionItem label="Crear nuevos usuarios" description="Acceso al formulario de registro." />
                                <PermissionItem label="Editar información" description="Modificar datos personales y roles." />
                                <PermissionItem label="Eliminar/Suspender" description="Quitar acceso a la plataforma." />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function PermissionItem({ label, description }: { label: string, description: string }) {
    return (
        <div className="flex items-start justify-between p-3 border rounded-lg bg-muted/30">
            <div className="space-y-0.5">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Switch />
        </div>
    )
}