import { useState } from 'react';
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
import { LockKeyhole, Mail, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  login: z.string().min(1, 'Campo obrigatório'),
  password: z.string().min(1, 'Campo obrigatório'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async data => {
    const { login: loginData, password } = data;
    setIsSubmitting(true);
    try {
      await login({ login: loginData, password });
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch {
      toast.error('Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Icon = watch('login')?.includes('@') ? Mail : User;

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-[#1bb5da] to-[#004a80] font-sora">
      <div className="flex-1 flex justify-center items-center">
        <Card className="border-none shadow-xl w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-[#004a80]">
              Voxline Call Manager
            </CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o sistema</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Email ou Nome de usuário:</Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground border" />
                  <Input
                    id="login"
                    placeholder="Ex: joao@gmail.com ou joaodasilva"
                    type="text"
                    className={`pl-10 font-sora ${errors.login ? 'border-red-500' : ''}`}
                    {...register('login')}
                  />
                </div>
                {errors.login && (
                  <span className="text-xs text-red-500">{errors.login.message}</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Senha:</Label>
                </div>
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
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-[#1bb5da] hover:bg-[#004a80] text-white font-bold font-sora shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
              <div className="text-center text-sm text-muted-foreground mt-2">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Registre-se
                </Link>
              </div>
              <div className="text-center text-xs mt-1">
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
