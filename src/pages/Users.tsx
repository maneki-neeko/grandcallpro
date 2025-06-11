import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Pencil, Trash, Users as UsersIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { usersService } from '@/services';
import { UserModel } from '@/types';

// Tipo para os níveis de usuário
type UserLevel = 'admin' | 'supervisor' | 'user';

// Definindo opções de nível de acesso baseado no enum UserLevel do backend
const accessLevels: { value: UserLevel; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'user', label: 'Usuário' },
];

const departmentOptions = ['Financeiro', 'RH', 'Comercial', 'TI', 'Saúde'];

// Tipo estendido para o formulário com a senha
type UserWithPassword = UserModel & {
  password?: string;
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  // Estado para armazenar os usuários
  const [users, setUsers] = useState<UserModel[]>([]);

  // Estado para o formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    department: departmentOptions[0],
    role: '',
    password: '',
    level: 'user',
  });

  // Buscar usuários ao carregar a página
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersService.getAllUsers();
        setUsers(data);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os usuários.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para novo usuário
  const handleAdd = () => {
    setCurrentUser(null);
    setFormData({
      name: '',
      email: '',
      username: '',
      department: departmentOptions[0],
      role: '',
      password: '',
      level: 'user',
    });
    setOpenDialog(true);
  };

  // Abrir modal para editar usuário
  const handleEdit = (user: UserModel) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
      department: user.department,
      role: user.role,
      password: '',
      level: user.level,
    });
    setOpenDialog(true);
  };

  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipular envio do formulário
  const handleSubmit = async () => {
    // Validação básica dos campos obrigatórios
    if (!formData.name.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'O nome do usuário é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'O email do usuário é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.username.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'O username do usuário é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.role.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'A função do usuário é obrigatória.',
        variant: 'destructive',
      });
      return;
    }

    if (!currentUser && !formData.password.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'A senha é obrigatória para novos usuários.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      
      if (currentUser) {
        // Preparar dados para atualização
        const updateData = {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          department: formData.department,
          role: formData.role
        };
        
        // Adicionar o level apenas se for um valor válido
        if (formData.level === 'admin' || formData.level === 'supervisor' || formData.level === 'user') {
          (updateData as any).level = formData.level;
        }
        
        // Se a senha foi alterada e não está vazia, incluí-la na atualização
        if (formData.password.trim()) {
          // Nota: O backend provavelmente não permite atualização de senha via este endpoint
          // Este código seria apenas para caso a API suporte isso
          toast({
            title: 'Aviso',
            description: 'A alteração de senha não é suportada nesta operação.',
            variant: 'default',
          });
        }
        
        // Atualizar o usuário
        const updatedUser = await usersService.updateUser(currentUser.id, updateData);
        
        // Atualizar a lista local de usuários
        setUsers(prev => 
          prev.map(user => (user.id === currentUser.id ? updatedUser : user))
        );
        
        toast({
          title: 'Usuário atualizado',
          description: 'O usuário foi atualizado com sucesso.',
        });
      } else {
        // Criação de novo usuário
        const userData = {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          department: formData.department,
          password: formData.password,
          role: formData.role,
          level: formData.level === 'admin' || formData.level === 'supervisor' || formData.level === 'user' 
            ? formData.level 
            : 'user'
        } as const;
        
        const newUser = await usersService.createUser(userData);
        
        // Adicionar o novo usuário à lista
        setUsers(prev => [...prev, newUser]);
        
        toast({
          title: 'Usuário adicionado',
          description: 'Novo usuário cadastrado com sucesso.',
        });
      }
      
      setOpenDialog(false);
      setOldPassword('');
      setPasswordError('');
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      
      // Verificar se é um erro de conflito (usuário já existente)
      if (error.status === 409) {
        // Verificar qual o tipo de conflito baseado na mensagem do backend
        let errorMessage = 'Este usuário já está cadastrado no sistema.';
        
        if (error.message) {
          if (error.message.includes('email')) {
            errorMessage = 'Este email já está cadastrado no sistema.';
          } else if (error.message.includes('username')) {
            errorMessage = 'Este nome de usuário já está cadastrado no sistema.';
          }
        }
        
        toast({
          title: 'Erro de Cadastro',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível salvar o usuário. Tente novamente.',
          variant: 'destructive',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeleting(true);
      await usersService.deleteUser(id);
      
      // Remover o usuário da lista local
      setUsers(prev => prev.filter(user => user.id !== id));
      
      // Fechar o diálogo e limpar o estado
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      
      toast({
        title: 'Usuário removido',
        description: 'O usuário foi removido com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o usuário. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="flex w-full max-w-5xl">
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start p-8">
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
            onChange={e => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Card className="w-full">
          <CardContent className="p-0">
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      Carregando usuários...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.level}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                              : user.status === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                          }`}
                        >
                          {user.status === 'active'
                            ? 'Ativo'
                            : user.status === 'pending'
                            ? 'Pendente'
                            : 'Inativo'}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
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
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
              <DialogDescription>
                {currentUser
                  ? 'Atualize as informações do usuário.'
                  : 'Preencha as informações para registrar um novo usuário.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Ana Silva"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Ex: anasilva"
                  value={formData.username}
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
                <Label htmlFor="department" className="text-right">
                  Departamento
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={value => setFormData(prev => ({ ...prev, department: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map(opt => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Função
                </Label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Ex: Telefonista"
                  value={formData.role}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  {currentUser ? 'Nova senha' : 'Senha'}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={currentUser ? "Defina uma nova senha" : "Defina uma senha"}
                  value={formData.password}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              {currentUser && formData.password && (
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
                    onChange={e => setOldPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )}
              {passwordError && (
                <div className="col-span-4 text-red-500 text-sm text-center">{passwordError}</div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Nível de Acesso
                </Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="user">Usuário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpenDialog(false)}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Salvando...' : currentUser ? 'Salvar' : 'Adicionar'}
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
              Tem certeza que deseja apagar o usuário <b>{userToDelete?.name}</b>?
            </p>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deleting}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => userToDelete && handleDelete(userToDelete.id)}
                disabled={deleting}
              >
                {deleting ? 'Removendo...' : 'Apagar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Users;
