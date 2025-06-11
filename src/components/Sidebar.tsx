import { UserProfile } from './UserProfile';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextApp } from '@/contexts';
import { DarkModeToggle } from './DarkModeToggle';

import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  BarChart3,
  Phone,
  PhoneIncoming,
  DatabaseBackup,
  Users,
  FileChartColumn,
  ScrollText,
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', icon: BarChart3, route: '' },
  { title: 'Notificações', icon: ScrollText, route: 'notifications-history' },
  { title: 'Chamadas', icon: Phone, route: 'calls' },
  { title: 'Ramais', icon: PhoneIncoming, route: 'extensions' },
  { title: 'Usuários', icon: Users, route: 'users' },
  { title: 'Relatórios', icon: FileChartColumn, route: 'reports' },
  { title: 'Backup', icon: DatabaseBackup, route: 'backup' },
];

export function Sidebar() {
  const { activePage, setActivePage, theme } = useContextApp();
  const navigate = useNavigate();

  const handleMenuClick = (route: string) => {
    setActivePage(route);
    navigate(`/${route}`);

    const title = menuItems.find(item => item.route === route)?.title;

    window.document.title = `GrandCallPro - ${title || 'Dashboard'}`;
  };

  // TODO: Implement a function to check if the Central Grandstream is active
  const isActiveGrandstream = true;

  return (
    <SidebarUI>
      <div className="p-4 flex items-center gap-3 justify-between">
        <h1 className="text-xl font-bold">GrandCallPro</h1>
        <DarkModeToggle />
      </div>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {React.Children.toArray(
                menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => handleMenuClick(item.route)}
                        className={activePage === item.route ? 'bg-sidebar-accent' : ''}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2">
              <div className="flex items-center mt-1">
                {isActiveGrandstream ? (
                  <>
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Central Grandstream Ativa</span>
                  </>
                ) : (
                  <>
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Central Grandstream Inativa</span>
                  </>
                )}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <UserProfile />
    </SidebarUI>
  );
}
