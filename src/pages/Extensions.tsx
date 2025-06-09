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
import { Pencil, Trash, Plus, PhoneIncoming } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import extensionsService from '@/services/extensions';
import { Extension } from '@/types';

const departmentOptions = ['Financeiro', 'RH', 'Comercial', 'TI', 'Saúde'];

const Extensions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentExtension, setCurrentExtension] = useState<Extension | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [extensionToDelete, setExtensionToDelete] = useState<Extension | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Estado para extensões
  const [extensions, setExtensions] = useState<Extension[]>([]);

  // Estado para o formulário
  const [formData, setFormData] = useState({
    number: 0,
    department: departmentOptions[0],
    sector: '',
    employee: '',
  });

  // Buscar ramais ao carregar a página
  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        setLoading(true);
        const data = await extensionsService.getAllExtensions();
        setExtensions(data);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os ramais.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExtensions();
  }, [toast]);

  // Filtrar extensões com base no termo de pesquisa
  const filteredExtensions = extensions.filter(
    ext =>
      ext.number.toString().includes(searchTerm) ||
      ext.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manipular abertura do diálogo para edição
  const handleEdit = (extension: Extension) => {
    setCurrentExtension(extension);
    setFormData({
      number: extension.number,
      department: extension.department,
      sector: extension.sector,
      employee: extension.employee,
    });
    setOpenDialog(true);
  };

  // Manipular abertura do diálogo para novo ramal
  const handleAdd = () => {
    setCurrentExtension(null);
    setFormData({
      number: 0,
      department: departmentOptions[0],
      sector: '',
      employee: '',
    });
    setOpenDialog(true);
  };

  // Manipular exclusão de ramal
  const handleDelete = (id: number) => {
    setExtensions(extensions.filter(ext => ext.id !== id));
    setDeleteDialogOpen(false);
    setExtensionToDelete(null);
    toast({
      title: 'Ramal removido',
      description: 'O ramal foi removido com sucesso.',
    });
  };

  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'number' ? parseInt(value) || 0 : value 
    }));
  };

  // Manipular envio do formulário
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (currentExtension) {
        // Edição
        const updatedExtension = await extensionsService.updateExtension({
          ...formData,
          id: currentExtension.id
        });
        
        setExtensions(prev =>
          prev.map(ext => (ext.id === currentExtension.id ? updatedExtension : ext))
        );
        
        toast({
          title: 'Ramal atualizado',
          description: 'O ramal foi atualizado com sucesso.',
        });
      } else {
        // Novo ramal
        const newExtension = await extensionsService.createExtension(formData);
        setExtensions(prev => [...prev, newExtension]);
        toast({
          title: 'Ramal adicionado',
          description: 'Novo ramal cadastrado com sucesso.',
        });
      }
      setOpenDialog(false);
    } catch (error: any) {
      console.error('Erro ao salvar ramal:', error);
      
      // Verificar se é um erro de conflito (ramal já existente)
      if (error.status === 409) {
        toast({
          title: 'Erro',
          description: 'Este número de ramal já está cadastrado no sistema.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível salvar o ramal. Tente novamente.',
          variant: 'destructive',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full max-w-5xl">
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start p-8 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">Ramais</h1>
            <PhoneIncoming className="text-primary h-5 w-5" />
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Ramal
          </Button>
        </div>
        <div className="mb-4 w-full">
          <Input
            placeholder="Pesquisar ramais..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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
                  <TableHead>Colaborador</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Carregando ramais...
                    </TableCell>
                  </TableRow>
                ) : filteredExtensions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhum ramal encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExtensions.map(extension => (
                    <TableRow key={extension.id}>
                      <TableCell className="font-medium">{extension.number}</TableCell>
                      <TableCell>{extension.department}</TableCell>
                      <TableCell>{extension.sector}</TableCell>
                      <TableCell>{extension.employee}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(extension)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          onClick={() => {
                            setExtensionToDelete(extension);
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
              <DialogTitle>{currentExtension ? 'Editar Ramal' : 'Novo Ramal'}</DialogTitle>
              <DialogDescription>
                {currentExtension
                  ? 'Atualize as informações do ramal existente.'
                  : 'Preencha as informações para registrar um novo ramal.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Número
                </Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  placeholder="Ex: 270"
                  value={formData.number}
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
                <Label htmlFor="sector" className="text-right">
                  Setor
                </Label>
                <Input
                  id="sector"
                  name="sector"
                  placeholder="Ex: Contabilidade"
                  value={formData.sector}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employee" className="text-right">
                  Colaborador
                </Label>
                <Input
                  id="employee"
                  name="employee"
                  placeholder="Ex: Ana Silva"
                  value={formData.employee}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)} disabled={submitting}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting 
                  ? 'Salvando...' 
                  : currentExtension 
                    ? 'Salvar' 
                    : 'Adicionar'
                }
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
              Tem certeza que deseja apagar o ramal <b>{extensionToDelete?.number}</b>?
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(extensionToDelete!.id)}>
                Apagar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Extensions;
