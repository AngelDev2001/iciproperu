'use client';

import * as React from 'react';
import {useEffect} from 'react';
import {ColumnDef} from '@tanstack/react-table';
import {IconBrandWhatsapp, IconDotsVertical, IconPlus} from '@tabler/icons-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {DataTable} from './DataTable';
import {Mail} from 'lucide-react';
import {getUsers} from "@/actions/user-actions";
import {formatLatamDate, getRoleLabel, getStatusLabel} from "@/helpers/userHelpers";
import Link from "next/link";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'created_at',
    header: 'Registro',
    cell: ({ row }) => (
        <div className="flex flex-col min-w-25">
        <span className="text-xs font-medium uppercase tracking-tighter">
          {formatLatamDate(row.original.created_at, true)}
        </span>
        </div>
    ),
  },
  {
    id: 'full_name',
    header: 'Usuario',
    accessorFn: (row) => `${row.first_names} ${row.paternal_surname} ${row.maternal_surname} ${row.document_number}`,
    filterFn: 'includesString',
    cell: ({ row }) => {
      const fullName = `${row.original.first_names} ${row.original.paternal_surname} ${row.original.maternal_surname}`;
      const { avatar, document_type, document_number, first_names } = row.original;

      return (
          <div className="flex items-center gap-3 min-w-50">
            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20 shrink-0 overflow-hidden">
              {avatar ? (
                  <img src={avatar} alt={fullName} className="size-full object-cover" />
              ) : (
                  first_names.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-col min-w-0">
            <span className="font-medium text-sm leading-none mb-1.5 truncate">
              {fullName}
            </span>
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="px-1 py-0 h-3.5 text-[9px] font-bold shrink-0">
                  {document_type}
                </Badge>
                <span className="text-[11px] text-muted-foreground tabular-nums truncate">
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
    accessorFn: (row) => `${row.email} ${row.phone}`,
    cell: ({ row }) => (
        <div className="flex flex-col gap-1 min-w-37.5">
          <a
              href={`mailto:${row.original.email}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group"
          >
            <Mail className="size-3 shrink-0" />
            <span className="truncate max-w-35 md:max-w-45">{row.original.email}</span>
          </a>
          <a
              href={`https://wa.me/${row.original.phone?.replace(/\s+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-green-600 transition-colors"
          >
            <IconBrandWhatsapp className="size-3 shrink-0" />
            <span className="tabular-nums">{row.original.phone}</span>
          </a>
        </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => (
        <div className="min-w-20">
          <Badge variant="outline" className="font-normal uppercase text-[10px]">
            {getRoleLabel(row.original.role)}
          </Badge>
        </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = getStatusLabel(row.original.status);
      const Icon = status.icon;

      return (
          <div className="min-w-25">
            <Badge variant="outline" className="gap-1.5 font-normal">
              <Icon size={12} className={status.color} />
              <span className="capitalize">{status.label}</span>
            </Badge>
          </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
        <div className="flex justify-end">
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
        </div>
    ),
  },
];

export default function UsersPage() {
  const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await getUsers();
                if (response.success) {
                    setUsers(response?.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

  return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Gestión de Usuarios
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              {users.length} usuarios registrados en el sistema
            </p>
          </div>
          <Button asChild className="shadow-sm w-full sm:w-auto">
            <Link href="/users/create">
              <IconPlus className="mr-2 size-4" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>

          <DataTable data={users} columns={columns} isLoading={isLoading} />
      </div>
  );
}