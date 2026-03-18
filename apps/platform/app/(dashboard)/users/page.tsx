"use client"

// Esquema para Usuarios
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import * as z from "zod";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {IconDotsVertical, IconPlus} from "@tabler/icons-react";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DataTable} from "@/app/(dashboard)/components/data-table";

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['superadmin', 'admin', 'promotor', 'docente', 'estudiante']),
    status: z.enum(['active', 'inactive', 'suspended']),
    avatar: z.string().optional(),
    createdAt: z.string(),
});

type User = z.infer<typeof userSchema>;

const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
    },
    {
        accessorKey: 'name',
        header: 'Usuario',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {row.original.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">{row.original.name}</span>
                    <span className="text-xs text-muted-foreground">{row.original.email}</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'role',
        header: 'Rol',
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize">
                {row.original.role}
            </Badge>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge
                    variant={status === 'active' ? 'default' : 'secondary'}
                    className={cn(
                        "capitalize",
                        status === 'active' && "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200",
                        status === 'suspended' && "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200"
                    )}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Registro',
        cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.createdAt}</span>,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><IconDotsVertical size={16} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Suspender</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export default function UsersListPage() {
    // Datos de ejemplo
    const users: User[] = [
        {
            id: "1", name: "Angel Gala", email: "angel@icipro.com",
            role: "admin", status: "active", createdAt: "2024-03-10"
        },
        {
            id: "2", name: "Juan Perez", email: "juan@perez.com",
            role: "docente", status: "active", createdAt: "2024-03-12"
        },
        {
            id: "3", name: "Maria Lopez", email: "m.lopez@gmail.com",
            role: "estudiante", status: "suspended", createdAt: "2024-02-20"
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Lista de Usuarios</h1>
                    <p className="text-muted-foreground">Gestiona todos los usuarios registrados en la plataforma.</p>
                </div>
                <Button asChild>
                    <Link href="/users/create">
                        <IconPlus className="mr-2 size-4" />
                        Nuevo Usuario
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4 border-b">
                        <Input
                            placeholder="Buscar por nombre o correo..."
                            className="max-w-sm"
                        />
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filtrar por Rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los roles</SelectItem>
                                <SelectItem value="admin">Administradores</SelectItem>
                                <SelectItem value="docente">Docentes</SelectItem>
                                <SelectItem value="estudiante">Estudiantes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Aquí inyectas tu componente DataTable con las columnas nuevas */}
                    <DataTable data={users} columns={columns} />
                </CardContent>
            </Card>
        </div>
    );
}