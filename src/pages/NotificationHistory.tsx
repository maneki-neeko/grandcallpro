import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollText } from "lucide-react";

export function NotificationHistory() {
  const [searchTerm, setSearchTerm] = useState("");

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
    {
      id: 4,
      title: "Nova mensagem",
      description: "Você recebeu uma nova mensagem de João.",
    },
    {
      id: 5,
      title: "Atualização de sistema",
      description: "O sistema foi atualizado para a versão 2.0.",
    },
    {
      id: 6,
      title: "Novo recurso disponível",
      description: "Um novo recurso foi adicionado ao sistema.",
    },
    {
      id: 7,
      title: "Erro no sistema",
      description: "Ocorreu um erro no sistema. Por favor, verifique.",
    },
    {
      id: 8,
      title: "Novo usuário registrado",
      description: "Um novo usuário se registrou no sistema.",
    },
    {
      id: 9,
      title: "Relatório gerado",
      description: "Um novo relatório foi gerado com sucesso.",
    },
    {
      id: 10,
      title: "Backup concluído",
      description: "O backup do sistema foi concluído com sucesso.",
    },
  ];

  const filteredNotifications = notifications.filter(
    (ext) =>
      ext.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full max-w-5xl">
      <main className="flex-1 flex flex-col justify-start p-8 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="flex gap-3 items-center py-1">
            <h1 className="text-2xl font-bold">Histórico de Notificações</h1>
            <ScrollText className="text-primary h-6 w-6" />
          </div>
        </div>
        <div className="mb-4 w-full">
          <Input
            placeholder="Pesquisar notificações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="space-y-4 mt-4 max-w-2xl">
          {filteredNotifications.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Nenhuma notificação.
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div key={n.id} className="border rounded p-3 bg-muted">
                <div className="font-semibold">{n.title}</div>
                <div className="text-sm text-muted-foreground">
                  {n.description}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
