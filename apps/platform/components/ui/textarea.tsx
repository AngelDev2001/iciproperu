import * as React from "react"
import {CheckCircle2, LucideIcon, X} from "lucide-react"
import {cn} from "@/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
    label?: string
    error?: string
    success?: boolean
    helperText?: string
    icon?: LucideIcon
    isLoading?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, success, helperText, icon: Icon, required, isLoading, ...props }, ref) => {
        const id = React.useId()
        const errorId = `${id}-error`
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

        const handleClear = () => {
            if (textareaRef.current) {
                const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set
                nativeValueSetter?.call(textareaRef.current, "")
                const event = new Event("input", { bubbles: true })
                textareaRef.current.dispatchEvent(event)
                textareaRef.current.focus()
            }
        }

        React.useImperativeHandle(ref, () => textareaRef.current!)

        if (isLoading) {
            return (
                <div className="w-full space-y-2 animate-pulse text-left">
                    {label && <div className="h-4 w-24 bg-muted rounded" />}
                    <div className="h-24 w-full bg-muted rounded-md" />
                </div>
            )
        }

        const hasValue = !!(textareaRef.current?.value || props.value)

        return (
            <div className="w-full space-y-1.5 text-left" data-slot="textarea-container">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                    >
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </label>
                )}

                <div className="relative group">
                    {Icon && (
                        <div className="absolute left-3 top-3 text-muted-foreground transition-colors group-focus-within:text-foreground">
                            <Icon size={18} strokeWidth={2} />
                        </div>
                    )}

                    <textarea
                        id={id}
                        ref={textareaRef}
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : undefined}
                        className={cn(
                            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-all outline-none",
                            "placeholder:text-muted-foreground",
                            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "field-sizing-content", // Mantiene tu ajuste automático de altura
                            Icon && "pl-10",
                            (hasValue || (success && !error)) && "pr-10",
                            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                            success && !error && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
                            className
                        )}
                        {...props}
                    />

                    <div className="absolute right-3 top-3 flex items-center gap-1.5 text-muted-foreground">
                        {success && !error && (
                            <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in" />
                        )}

                        {hasValue && !props.disabled && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="hover:text-destructive focus:outline-none transition-colors"
                                tabIndex={-1}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {error ? (
                    <p id={errorId} className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="text-xs text-muted-foreground">
                        {helperText}
                    </p>
                ) : null}
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }