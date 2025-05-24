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
import { User, Mail, LockKeyhole, UserCheck } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import authService from '../services/auth';
import { RegisterData } from '@/types';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const isEqualPasswords = watch('password') === watch('confirmPassword');

  const onSubmit: SubmitHandler<RegisterFormData> = async data => {
    setIsSubmitting(true);
    try {
      const { name, username, email, password } = data;
      const registerData: RegisterData = { name, username, email, password };
      await authService.register(registerData);
      toast.success('Conta criada com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro no registro:', error);
      toast.error('Falha ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-[#1bb5da] to-[#004a80] font-sora">
      <div className="flex-1 flex justify-center items-center">
        <Card className="border-none shadow-xl w-full max-w-md">
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
                <input
                  type="checkbox"
                  id="lgpd"
                  checked={lgpdAccepted}
                  onChange={e => setLgpdAccepted(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="lgpd" className="text-sm text-muted-foreground">
                  Eu aceito os{' '}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => setIsModalOpen(true)}
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
                {isSubmitting ? 'Registrando...' : 'Registrar'}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
    </div>
  );
};

export default Register;
