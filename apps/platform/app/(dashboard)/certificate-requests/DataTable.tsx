'use client';

import * as React from 'react';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconLoader2} from '@tabler/icons-react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {Select, SelectItem,} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  enableReordering?: boolean;
  meta?: any;
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data: initialData,
                                           isLoading = false,
                                           enableReordering = false,
                                           meta
                                         }: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map((item:any) => item.id) || [], [data]);

  const table = useReactTable({
    data,
    columns,
    meta,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                      {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                      ))}
                    </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {isLoading ? (
                    // ESTADO DE CARGA
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <IconLoader2 className="h-5 w-5 animate-spin" />
                          <span className="text-sm font-medium">Cargando datos...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                ) : table.getRowModel().rows?.length ? (
                    // ESTADO CON DATOS
                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                      {table.getRowModel().rows.map((row) => (
                          <DraggableRow key={row.id} row={row} enableReordering={enableReordering} />
                      ))}
                    </SortableContext>
                ) : (
                    // ESTADO VACÍO (Solo si ya terminó de cargar y no hay nada)
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground italic">
                        No se encontraron resultados.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Filas por página</p>
              <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                  triggerClassName="h-8 w-20"
                  className="w-fit"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
              >
                <IconChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
              >
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
              >
                <IconChevronRight className="h-4 w-4" />
              </Button>
              <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
              >
                <IconChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}

function DraggableRow({ row, enableReordering }: { row: any; enableReordering: boolean }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
    disabled: !enableReordering,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
      <TableRow
          ref={setNodeRef}
          style={style}
          data-state={row.getIsSelected() && 'selected'}
          className={cn(
              'group relative transition-colors hover:bg-muted/50',
              isDragging && 'z-10 opacity-80 bg-accent shadow-sm'
          )}
      >
        {row.getVisibleCells().map((cell: any) => (
            <TableCell key={cell.id} className="py-3">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
        ))}
      </TableRow>
  );
}