import * as React from "react"
import {CheckCircle2, Eye, EyeOff, LucideIcon, X} from "lucide-react"
import {cn} from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
    label?: string
    error?: string
    success?: boolean
    helperText?: string
    icon?: LucideIcon
    isLoading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, success, helperText, icon: Icon, required, isLoading, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const id = React.useId()
        const errorId = `${id}-error`

        const inputRef = React.useRef<HTMLInputElement | null>(null)

        const handleClear = () => {
            if (inputRef.current) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
                nativeInputValueSetter?.call(inputRef.current, "")
                const event = new Event("input", { bubbles: true })
                inputRef.current.dispatchEvent(event)
                inputRef.current.focus()
            }
        }

        React.useImperativeHandle(ref, () => inputRef.current!)

        if (isLoading) {
            return (
                <div className="w-full space-y-2 animate-pulse text-left">
                    {label && <div className="h-4 w-24 bg-muted rounded" />}
                    <div className="h-10 w-full bg-muted rounded-md" />
                </div>
            )
        }

        const isPassword = type === "password"
        const inputType = isPassword ? (showPassword ? "text" : "password") : type
        const hasValue = !!(inputRef.current?.value || props.value)

        return (
            <div className="w-full space-y-1.5 text-left" data-slot="input-container">
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
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground">
                            <Icon size={18} strokeWidth={2} />
                        </div>
                    )}

                    <input
                        id={id}
                        ref={inputRef}
                        type={inputType}
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : undefined}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-all outline-none",
                            "placeholder:text-muted-foreground",
                            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            Icon && "pl-10",
                            (isPassword || hasValue || (success && !error)) && "pr-10",
                            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                            success && !error && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
                            className
                        )}
                        {...props}
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground">
                        {success && !error && !isPassword && (
                            <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in" />
                        )}

                        {isPassword ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="hover:text-foreground focus:outline-none transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        ) : (
                            hasValue && !props.disabled && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="hover:text-destructive focus:outline-none transition-colors"
                                    tabIndex={-1}
                                >
                                    <X size={18} />
                                </button>
                            )
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
Input.displayName = "Input"

export { Input }