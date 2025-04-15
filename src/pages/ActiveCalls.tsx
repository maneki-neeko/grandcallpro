import { useNavigate } from "react-router-dom";
import { PhoneCall, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, PhoneIncoming, Settings, Users } from "lucide-react";

const ActiveCalls = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock de dados para chamadas ativas
  const activeCalls = [
    { id: 1, origin: "270", destination: "272", duration: "1:32", status: "Em andamento" },
    { id: 2, origin: "348", destination: "210", duration: "0:47", status: "Em andamento" },
    { id: 3, origin: "204", destination: "997994623", duration: "2:15", status: "Em andamento" },
    { id: 4, origin: "311", destination: "222", duration: "0:32", status: "Em andamento" },
    { id: 5, origin: "18996060550", destination: "348", duration: "4:05", status: "Em andamento" },
  ];

  const handleEndCall = (id: number) => {
    toast({
      title: "Ação",
      description: `Encerrar chamada ${id} (função será implementada em breve)`,
    });
  };

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
        <h1 className="text-2xl font-bold mb-6">Chamadas Ativas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCalls.map((call) => (
            <Card key={call.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2 text-green-500" />
                    <span>Chamada #{call.id}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{call.duration}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Origem:</div>
                    <div className="font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {call.origin}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Destino:</div>
                    <div className="font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2 transform rotate-90" />
                      {call.destination}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleEndCall(call.id)}
                    >
                      Encerrar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {activeCalls.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Nenhuma chamada ativa no momento.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ActiveCalls;
