'use client';

import * as React from 'react';
import {IconCirclePlusFilled, IconMail} from '@tabler/icons-react';
import {ChevronRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function NavMain({ items }: { items: any[] }) {
  return (
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          {/* Sección de Acciones Rápidas */}
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton className="min-w-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <IconCirclePlusFilled size={20} />
                <span>Quick Create</span>
              </SidebarMenuButton>
              <Button size="icon" className="size-8" variant="outline">
                <IconMail size={18} />
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Menú de Navegación Principal */}
          <SidebarMenu>
            {items.map((item) => (
                <NavMenuItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
  );
}

/**
 * Componente para Items del Primer Nivel
 */
function NavMenuItem({ item }: { item: any }) {
  const hasSubItems = item.items && item.items.length > 0;

  if (!hasSubItems) {
    return (
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={item.title}>
            <a href={item.url}>
              {item.icon && <item.icon size={20} />}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
    );
  }

  return (
      <Collapsible key={item.title} asChild className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon size={20} />}
              <span className="flex-1 text-left">{item.title}</span>
              <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem: any) => (
                  <NavSubItem key={subItem.title} item={subItem} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
  );
}

/**
 * Componente para Sub-Items (Segundo y Tercer Nivel)
 * Maneja de forma recursiva si un sub-item tiene a su vez más items.
 */
function NavSubItem({ item }: { item: any }) {
  const hasSubItems = item.items && item.items.length > 0;

  if (!hasSubItems) {
    return (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <a href={item.url} className="flex items-center gap-3">
              {item.icon && <item.icon size={18} />}
              <span className="text-sm">{item.title}</span>
            </a>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
  }

  return (
      <SidebarMenuSubItem>
        <Collapsible className="group/sub-collapsible">
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton className="w-full">
              <div className="flex items-center gap-3 w-full">
                {item.icon && <item.icon size={18} />}
                <span className="flex-1 text-left text-sm">{item.title}</span>
                <ChevronRight className="ml-auto size-3 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-90" />
              </div>
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="ml-4 border-l border-sidebar-border/50 pl-2">
              {item.items.map((innerItem: any) => (
                  <SidebarMenuSubItem key={innerItem.title}>
                    <SidebarMenuSubButton asChild>
                      <a href={innerItem.url} className="flex items-center gap-2">
                        {innerItem.icon && <innerItem.icon size={14} />}
                        <span className="text-xs">{innerItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
  );
}