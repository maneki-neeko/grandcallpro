import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Mail, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  login: z
    .string()
    .min(3, 'Campo obrigatório')
    .email('Email inválido')
    .or(z.string().min(3, 'Campo obrigatório')),
});

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
  });

  type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { login } = data;
    try {
      await forgotPassword(login);
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      toast.error('Erro ao enviar solicitação. Tente novamente mais tarde.');
    }
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
    navigate('/login');
  };

  const Icon = watch('login')?.includes('@') ? Mail : User;

  return (
    <div className="w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#1bb5da] to-[#004a80] font-sora">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-[#004a80]">
              Recuperar Senha
            </CardTitle>
            <CardDescription>
              Informe seu email ou nome de usuário para receber instruções de recuperação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Email ou Nome de usuário:</Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login"
                    placeholder="Ex: joao@gmail.com ou joaodasilva"
                    type="text"
                    className={`pl-10 font-sora ${errors.login ? 'border-red-500' : ''}`}
                    {...register('login')}
                  />
                </div>
                {errors.login && (
                  <span className="text-xs text-red-500">{errors.login.message.toString()}</span>
                )}
              </div>
            </form>
          </CardContent>
          <div className="flex flex-col gap-2 p-4">
            <Button
              className="w-full bg-[#1bb5da] hover:bg-[#004a80] text-white font-bold font-sora bg-card-custom"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
            <div className="text-center text-xs mt-1">
              <Link to="/login" className="text-primary hover:underline">
                Voltar ao login
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal de Confirmação */}
      <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-center text-[#004a80]">
              Solicitação Enviada!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Sua solicitação de recuperação de senha foi enviada para análise. Um{' '}
                <strong>administrador irá analisar sua solicitação</strong> e enviará as instruções
                de recuperação de senha após a aprovação.
              </p>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>⏱️ Tempo médio de análise: 24-48 horas</p>
            </div>

            <Button
              onClick={handleConfirmationModalClose}
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

export default ForgotPassword;
