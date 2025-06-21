import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CallStatusBadge } from '@/components/calls/CallStatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart3 } from 'lucide-react';
import { useContextApp } from '@/contexts';
import { useQuery } from '@tanstack/react-query';
import { formatDateWithTime } from '@/utils/date';
import dashboardServices from '@/services/dashboard';
import { socket } from '@/socket';
import { Dashboard } from '@/types/dashboard';

const Index = () => {
  const navigate = useNavigate();
  const { setActivePage } = useContextApp();
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);

  useEffect(() => {
    socket.on('dashboard', value => setDashboardData(value));
  }, []);

  const getDataDashboard = async () => {
    try {
      const data = await dashboardServices.getDataDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    getDataDashboard();
  }, []);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Nova chamada recebida',
      description: 'Você recebeu uma chamada de (11) 98765-4321.',
    },
    {
      id: 2,
      title: 'Chamada perdida',
      description: 'Você perdeu uma chamada de (11) 91234-5678.',
    },
    {
      id: 3,
      title: 'Usuário adicionado',
      description: 'Novo usuário Paulo foi adicionado ao sistema.',
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
          <Button onClick={() => setNotificationModalOpen(true)}>Notificações</Button>
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
                notifications.map(n => (
                  <div key={n.id} className="border rounded p-3 bg-card-custom">
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-sm text-muted-foreground">{n.description}</div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate('/notifications-history');
                  setActivePage('notifications-history');
                }}
              >
                Ver todas as notificações
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats overview */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 w-full">
          {dashboardData?.cards?.map((card, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.content}</div>
                <p className="text-xs text-muted-foreground">{card.percentualDifference}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}

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
                  {/* {React.Children.toArray(
                    dashboardData?.calls?.map(call => (
                      <TableRow>
                        <TableCell className="text-center">
                          <HoverCard>
                            <HoverCardTrigger className="underline cursor-help text-blue-500">
                              {call.origin.value}
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-card-custom p-4 w-72">
                              <div className="space-y-1">
                                <p>
                                  <strong>Departamento:</strong> {'-'}
                                </p>
                                <p>
                                  <strong>Setor:</strong> {'-'}
                                </p>
                                <p>
                                  <strong>Subsetor:</strong> {'-'}
                                </p>
                                <p>
                                  <strong>Colaborador:</strong> {'-'}
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell className="text-center">
                          <HoverCard>
                            <HoverCardTrigger className="underline cursor-help text-blue-500">
                              {call.destiny.value}
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-card-custom p-4 w-72">
                              <div className="space-y-1">
                                <p>
                                  <strong>Departamento:</strong> {'-'}
                                </p>
                                <p>
                                  <strong>Setor:</strong> {'-'}
                                </p>
                                <p>
                                  <strong>Subsetor:</strong> {'-'}
                                </p>
                                <p>
                                  <strong>Colaborador:</strong> {'-'}
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell className="text-center">
                          {formatDateWithTime(call.timestamp)}
                        </TableCell>
                        <TableCell className="text-center">
                          <CallStatusBadge status={call.status.value} />
                        </TableCell>
                        <TableCell className="text-center">{call.duration}</TableCell>
                      </TableRow>
                    ))
                  )} */}
                </TableBody>
              </Table>
            </div>
            <div className="my-4 mr-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate('/calls');
                  setActivePage('calls');
                }}
                className="dark:bg-[#141413] dark:text-white dark:border dark:border-border dark:hover:bg-[#222] border border-border"
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
