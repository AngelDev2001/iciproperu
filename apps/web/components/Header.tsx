import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {ContentWidth} from '@/components/ContentWidth';

const navItems = [
  { title: 'Inicio', href: '/' },
  { title: 'Nosotros', href: '/nosotros' },
  { title: 'Cursos', href: '/cursos' },
  { title: 'Contacto', href: '/contacto' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <ContentWidth>
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-iciproperu.png"
                alt="ICIPRO - Instituto de Capacitación Integral Profesional"
                width={60}
                height={60}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent hover:text-primary transition-colors font-medium',
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-md transition-all active:scale-95"
            >
              Aula Virtual
            </Button>
          </div>
        </div>
      </ContentWidth>
    </header>
  );
}
