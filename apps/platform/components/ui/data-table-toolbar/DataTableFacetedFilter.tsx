import * as React from 'react';
import {Column} from '@tanstack/react-table';
import {Select, SelectItem} from '@/components/ui/select';

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    label: string;
    placeholder?: string;
    icon?: any;
    options: { label: string; value: string }[];
}

export function DataTableFacetedFilter<TData, TValue>({
                                                          column,
                                                          label,
                                                          placeholder,
                                                          icon,
                                                          options,
                                                      }: DataTableFacetedFilterProps<TData, TValue>) {
    const value = (column?.getFilterValue() as string) ?? '';

    return (
        <Select
            label={label}
            placeholder={placeholder}
            icon={icon}
            value={value}
            onValueChange={(val) => column?.setFilterValue(val === 'all' ? '' : val)}
        >
            <SelectItem value="all">Todos</SelectItem>
            {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                </SelectItem>
            ))}
        </Select>
    );
}