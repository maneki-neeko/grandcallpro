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
import Footer from "./Footer";

export function Layout() {
  const [activePage, setActivePage] = useState("");
  const navigate = useNavigate();

  const handleMenuClick = (page: string) => {
    setActivePage(page);
    navigate(`/${page}`);

    window.document.title =
      page.charAt(0).toUpperCase() + page.slice(1) || "Dashboard";
  };

  // TODO: Implement a function to check if the Central Grandstream is active
  const isActiveGrandstream = true;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
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
                <div className="px-2 py-2">
                  <div className="flex items-center mt-1">
                    {isActiveGrandstream ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">
                          Central Grandstream Ativa
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">
                          Central Grandstream Inativa
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
