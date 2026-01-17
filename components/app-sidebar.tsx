'use client';

import { Anvil, Barcode, Home, Store, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Hitung Listrik',
    url: '/listrik',
    icon: Zap,
  },
  {
    title: 'Hitung Operasional',
    url: '/operasional',
    icon: Anvil,
  },
  {
    title: 'Hitung HPP Produk',
    url: '/hpp-produk',
    icon: Barcode,
  },
  {
    title: 'Hitung HPP Toko',
    url: '/hpp-toko',
    icon: Store
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

