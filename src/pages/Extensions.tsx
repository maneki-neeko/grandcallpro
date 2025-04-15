import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, Phone, PhoneCall, PhoneIncoming, Settings, Users } from "lucide-react";

// Tipo para extensões (ramais)
type Extension = {
  id: number;
  numero: string;
  departamento: string;
  setor: string;
  subsetor: string;
  colaborador: string;
};

const Extensions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentExtension, setCurrentExtension] = useState<Extension | null>(null);
  
  // Mock de dados para extensões
  const [extensions, setExtensions] = useState<Extension[]>([
    {
      id: 1,
      numero: "270",
      departamento: "Depto. Financeiro",
      setor: "Contabilidade",
      subsetor: "Pagamentos",
      colaborador: "Ana Silva"
    },
    {
      id: 2,
      numero: "204",
      departamento: "Depto. Administrativo",
      setor: "RH",
      subsetor: "Admissão",
      colaborador: "Carlos Santos"
    },
    {
      id: 3,
      numero: "222",
      departamento: "Depto. Comercial",
      setor: "Vendas",
      subsetor: "Negociação",
      colaborador: "Paula Oliveira"
    },
    {
      id: 4,
      numero: "311",
      departamento: "Depto. TI",
      setor: "Suporte",
      subsetor: "Atendimento",
      colaborador: "João Costa"
    },
    {
      id: 5,
      numero: "348",
      departamento: "Depto. Saúde",
      setor: "PSF2",
      subsetor: "Recepção",
      colaborador: "Glenda"
    },
  ]);
  
  // Estado para o formulário
  const [formData, setFormData] = useState({
    numero: "",
    departamento: "",
    setor: "",
    subsetor: "",
    colaborador: ""
  });

  // Filtrar extensões com base no termo de pesquisa
  const filteredExtensions = extensions.filter(ext => 
    ext.numero.includes(searchTerm) || 
    ext.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ext.setor.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ext.colaborador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manipular abertura do diálogo para edição
  const handleEdit = (extension: Extension) => {
    setCurrentExtension(extension);
    setFormData({
      numero: extension.numero,
      departamento: extension.departamento,
      setor: extension.setor,
      subsetor: extension.subsetor,
      colaborador: extension.colaborador
    });
    setOpenDialog(true);
  };

  // Manipular abertura do diálogo para novo ramal
  const handleAdd = () => {
    setCurrentExtension(null);
    setFormData({
      numero: "",
      departamento: "",
      setor: "",
      subsetor: "",
      colaborador: ""
    });
    setOpenDialog(true);
  };

  // Manipular exclusão de ramal
  const handleDelete = (id: number) => {
    setExtensions(extensions.filter(ext => ext.id !== id));
    toast({
      title: "Ramal removido",
      description: "O ramal foi removido com sucesso.",
    });
  };

  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipular envio do formulário
  const handleSubmit = () => {
    if (currentExtension) {
      // Edição
      setExtensions(prev => prev.map(ext => ext.id === currentExtension.id ? { ...ext, ...formData } : ext));
      toast({
        title: "Ramal atualizado",
        description: "O ramal foi atualizado com sucesso.",
      });
    } else {
      // Novo
      setExtensions(prev => [
        ...prev,
        { ...formData, id: prev.length + 1 }
      ]);
      toast({
        title: "Ramal adicionado",
        description: "Novo ramal cadastrado com sucesso.",
      });
    }
    setOpenDialog(false);
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
        <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-bold">Ramais</h1>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Ramal
          </Button>
        </div>
        <div className="mb-4 w-full">
          <Input
            placeholder="Pesquisar ramais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Card className="w-full">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Subsetor</TableHead>
                  <TableHead>Colaborador</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExtensions.map((extension) => (
                  <TableRow key={extension.id}>
                    <TableCell className="font-medium">{extension.numero}</TableCell>
                    <TableCell>{extension.departamento}</TableCell>
                    <TableCell>{extension.setor}</TableCell>
                    <TableCell>{extension.subsetor}</TableCell>
                    <TableCell>{extension.colaborador}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(extension)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDelete(extension.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentExtension ? "Editar Ramal" : "Novo Ramal"}</DialogTitle>
              <DialogDescription>
                {currentExtension 
                  ? "Atualize as informações do ramal existente."
                  : "Preencha as informações para registrar um novo ramal."}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="numero" className="text-right">Número</Label>
                <Input
                  id="numero"
                  name="numero"
                  placeholder="Ex: 270"
                  value={formData.numero}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departamento" className="text-right">Departamento</Label>
                <Input
                  id="departamento"
                  name="departamento"
                  placeholder="Ex: Depto. Financeiro"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="setor" className="text-right">Setor</Label>
                <Input
                  id="setor"
                  name="setor"
                  placeholder="Ex: Contabilidade"
                  value={formData.setor}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subsetor" className="text-right">Subsetor</Label>
                <Input
                  id="subsetor"
                  name="subsetor"
                  placeholder="Ex: Pagamentos"
                  value={formData.subsetor}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="colaborador" className="text-right">Colaborador</Label>
                <Input
                  id="colaborador"
                  name="colaborador"
                  placeholder="Ex: Ana Silva"
                  value={formData.colaborador}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpenDialog(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {currentExtension ? "Salvar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Extensions;
