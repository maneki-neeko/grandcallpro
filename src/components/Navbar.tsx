import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Chamadas', path: '/calls' },
  { label: 'Usuários', path: '/users' },
  { label: 'Ramais', path: '/extensions' },
  { label: 'Configurações', path: '/settings' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex gap-2 p-4 bg-[#1bb5da] shadow-lg mb-4">
      {navItems.map((item) => (
        <Button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="font-sora bg-[#004a80] hover:bg-[#1bb5da] text-white font-semibold"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

export default Navbar;
