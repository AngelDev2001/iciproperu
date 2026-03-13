'use client';

import * as React from 'react';
import {
  IconAward,
  IconBook,
  IconBriefcase,
  IconFileCertificate,
  IconLayoutDashboard,
  IconList,
  IconPlus,
  IconSettings,
  IconShieldCheck,
  IconUsers,
} from '@tabler/icons-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from '@/app/(dashboard)/components/nav-main';
import { NavSecondary } from '@/app/(dashboard)/components/nav-secondary';
import { NavUser } from '@/app/(dashboard)/components/nav-user';
import Link from 'next/link';

const data = {
  user: {
    name: 'Angel Gala',
    email: 'galafloresangelemilio@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconLayoutDashboard,
    },
    {
      title: 'Administración',
      url: '#',
      icon: IconBriefcase,
      items: [
        {
          title: 'Usuarios',
          url: '/',
          icon: IconUsers,
        },
        {
          title: 'Roles y Permisos',
          url: '/',
          icon: IconShieldCheck,
        },
      ],
    },
    {
      title: 'Cursos',
      url: '#',
      icon: IconBook,
      items: [
        {
          title: 'Crear',
          url: '/',
          icon: IconPlus,
        },
        {
          title: 'Lista',
          url: '/',
          icon: IconList,
        },
      ],
    },
    {
      title: 'Solicitud de Certificados',
      url: '#',
      icon: IconFileCertificate,
      items: [
        {
          title: 'Crear',
          url: '/',
          icon: IconPlus,
        },
        {
          title: 'Lista',
          url: '/',
          icon: IconList,
        },
      ],
    },
    {
      title: 'Certificados',
      url: '#',
      icon: IconAward,
      items: [
        {
          title: 'Crear',
          url: '/',
          icon: IconPlus,
        },
        {
          title: 'Lista',
          url: '/',
          icon: IconList,
        },
      ],
    },
  ],
  navClouds: [],
  navSecondary: [
    {
      title: 'Ajustes',
      url: '#',
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo-iciproperu.png" alt="Logo de Icipro Peru" className="h-8" />
                <span className="text-base font-semibold">Icipro Perú</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
