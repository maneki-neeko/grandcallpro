import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import CallFilters from "@/components/calls/CallFilters";
import CallTable from "@/components/calls/CallTable";
import PaginationControls from "@/components/calls/PaginationControls";
import { callData, extensionInfo } from "@/data/callsData";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, PhoneCall, PhoneIncoming, Settings, Users } from "lucide-react";

const Calls = () => {
  const navigate = useNavigate();
  const [filterOrigin, setFilterOrigin] = useState(true);
  const [filterDestination, setFilterDestination] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrar os dados baseados nos critérios
  const filteredData = callData.filter(call => {
    if (searchTerm === "") return true;
    
    if (filterOrigin && call.origem.includes(searchTerm)) return true;
    if (filterDestination && call.destino.includes(searchTerm)) return true;
    
    return false;
  });

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/")}> {/* Dashboard */}
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/calls")}> {/* Chamadas */}
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Chamadas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/active-calls")}> {/* Chamadas Ativas */}
                    <PhoneCall className="h-4 w-4 mr-2" />
                    <span>Chamadas Ativas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/extensions")}> {/* Ramais */}
                    <PhoneIncoming className="h-4 w-4 mr-2" />
                    <span>Ramais</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/users")}> {/* Usuários */}
                    <Users className="h-4 w-4 mr-2" />
                    <span>Usuários</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/settings")}> {/* Configurações */}
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Configurações</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Phone className="text-primary h-6 w-6" />
          <h1 className="text-2xl font-bold">Registros de ligação</h1>
        </div>
        <CallFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterOrigin={filterOrigin}
          setFilterOrigin={setFilterOrigin}
          filterDestination={filterDestination}
          setFilterDestination={setFilterDestination}
        />
        <CallTable 
          calls={filteredData}
          extensionInfo={extensionInfo}
        />
        <PaginationControls />
      </main>
    </div>
  );
};

export default Calls;
