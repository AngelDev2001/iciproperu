import { ContentWidth } from '@/components/ContentWidth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <main className="py-16 md:py-24">
      <ContentWidth>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Columna Izquierda: Información */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Estamos aquí para <span className="text-primary italic">ayudarte</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ¿Tienes dudas sobre los cursos de ascenso o el proceso de certificación? Nuestro
                equipo técnico está listo para brindarte la asesoría que necesitas.
              </p>
            </div>

            <div className="grid gap-6">
              <ContactInfoCard
                icon={<Phone className="text-primary" />}
                title="Llámanos o escríbenos"
                detail="+51 947 979 136"
                subDetail="WhatsApp disponible para consultas rápidas"
              />
              <ContactInfoCard
                icon={<Mail className="text-primary" />}
                title="Consultas académicas"
                detail="administracion@iciproperu.com"
              />
              <ContactInfoCard
                icon={<MapPin className="text-primary" />}
                title="Ubicación"
                detail="Calle Tres de Mayo L2, Santiago - Cusco"
              />
              <ContactInfoCard
                icon={<Clock className="text-primary" />}
                title="Horario de Atención"
                detail="Lunes a Domingo: 07:00 AM - 24:00 PM"
              />
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <Card className="shadow-2xl border-none">
            <CardContent className="p-8 md:p-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Envíanos un mensaje</h3>
                <p className="text-sm text-muted-foreground">
                  Te responderemos en menos de 24 horas hábiles.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DNI</label>
                    <Input placeholder="Ej. 70654321" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombres</label>
                    <Input placeholder="Tu nombre completo" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Celular</label>
                  <Input type="tel" placeholder="+51 900 000 000" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo electrónico</label>
                  <Input type="email" placeholder="nombre@ejemplo.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensaje</label>
                  <Textarea
                    placeholder="¿En qué curso estás interesado?"
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full h-12 text-base font-bold gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Consulta
                </Button>
              </form>

              <div className="pt-4 border-t flex items-center justify-center gap-2 text-sm font-medium text-primary">
                <MessageCircle className="h-5 w-5" />
                <span>O chatea directamente por WhatsApp</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentWidth>

      {/* Mapa - Sección inferior opcional */}
      <div className="mt-24 h-96 w-full bg-muted grayscale opacity-50 contrast-125">
        {/* Aquí integrarías el iframe de Google Maps si deseas */}
        <div className="w-full h-full flex items-center justify-center border-y">
          <p className="text-muted-foreground uppercase tracking-widest font-bold">
            Mapa de Ubicación (Google Maps)
          </p>
        </div>
      </div>
    </main>
  );
}

function ContactInfoCard({ icon, title, detail, subDetail }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-secondary/20 transition-all">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-muted-foreground text-sm">{detail}</p>
        {subDetail && (
          <p className="text-primary text-[10px] font-bold uppercase mt-1 italic">{subDetail}</p>
        )}
      </div>
    </div>
  );
}
