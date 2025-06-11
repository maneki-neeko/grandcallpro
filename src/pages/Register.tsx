import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import {
  User,
  Mail,
  LockKeyhole,
  UserCheck,
  Clock,
  CheckCircle,
  Clock2,
  IdCard,
  IdCardLanyard,
} from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterData } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
    username: z
      .string()
      .min(1, 'Nome de usuário é obrigatório')
      .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
      .regex(/^[a-zA-Z0-9_]+$/, 'Nome de usuário pode conter apenas letras, números e underscore')
      .regex(/.*[a-zA-Z].*/, 'Nome de usuário deve conter pelo menos 1 letra'),
    email: z.string().min(1, 'Email é obrigatório').email('Formato de email inválido'),
    department: z.string().min(1, 'Departamento é obrigatório'),
    role: z.string().min(1, 'Cargo é obrigatório'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { register: authRegister } = useAuth();
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [isLgpdModalOpen, setIsLgpdModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const isEqualPasswords = watch('password') === watch('confirmPassword');

  const onSubmit: SubmitHandler<RegisterFormData> = async data => {
    try {
      const { name, username, email, password } = data;
      const department = 'Desenvolvimento';
      const role = 'Telefonista';
      const registerData: RegisterData = { name, username, email, password, department, role };
      await authRegister(registerData);
      toast.success('Dados enviados com sucesso!');
      setIsApprovalModalOpen(true);
    } catch (error) {
      toast.error(`Erro ao registrar: ${error.response.data.message}`);
    }
  };

  const handleApprovalModalClose = () => {
    setIsApprovalModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-[#1bb5da] to-[#004a80] font-sora">
      <div className="flex-1 flex justify-center items-center">
        <Card className="border-none shadow-xl w-full max-w-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-[#004a80]">
              Criar Conta
            </CardTitle>
            <CardDescription>Preencha os campos para registrar uma nova conta</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo:</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Ex: João da Silva"
                    type="text"
                    className={`pl-10 font-sora ${errors.name ? 'border-red-500' : ''}`}
                    {...register('name')}
                  />
                </div>
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário:</Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Ex: joaodasilva"
                    type="text"
                    className={`pl-10 font-sora ${errors.username ? 'border-red-500' : ''}`}
                    {...register('username')}
                  />
                </div>
                {errors.username && (
                  <span className="text-xs text-red-500">{errors.username.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email:</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="Ex: joao@gmail.com"
                    type="email"
                    className={`pl-10 font-sora ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {/* Icone */}
                  <Label htmlFor="department">Departamento:</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="department"
                      type="text"
                      placeholder="Ex: Desenvolvimento"
                      className={`pl-10 font-sora ${errors.department ? 'border-red-500' : ''}`}
                      {...register('department')}
                    />
                  </div>
                  {errors.department && (
                    <span className="text-xs text-red-500">{errors.department.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo:</Label>
                  <div className="relative">
                    <IdCardLanyard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="role"
                      type="text"
                      placeholder="Ex: Telefonista"
                      className={`pl-10 font-sora ${errors.role ? 'border-red-500' : ''}`}
                      {...register('role')}
                    />
                  </div>
                  {errors.role && (
                    <span className="text-xs text-red-500">{errors.role.message}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha:</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    className={`pl-10 font-sora ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500">{errors.password.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha:</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    className={`pl-10 font-sora ${!isEqualPasswords ? 'border-red-500' : ''}`}
                    {...register('confirmPassword')}
                  />
                </div>
                {!isEqualPasswords && (
                  <span className="text-xs text-red-500">As senhas não são iguais</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="lgpd"
                  checked={lgpdAccepted}
                  onCheckedChange={checked => setLgpdAccepted(checked === true)}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="lgpd"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Eu aceito os{' '}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => setIsLgpdModalOpen(true)}
                  >
                    termos da LGPD
                  </button>
                  .
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-[#1bb5da] hover:bg-[#004a80] text-white font-bold font-sora shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !isValid || !lgpdAccepted}
              >
                {isSubmitting ? 'Enviando...' : 'Registrar'}
              </Button>
              <div className="text-center text-sm text-muted-foreground mt-2">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Modal LGPD */}
      <Dialog open={isLgpdModalOpen} onOpenChange={setIsLgpdModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#004a80]">
              Termos de Uso e Política de Privacidade - LGPD
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="font-semibold">
              Este documento estabelece os termos de uso e política de privacidade conforme exigido
              pela Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </p>

            <div>
              <h3 className="font-semibold mb-2">1. Coleta e Uso de Dados</h3>
              <p>
                Coletamos apenas os dados necessários para o funcionamento do sistema, incluindo
                nome, email, nome de usuário e senha criptografada. Estes dados são utilizados
                exclusivamente para autenticação e personalização da experiência do usuário.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Compartilhamento de Dados</h3>
              <p>
                Seus dados pessoais não são compartilhados com terceiros, exceto quando exigido por
                lei ou para garantir a segurança do sistema.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Seus Direitos</h3>
              <p>
                Você tem direito a acessar, corrigir, excluir ou solicitar a portabilidade de seus
                dados pessoais a qualquer momento, conforme previsto na LGPD.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Segurança</h3>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </div>

            <p className="font-semibold text-[#004a80]">
              Ao aceitar estes termos, você concorda com o tratamento de seus dados conforme
              descrito neste documento.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Aprovação */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-center text-[#004a80]">
              Registro Enviado com Sucesso!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Dados recebidos</span>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-700 leading-relaxed">
                Seu registro foi enviado e será <strong>analisado por um administrador</strong>.
                Você receberá uma confirmação do administrador assim que sua conta for aprovada.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Clock2 className="" size={16} />
              <p>Tempo médio de aprovação: 24-48 horas</p>
            </div>

            <Button
              onClick={handleApprovalModalClose}
              className="w-full bg-[#1bb5da] hover:bg-[#004a80] text-white font-semibold"
            >
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
