import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#1bb5da] to-[#004a80] font-sora">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-[#004a80]">Criar Conta</CardTitle>
            <CardDescription>
              Preencha os campos para registrar uma nova conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <input className="input font-sora p-2 border rounded" type="text" placeholder="Nome" />
              <input className="input font-sora p-2 border rounded" type="email" placeholder="Email" />
              <input className="input font-sora p-2 border rounded" type="password" placeholder="Senha" />
            </div>
          </CardContent>
          <div className="flex flex-col gap-2 p-4">
            <Button className="w-full bg-[#1bb5da] hover:bg-[#004a80] text-white font-bold font-sora">Registrar</Button>
            <div className="text-center text-xs mt-1">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline">Entrar</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
