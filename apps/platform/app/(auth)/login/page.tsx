"use client"

import Link from "next/link"
import {useRouter} from "next/navigation" // Importamos para redirigir
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {createClient} from "@/utils/supabase/client" // Tu cliente de navegador
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useState} from "react"

const loginSchema = z.object({
    email: z.string().email("Introduce un correo electrónico válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })

        if (error) {
            // Aquí podrías usar un toast, por ahora usaremos el setEror de react-hook-form
            form.setError("root", {
                message: "Credenciales incorrectas o usuario no encontrado"
            })
            setLoading(false)
            return
        }

        // Si el login es exitoso, el proxy.ts detectará la sesión
        // y permitirá entrar al dashboard.
        router.push("/")
        router.refresh() // Forzamos refresco para que el sidebar cargue datos del usuario
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        {/* Formulario */}
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col items-center gap-2 text-center mb-6">
                                <img src="/logo-iciproperu.png" alt="Logo" className="h-10 w-auto mb-2" />
                                <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Ingresa tus credenciales para acceder al sistema
                                </p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Mensaje de error general */}
                                    {form.formState.errors.root && (
                                        <p className="text-sm font-medium text-destructive text-center bg-destructive/10 p-2 rounded">
                                            {form.formState.errors.root.message}
                                        </p>
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo Electrónico</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="nombre@empresa.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between">
                                                    <FormLabel>Contraseña</FormLabel>
                                                    <Link
                                                        href="/forgot-password"
                                                        className="text-xs text-primary hover:underline"
                                                    >
                                                        ¿Olvidaste tu contraseña?
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                                    </Button>
                                </form>
                            </Form>
                        </div>

                        {/* Panel Lateral con Gradiente */}
                        <div className="relative hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#064e3b] md:block">
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white text-center">
                                <blockquote className="space-y-4">
                                    <p className="text-xl font-light italic leading-relaxed">
                                        "La educación es el arma más poderosa para cambiar el mundo."
                                    </p>
                                    <footer className="text-sm font-medium tracking-widest uppercase opacity-60">
                                        Icipro Perú
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <p className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mt-6">
                    Al iniciar sesión, aceptas nuestros <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>.
                </p>
            </div>
        </div>
    )
}