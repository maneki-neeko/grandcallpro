import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Phone, PhoneCall, Users, Settings, BarChart3, PhoneIncoming, PieChart } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { callData, extensionInfo } from "@/data/callsData";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activePage, setActivePage] = useState("dashboard");
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // Mock data for recent calls
  const recentCalls = callData.slice(0, 4).map((call, idx) => ({
    id: idx + 1,
    number: call.origem,
    name: extensionInfo[call.origem]?.colaborador || "Desconhecido",
    time: call.data.split(" ")[1],
    duration: call.duracao,
    type: call.desfecho === "ATENDIDA" ? "incoming" : "missed",
    status: call.desfecho === "ATENDIDA" ? "completed" : "missed"
  }));

  // Mock notifications
  const notifications = [
    { id: 1, title: "Nova chamada recebida", description: "Você recebeu uma chamada de (11) 98765-4321." },
    { id: 2, title: "Chamada perdida", description: "Você perdeu uma chamada de (11) 91234-5678." },
    { id: 3, title: "Usuário adicionado", description: "Novo usuário Paulo foi adicionado ao sistema." },
  ];

  const handleMenuClick = (page: string) => {
    setActivePage(page);
    
    // Navegar para a página correspondente
    switch (page) {
      case "dashboard":
        navigate("/");
        break;
      case "calls":
        navigate("/calls");
        break;
      case "users":
        navigate("/users");
        break;
      case "extensions":
        navigate("/extensions");
        break;
      case "backup":
        navigate("/backup");
        break;
      case "reports":
        navigate("/reports");
        break;
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Main content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => setNotificationModalOpen(true)}>
            Notificações
          </Button>
        </header>
        <Dialog open={notificationModalOpen} onOpenChange={setNotificationModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
              <DialogDescription>Veja as notificações recentes do sistema.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {notifications.length === 0 ? (
                <div className="text-center text-muted-foreground">Nenhuma notificação.</div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="border rounded p-3 bg-muted">
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-sm text-muted-foreground">{n.description}</div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Chamadas Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação a ontem
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Chamadas Perdidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                -3% em relação a ontem
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Duração Média
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3:25</div>
              <p className="text-xs text-muted-foreground">
                +30s em relação a ontem
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Chamadas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent calls */}
        <Card>
          <CardHeader>
            <CardTitle>Chamadas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted">
                  <tr>
                    <th scope="col" className="px-4 py-2">
                      Número
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Nome
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Horário
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Duração
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Tipo
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentCalls.map((call) => (
                    <tr key={call.id} className="border-b">
                      <td className="px-4 py-3">
                        {extensionInfo[
                          call.number as keyof typeof extensionInfo
                        ] ? (
                          <HoverCard>
                            <HoverCardTrigger className="underline cursor-help text-blue-500">
                              {call.number}
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-blue-500 text-white p-4 w-72">
                              <div className="space-y-1">
                                <p>
                                  <strong>Departamento:</strong>{" "}
                                  {
                                    extensionInfo[
                                      call.number as keyof typeof extensionInfo
                                    ].departamento
                                  }
                                </p>
                                <p>
                                  <strong>Setor:</strong>{" "}
                                  {
                                    extensionInfo[
                                      call.number as keyof typeof extensionInfo
                                    ].setor
                                  }
                                </p>
                                <p>
                                  <strong>Subsetor:</strong>{" "}
                                  {
                                    extensionInfo[
                                      call.number as keyof typeof extensionInfo
                                    ].subsetor
                                  }
                                </p>
                                <p>
                                  <strong>Colaborador:</strong>{" "}
                                  {
                                    extensionInfo[
                                      call.number as keyof typeof extensionInfo
                                    ].colaborador
                                  }
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ) : (
                          call.number
                        )}
                      </td>
                      <td className="px-4 py-3">{call.name}</td>
                      <td className="px-4 py-3">{call.time}</td>
                      <td className="px-4 py-3">{call.duration}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center ${
                            call.type === "incoming"
                              ? "text-blue-500"
                              : call.type === "outgoing"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {call.type === "incoming" && (
                            <Phone className="h-3 w-3 mr-1 transform rotate-45" />
                          )}
                          {call.type === "outgoing" && (
                            <Phone className="h-3 w-3 mr-1 transform -rotate-45" />
                          )}
                          {call.type === "missed" && (
                            <Phone className="h-3 w-3 mr-1 text-red-500" />
                          )}
                          {call.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            call.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {call.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/calls")}
              >
                Ver todas as chamadas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
