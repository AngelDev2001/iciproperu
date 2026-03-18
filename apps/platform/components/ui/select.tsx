'use client';

import * as React from 'react';
import { CheckIcon, ChevronDownIcon, LucideIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  isLoading?: boolean;
}

function Select({
  children,
  label,
  error,
  helperText,
  required,
  icon: Icon,
  placeholder,
  className,
  triggerClassName,
  isLoading,
  ...props
}: SelectProps) {
  const id = React.useId();

  if (isLoading) {
    return (
      <div className="w-full space-y-2 animate-pulse text-left">
        {label && <div className="h-4 w-24 bg-muted rounded" />}
        <div className="h-10 w-full bg-muted rounded-md" />
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-1.5 text-left', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <SelectPrimitive.Root {...props}>
        <SelectTrigger id={id} icon={Icon} error={!!error} className={triggerClassName}>
          <SelectPrimitive.Value placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </SelectPrimitive.Root>

      {error ? (
        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

function SelectTrigger({
  className,
  icon: Icon,
  error,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  icon?: LucideIcon;
  error?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-all outline-none focus:border-ring focus:ring-3 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground',
        error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 truncate">
        {Icon && <Icon size={18} className="text-muted-foreground shrink-0" />}
        {children}
      </div>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// ... SelectContent, SelectItem, etc. se mantienen igual pero con pequeños ajustes de estilo
// Solo asegúrate de copiar el SelectContent y SelectItem que ya tenías pero verifica los estilos de padding

function SelectContent({
  className,
  children,
  position = 'popper', // Cambiado a popper por defecto para mejor control de ancho
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2',
          position === 'popper' && 'w-[var(--radix-select-trigger-width)]',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger };
