import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Pencil, Trash, Users as UsersIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Tipo para usuários
const accessLevels = [
  { value: "Telefonista", label: "Telefonista" },
  { value: "Supervisor", label: "Supervisor" },
  { value: "Adm", label: "Administrador" },
];

const departmentOptions = ["Financeiro", "RH", "Comercial", "TI", "Saúde"];

type User = {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  cargo: string;
  senha: string;
  nivel: string;
  status: string;
  lgpdAccepted: boolean;
  lgpdDate: string | null;
  lgpdVersion: string | null;
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  // Mock de dados para usuários
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana.silva@empresa.com",
      departamento: "Financeiro",
      cargo: "Administrador",
      senha: "",
      nivel: "Adm",
      status: "Ativo",
      lgpdAccepted: true,
      lgpdDate: "2025-05-01",
      lgpdVersion: "1.0",
    },
    {
      id: 2,
      nome: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      departamento: "RH",
      cargo: "Supervisor",
      senha: "",
      nivel: "Supervisor",
      status: "Ativo",
      lgpdAccepted: true,
      lgpdDate: "2025-05-02",
      lgpdVersion: "1.0",
    },
    {
      id: 3,
      nome: "Paula Oliveira",
      email: "paula.oliveira@empresa.com",
      departamento: "Vendas",
      cargo: "Telefonista",
      senha: "",
      nivel: "Telefonista",
      status: "Ativo",
      lgpdAccepted: false,
      lgpdDate: null,
      lgpdVersion: null,
    },
    {
      id: 4,
      nome: "João Costa",
      email: "joao.costa@empresa.com",
      departamento: "TI",
      cargo: "Administrador",
      senha: "",
      nivel: "Adm",
      status: "Inativo",
      lgpdAccepted: true,
      lgpdDate: "2025-05-03",
      lgpdVersion: "1.0",
    },
    {
      id: 5,
      nome: "Mariana Souza",
      email: "mariana.souza@empresa.com",
      departamento: "RH",
      cargo: "Supervisor",
      senha: "",
      nivel: "Supervisor",
      status: "Ativo",
      lgpdAccepted: true,
      lgpdDate: "2025-05-04",
      lgpdVersion: "1.0",
    },
  ]);

  // Estado para o formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    departamento: departmentOptions[0],
    cargo: "",
    senha: "",
    nivel: "Telefonista",
  });

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para novo usuário
  const handleAdd = () => {
    setCurrentUser(null);
    setFormData({
      nome: "",
      email: "",
      departamento: departmentOptions[0],
      cargo: "",
      senha: "",
      nivel: "Telefonista",
    });
    setOpenDialog(true);
  };

  // Abrir modal para editar usuário
  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setFormData({
      nome: user.nome,
      email: user.email,
      departamento: user.departamento,
      cargo: user.cargo,
      senha: user.senha,
      nivel: user.nivel,
    });
    setOpenDialog(true);
  };

  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manipular envio do formulário
  const handleSubmit = () => {
    if (currentUser) {
      // Se for editar e a senha foi alterada, precisa confirmar a senha antiga
      if (formData.senha !== currentUser.senha && formData.senha !== "") {
        if (oldPassword !== currentUser.senha) {
          setPasswordError("Senha antiga incorreta.");
          return;
        }
      }
      setUsers((prev) =>
        prev.map((user) =>
          user.id === currentUser.id ? { ...user, ...formData } : user
        )
      );
      setPasswordError("");
      toast({
        title: "Usuário atualizado",
        description: "O usuário foi atualizado com sucesso.",
      });
    } else {
      setUsers((prev) => [
        ...prev,
        {
          ...formData,
          id: prev.length + 1,
          status: "Ativo",
          lgpdAccepted: false,
          lgpdDate: null,
          lgpdVersion: null,
        },
      ]);
      toast({
        title: "Usuário adicionado",
        description: "Novo usuário cadastrado com sucesso.",
      });
    }
    setOpenDialog(false);
    setOldPassword("");
    setPasswordError("");
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start p-8 mx-auto">
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="flex gap-3 py-1 items-center">
            <h1 className="text-2xl font-bold">Usuários</h1>
            <UsersIcon className="text-primary h-6 w-6" />
          </div>
          <Button onClick={handleAdd}>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
        <div className="mb-4 w-full">
          <Input
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Card className="w-full">
          <CardContent className="p-0">
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Aceite</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.departamento}</TableCell>
                    <TableCell>{user.cargo}</TableCell>
                    <TableCell>{user.nivel}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Ativo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.lgpdDate || "-"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => {
                          setUserToDelete(user);
                          setDeleteDialogOpen(true);
                        }}
                      >
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
              <DialogTitle>
                {currentUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
              <DialogDescription>
                {currentUser
                  ? "Atualize as informações do usuário."
                  : "Preencha as informações para registrar um novo usuário."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Ex: Ana Silva"
                  value={formData.nome}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Ex: ana@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departamento" className="text-right">
                  Departamento
                </Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, departamento: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cargo" className="text-right">
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  name="cargo"
                  placeholder="Ex: Telefonista"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="senha" className="text-right">
                  Nova senha
                </Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Defina uma nova senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              {currentUser && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="oldPassword" className="text-right">
                    Senha anterior
                  </Label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    placeholder="Digite a senha antiga para alterar"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )}
              {passwordError && (
                <div className="col-span-4 text-red-500 text-sm text-center">
                  {passwordError}
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nivel" className="text-right">
                  Nível de Acesso
                </Label>
                <Select
                  value={formData.nivel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, nivel: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {accessLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {currentUser ? "Salvar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
            </DialogHeader>
            <p>
              Tem certeza que deseja apagar o usuário{" "}
              <b>{userToDelete?.nome}</b>?
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(userToDelete!.id)}
              >
                Apagar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Users;
