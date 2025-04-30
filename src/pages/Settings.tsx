import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
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
import {
  BarChart3,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Configurações salvas",
        description: "Suas alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        <div className="w-full max-w-5xl">
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="integration">
                Integração Grandstream
              </TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>
                    Configure as preferências gerais do sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Nome da Empresa</Label>
                    <Input id="company" defaultValue="GrandCallPro" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <select
                      id="timezone"
                      className="w-full p-2 border rounded-md"
                      defaultValue="America/Sao_Paulo"
                    >
                      <option value="America/Sao_Paulo">
                        América/São Paulo
                      </option>
                      <option value="America/Recife">América/Recife</option>
                      <option value="America/Bahia">América/Bahia</option>
                      <option value="America/Manaus">América/Manaus</option>
                      <option value="America/Rio_Branco">
                        América/Rio Branco
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Formato de Data</Label>
                    <select
                      id="date-format"
                      className="w-full p-2 border rounded-md"
                      defaultValue="DD-MM-YY HH:mm:ss"
                    >
                      <option value="DD-MM-YY HH:mm:ss">
                        DD-MM-YY HH:mm:ss
                      </option>
                      <option value="DD/MM/YYYY HH:mm:ss">
                        DD/MM/YYYY HH:mm:ss
                      </option>
                      <option value="YYYY-MM-DD HH:mm:ss">
                        YYYY-MM-DD HH:mm:ss
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-refresh" defaultChecked />
                    <Label htmlFor="auto-refresh">Atualização automática</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">
                      Intervalo de Atualização (segundos)
                    </Label>
                    <Input
                      id="refresh-interval"
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="integration">
              <Card>
                <CardHeader>
                  <CardTitle>Integração Grandstream</CardTitle>
                  <CardDescription>
                    Configure as conexões com a central telefônica Grandstream.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ucm-address">Endereço UCM</Label>
                    <Input id="ucm-address" defaultValue="192.168.1.100" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ucm-port">Porta</Label>
                    <Input id="ucm-port" defaultValue="8443" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ucm-username">Usuário</Label>
                    <Input id="ucm-username" defaultValue="admin" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ucm-password">Senha</Label>
                    <Input
                      id="ucm-password"
                      type="password"
                      defaultValue="password"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="ucm-tls" defaultChecked />
                    <Label htmlFor="ucm-tls">Usar TLS</Label>
                  </div>

                  <div className="pt-4">
                    <Button variant="secondary" className="mr-2">
                      Testar Conexão
                    </Button>
                    <Button variant="secondary">Sincronizar Ramais</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Backup</CardTitle>
                  <CardDescription>
                    Configure as políticas de backup do sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-backup" defaultChecked />
                    <Label htmlFor="auto-backup">Backup Automático</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">
                      Frequência de Backup
                    </Label>
                    <select
                      id="backup-frequency"
                      className="w-full p-2 border rounded-md"
                      defaultValue="daily"
                    >
                      <option value="hourly">A cada hora</option>
                      <option value="daily">Diário</option>
                      <option value="weekly">Semanal</option>
                      <option value="monthly">Mensal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-time">Horário do Backup</Label>
                    <Input id="backup-time" type="time" defaultValue="02:00" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">
                      Retenção de Backups (dias)
                    </Label>
                    <Input
                      id="backup-retention"
                      type="number"
                      defaultValue="30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-location">
                      Localização de Backup
                    </Label>
                    <Input id="backup-location" defaultValue="/backups" />
                  </div>

                  <div className="pt-4">
                    <Button variant="secondary">Iniciar Backup Manual</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
