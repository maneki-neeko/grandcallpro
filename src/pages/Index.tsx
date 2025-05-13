import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { callData, extensionInfo } from "@/data/callsData";
import CallStatusBadge from "@/components/calls/CallStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // Mock data for recent calls
  const recentCalls = callData.slice(0, 5);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Nova chamada recebida",
      description: "Você recebeu uma chamada de (11) 98765-4321.",
    },
    {
      id: 2,
      title: "Chamada perdida",
      description: "Você perdeu uma chamada de (11) 91234-5678.",
    },
    {
      id: 3,
      title: "Usuário adicionado",
      description: "Novo usuário Paulo foi adicionado ao sistema.",
    },
  ];

  return (
    <div className="flex w-full">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start p-8 max-w-5xl">
        <header className="flex justify-between items-center mb-6 w-full">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <BarChart3 className="text-primary h-6 w-6" />
          </div>
          <Button onClick={() => setNotificationModalOpen(true)}>
            Notificações
          </Button>
        </header>
        <Dialog
          open={notificationModalOpen}
          onOpenChange={setNotificationModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
              <DialogDescription>
                Veja as notificações recentes do sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {notifications.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  Nenhuma notificação.
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="border rounded p-3 bg-muted">
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {n.description}
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 w-full">
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
          {/* <Card>
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
          </Card> */}
        </div>

        {/* Recent calls */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Chamadas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Origem</TableHead>
                    <TableHead className="text-center">Destino</TableHead>
                    <TableHead className="text-center">Data/Hora</TableHead>
                    <TableHead className="text-center">Desfecho</TableHead>
                    <TableHead className="text-center">Duração</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="last:border-b">
                  {recentCalls.map((call, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-center">
                        <HoverCard>
                          <HoverCardTrigger className="underline cursor-help text-blue-500">
                            {call.origem}
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-blue-500 text-white p-4 w-72">
                            <div className="space-y-1">
                              <p>
                                <strong>Departamento:</strong>{" "}
                                {extensionInfo[call.origem]?.departamento ||
                                  "-"}
                              </p>
                              <p>
                                <strong>Setor:</strong>{" "}
                                {extensionInfo[call.origem]?.setor || "-"}
                              </p>
                              <p>
                                <strong>Subsetor:</strong>{" "}
                                {extensionInfo[call.origem]?.subsetor || "-"}
                              </p>
                              <p>
                                <strong>Colaborador:</strong>{" "}
                                {extensionInfo[call.origem]?.colaborador || "-"}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                      <TableCell className="text-center">
                        <HoverCard>
                          <HoverCardTrigger className="underline cursor-help text-blue-500">
                            {call.destino}
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-blue-500 text-white p-4 w-72">
                            <div className="space-y-1">
                              <p>
                                <strong>Departamento:</strong>{" "}
                                {extensionInfo[call.destino]?.departamento ||
                                  "-"}
                              </p>
                              <p>
                                <strong>Setor:</strong>{" "}
                                {extensionInfo[call.destino]?.setor || "-"}
                              </p>
                              <p>
                                <strong>Subsetor:</strong>{" "}
                                {extensionInfo[call.destino]?.subsetor || "-"}
                              </p>
                              <p>
                                <strong>Colaborador:</strong>{" "}
                                {extensionInfo[call.destino]?.colaborador ||
                                  "-"}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                      <TableCell className="text-center">{call.data}</TableCell>
                      <TableCell className="text-center">
                        <CallStatusBadge status={call.desfecho} />
                      </TableCell>
                      <TableCell className="text-center">
                        {call.duracao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="my-4 mr-4 flex justify-end">
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
      </main>
    </div>
  );
};

export default Index;
