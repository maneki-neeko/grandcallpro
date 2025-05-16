import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authService from '../services/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lgpdAccepted) {
      toast.error('Você precisa aceitar os termos da LGPD para continuar.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.register(formData);
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
    <div className="w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#1bb5da] to-[#004a80] font-sora">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-[#004a80]">
              Criar Conta
            </CardTitle>
            <CardDescription>Preencha os campos para registrar uma nova conta.</CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent>
              <div className="flex flex-col gap-4">
                <input
                  className="input font-sora p-2 border rounded"
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input font-sora p-2 border rounded"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input font-sora p-2 border rounded"
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="lgpd"
                    checked={lgpdAccepted}
                    onChange={e => setLgpdAccepted(e.target.checked)}
                  />
                  <label htmlFor="lgpd" className="text-sm">
                    Eu aceito os{' '}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setIsModalOpen(true)}
                    >
                      termos da LGPD
                    </button>
                    .
                  </label>
                </div>
              </div>
            </CardContent>
            <div className="flex flex-col gap-2 p-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1bb5da] hover:bg-[#004a80] text-white font-bold font-sora"
              >
                {isSubmitting ? 'Registrando...' : 'Registrar'}
              </Button>
              <div className="text-center text-xs mt-1">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Termos de Uso e Política de Privacidade</DialogTitle>
          </DialogHeader>
          <div className="modal-content">
            <p>
              Este é o termo de aceite conforme exigido pela Lei Geral de Proteção de Dados (LGPD).
              Ao aceitar, você concorda com o uso de seus dados conforme descrito neste documento.
            </p>
            <p>[Insira aqui o texto completo do termo de uso e política de privacidade.]</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
