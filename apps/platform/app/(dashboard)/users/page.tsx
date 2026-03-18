'use client';

import * as React from 'react';
import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { IconDotsVertical, IconPlus, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';

import { DataTable } from './DataTable';
import { CircleCheck, CircleMinus, CircleX, Mail, Phone } from 'lucide-react';

export const userSchema = z.object({
  id: z.string(),
  role: z.enum(['superadmin', 'admin', 'promoter', 'teacher', 'student']),
  status: z.enum(['active', 'inactive', 'suspended']),
  first_names: z.string(),
  paternal_surname: z.string(),
  maternal_surname: z.string(),
  document_type: z.enum(['DNI', 'CE', 'PASSPORT']),
  document_number: z.string(),
  email: z.string().email(),
  phone: z.string(),
  createdAt: z.string(),
  avatar: z.string().optional(),
});

type User = z.infer<typeof userSchema>;

const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: 'Registro',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs font-medium">{row.original.createdAt}</span>
      </div>
    ),
  },
  {
    accessorKey: 'full_name',
    header: 'Usuario',
    cell: ({ row }) => {
      const {
        first_names,
        paternal_surname,
        maternal_surname,
        avatar,
        document_type,
        document_number,
      } = row.original;

      const fullName = `${first_names} ${paternal_surname} ${maternal_surname}`;

      return (
        <div className="flex items-center gap-3">
          {/* Avatar con inicial */}
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20 shrink-0">
            {avatar ? (
              <img src={avatar} alt={fullName} className="rounded-full size-full object-cover" />
            ) : (
              first_names.charAt(0).toUpperCase()
            )}
          </div>

          {/* Información de Texto */}
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-sm leading-none mb-1.5 truncate">{fullName}</span>
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="px-1 py-0 h-3.5 text-[9px] font-bold">
                {document_type}
              </Badge>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {document_number}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: 'contact',
    header: 'Contacto',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mail className="size-3" />
          <span className="truncate max-w-37.5">{row.original.email}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="size-3" />
          <span>{row.original.phone}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.original.status;

      const statusConfig = {
        active: {
          label: 'Activado',
          icon: CircleCheck,
          color: 'text-green-500',
        },
        inactive: {
          label: 'Inactivo',
          icon: CircleMinus,
          color: 'text-slate-400',
        },
        suspended: {
          label: 'Suspendido',
          icon: CircleX,
          color: 'text-rose-500',
        },
      };

      const config = statusConfig[status] || statusConfig.inactive;
      const Icon = config.icon;

      return (
        <Badge variant="outline">
          <Icon className={config.color} />
          <span className="capitalize">{config.label}</span>
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0" size="icon">
            <IconDotsVertical size={16} className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-rose-600">Desactivar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const generateMockUsers = (count: number): User[] => {
  const roles: User['role'][] = ['superadmin', 'admin', 'promoter', 'teacher', 'student'];
  const statuses: User['status'][] = ['active', 'inactive', 'suspended'];
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    first_names: ['Angel', 'Maria', 'Juan', 'Lucia', 'Carlos'][Math.floor(Math.random() * 5)],
    paternal_surname: ['Gala', 'Lopez', 'Perez', 'Garcia', 'Castro'][Math.floor(Math.random() * 5)],
    maternal_surname: ['Mendoza', 'Soto', 'Rojas', 'Ruiz', 'Tello'][Math.floor(Math.random() * 5)],
    document_type: ['DNI', 'CE', 'PASSPORT'][Math.floor(Math.random() * 3)],
    document_number: `8${Math.floor(10000000 + Math.random() * 89999999)}`,
    email: `usuario${i}@icipro.com`,
    phone: `9${Math.floor(10000000 + Math.random() * 89999999)}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: '2024-03-18',
  }));
};

export default function UsersListPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const users = React.useMemo(() => generateMockUsers(35), []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Gestión de Usuarios</h1>
          <p className="text-sm text-muted-foreground font-medium">
            {users.length} usuarios registrados
          </p>
        </div>
        <Button asChild className="shadow-sm">
          <Link href="/users/create">
            <IconPlus className="mr-2 size-4" />
            Nuevo Usuario
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4">
            <div className="relative w-full md:max-w-sm">
              <Input
                placeholder="Buscar por nombre o correo..."
                className="pl-9 h-10 bg-background"
                value={searchTerm}
                icon={IconSearch}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto ml-auto">
              <Select
                placeholder="Todos los roles"
                defaultValue="all"
                className="w-full md:w-45"
                triggerClassName="h-10 bg-background"
              >
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="docente">Docente</SelectItem>
                <SelectItem value="estudiante">Estudiante</SelectItem>
                <SelectItem value="promotor">Promotor</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable data={users} columns={columns} />
    </div>
  );
}
