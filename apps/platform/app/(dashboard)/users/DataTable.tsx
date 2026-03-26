'use client';

import * as React from 'react';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight} from '@tabler/icons-react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';

import {Button} from '@/components/ui/button';
import {Select, SelectItem} from '@/components/ui/select';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Skeleton} from '@/components/ui/skeleton';
import {cn} from '@/lib/utils';
import {DataTableToolbar} from "@/components/ui/DataTableToolbar";
import {Card, CardContent} from "@/components/ui/card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  enableReordering?: boolean;
}

function DraggableRow<TData>({ row }: { row: Row<TData> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: (row.original as any).id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
      <TableRow
          ref={setNodeRef}
          style={style}
          className={cn(
              'relative z-0 transition-colors',
              isDragging && 'z-10 opacity-80 bg-accent shadow-lg'
          )}
      >
        {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
        ))}
      </TableRow>
  );
}

export function DataTable<TData, TValue>({
                                           data: initialData,
                                           columns,
                                           isLoading = false,
                                           enableReordering = true,
                                         }: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState(initialData);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  React.useEffect(() => setData(initialData), [initialData]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: (row: any) => row.id?.toString(),
  });

  const dataIds = React.useMemo(() => data.map((item: any) => item.id), [data]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
      <div className="w-full space-y-4">
        <DataTableToolbar table={table} />

        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
              <Table>
                <TableHeader className="bg-muted/50">
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                              {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                      </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            {columns.map((_, j) => (
                                <TableCell key={j}><Skeleton className="h-6 w-full opacity-50" /></TableCell>
                            ))}
                          </TableRow>
                      ))
                  ) : table.getRowModel().rows?.length ? (
                      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                        {table.getRowModel().rows.map((row) => (
                            <DraggableRow key={row.id} row={row} />
                        ))}
                      </SortableContext>
                  ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground italic">
                          No se encontraron resultados.
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">Filas por página</p>
            <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-6 lg:gap-8">
          <span className="text-sm font-medium tabular-nums">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage() || isLoading}>
                <IconChevronsLeft className="size-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage() || isLoading}>
                <IconChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage() || isLoading}>
                <IconChevronRight className="size-4" />
              </Button>
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage() || isLoading}>
                <IconChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}