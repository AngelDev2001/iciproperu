import { BellRing, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContentWidth } from '@/components/ContentWidth';

export function Newsletter() {
  return (
    <section className="py-16">
      <ContentWidth>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-12 md:px-16 md:py-16 text-primary-foreground shadow-2xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <BellRing className="h-3.5 w-3.5" />
                Mantente actualizado
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                No pierdas la oportunidad <br /> de tu próximo ascenso.
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md leading-relaxed">
                Recibe notificaciones sobre nuevos cursos, fechas de exámenes y talleres gratuitos
                directamente en tu correo.
              </p>
            </div>

            <div className="space-y-4">
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico institucional o personal"
                  className="h-14 bg-white text-foreground border-none rounded-xl text-base px-6 focus-visible:ring-2 focus-visible:ring-gold/50"
                  required
                />
                <Button className="h-14 px-8 bg-black hover:bg-black/80 text-white font-bold rounded-xl transition-all flex items-center gap-2 group">
                  Suscribirme
                  <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
              <div className="flex items-center gap-3 text-xs text-primary-foreground/60">
                <ShieldCheck className="h-4 w-4" />
                <span>
                  Respetamos tu privacidad. No enviamos spam y puedes darte de baja en cualquier
                  momento.
                </span>
              </div>
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
