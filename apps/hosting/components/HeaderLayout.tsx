import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu, ShieldCheck } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';

export function HeaderLayout() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ContentWidth>
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/logo-iciproperu.png"
              alt="ICIPRO Logo"
              width={55}
              height={55}
              className="rounded-full border border-gold/30"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-primary leading-none">
                ICIPRO
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                Santa Rosa de Lima
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className={navigationMenuTriggerStyle()}>
                      Nosotros
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/courses" className={navigationMenuTriggerStyle()}>
                      Cursos de Ascenso
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className={navigationMenuTriggerStyle()}>
                      Contacto
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-4 flex items-center gap-3 border-l pl-6 border-border">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Plataforma Alumnos
              </Button>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <ShieldCheck className="h-4 w-4" />
                Verificar Certificado
              </Button>
            </div>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden text-primary">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </ContentWidth>
    </header>
  );
}
