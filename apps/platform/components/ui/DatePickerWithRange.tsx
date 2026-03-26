"use client"

import * as React from "react"
import {format} from "date-fns"
import {es} from "date-fns/locale"
import {Calendar as CalendarIcon, LucideIcon, X} from "lucide-react"
import {type DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
    className?: string
    label?: string
    value?: DateRange
    onValueChange?: (date: DateRange | undefined) => void
    placeholder?: string
    icon?: LucideIcon | any // Soporta Lucide o Tabler
    required?: boolean
}

export function DatePickerWithRange({
                                        className,
                                        label,
                                        value,
                                        onValueChange,
                                        placeholder = "Seleccionar rango",
                                        icon: Icon = CalendarIcon,
                                        required
                                    }: DatePickerWithRangeProps) {
    const id = React.useId()

    // Función para limpiar el rango
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        onValueChange?.(undefined)
    }

    return (
        <div className={cn("w-full space-y-1.5 text-left", className)}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none flex items-center gap-1"
                >
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </label>
            )}

            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative group">
                        {/* Icono izquierdo similar al Input */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground z-10">
                            <Icon size={18} strokeWidth={2} />
                        </div>

                        <Button
                            id={id}
                            variant="outline"
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-all outline-none pl-10 justify-start font-normal",
                                "hover:bg-transparent focus-visible:ring-3 focus-visible:ring-ring/20 focus-visible:border-ring",
                                !value && "text-muted-foreground"
                            )}
                        >
                            <span className="truncate">
                                {value?.from ? (
                                    value.to ? (
                                        <>
                                            {format(value.from, "dd LLL", { locale: es })} -{" "}
                                            {format(value.to, "dd LLL, y", { locale: es })}
                                        </>
                                    ) : (
                                        format(value.from, "PPP", { locale: es })
                                    )
                                ) : (
                                    <span>{placeholder}</span>
                                )}
                            </span>
                        </Button>

                        {/* Botón X para limpiar si hay valor (igual que el Input) */}
                        {value?.from && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition-colors focus:outline-none"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onValueChange}
                        numberOfMonths={2}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}