import { Outlet, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import {
  BarChart3,
  Phone,
  PhoneIncoming,
  DatabaseBackup,
  Users,
  FileChartColumn,
} from "lucide-react";

export function Layout() {
  const [activePage, setActivePage] = useState("");
  const navigate = useNavigate();

  const handleMenuClick = (page: string) => {
    setActivePage(page);
    navigate(`/${page}`);

    window.document.title =
      page.charAt(0).toUpperCase() + page.slice(1) || "Dashboard";
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <div className="p-4">
          <h1 className="text-xl font-bold">GrandCallPro</h1>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={!activePage ? "bg-sidebar-accent" : ""}
                    onClick={() => handleMenuClick("")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={
                      activePage === "calls" ? "bg-sidebar-accent" : ""
                    }
                    onClick={() => handleMenuClick("calls")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Chamadas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={
                      activePage === "extensions" ? "bg-sidebar-accent" : ""
                    }
                    onClick={() => handleMenuClick("extensions")}
                  >
                    <PhoneIncoming className="h-4 w-4 mr-2" />
                    <span>Ramais</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={
                      activePage === "users" ? "bg-sidebar-accent" : ""
                    }
                    onClick={() => handleMenuClick("users")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    <span>Usuários</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={
                      activePage === "reports" ? "bg-sidebar-accent" : ""
                    }
                    onClick={() => handleMenuClick("reports")}
                  >
                    <FileChartColumn className="h-4 w-4 mr-2" />
                    <span>Relatórios</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={
                      activePage === "backup" ? "bg-sidebar-accent" : ""
                    }
                    onClick={() => handleMenuClick("backup")}
                  >
                    <DatabaseBackup className="h-4 w-4 mr-2" />
                    <span>Backup</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Status</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Sistema conectado</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Central Grandstream ativa</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Outlet />
    </div>
  );
}
