'use client';

import * as React from 'react';
import {Table} from '@tanstack/react-table';
import {IconCalendar, IconFilter, IconSearch, IconUserShield, IconX} from '@tabler/icons-react';
import {DateRange} from "react-day-picker";

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {DatePickerWithRange} from './DatePickerWithRange';
import {DataTableFacetedFilter} from "@/components/ui/data-table-toolbar/DataTableFacetedFilter";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const dateRange = (table.getColumn('created_at')?.getFilterValue() as DateRange) || undefined;

    const handleReset = () => {
        table.resetColumnFilters();
        table.setGlobalFilter('');
    };

    return (
        <Card className="mb-4 p-0">
            <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                        <Input
                            label="Búsqueda rápida"
                            placeholder="Nombre, DNI o celular..."
                            icon={IconSearch}
                            value={(table.getState().globalFilter as string) ?? ''}
                            onChange={(e) => table.setGlobalFilter(e.target.value)}
                            className="bg-background"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <DatePickerWithRange
                            label="Fecha de registro"
                            icon={IconCalendar}
                            value={dateRange}
                            onValueChange={(range) => table.getColumn('created_at')?.setFilterValue(range)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <DataTableFacetedFilter
                        column={table.getColumn('status')}
                        label="Estado"
                        placeholder="Todos los estados"
                        icon={IconFilter}
                        options={[
                            { label: 'Activo', value: 'active' },
                            { label: 'Inactivo', value: 'inactive' },
                            { label: 'Suspendido', value: 'suspended' },
                        ]}
                    />
                    {/*<DataTableFacetedFilter*/}
                    {/*    column={table.getColumn('role')}*/}
                    {/*    label="Rol de usuario"*/}
                    {/*    placeholder="Todos los roles"*/}
                    {/*    icon={IconUserShield}*/}
                    {/*    options={[*/}
                    {/*        { label: 'Superadmin', value: 'superadmin' },*/}
                    {/*        { label: 'Admin', value: 'admin' },*/}
                    {/*        { label: 'Promotor', value: 'promoter' },*/}
                    {/*        { label: 'Profesor', value: 'teacher' },*/}
                    {/*        { label: 'Estudiante', value: 'student' },*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    <div className="hidden lg:block" />
                    <div className="hidden lg:block" />
                </div>

                <div className="flex justify-end pt-2 border-t border-border/50">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="h-10 px-6 gap-2 bg-background hover:text-destructive transition-colors w-full md:w-auto"
                    >
                        <IconX size={18} />
                        Limpiar filtros
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}