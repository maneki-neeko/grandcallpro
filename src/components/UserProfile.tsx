import { userLevels } from '@/consts/user';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('UserProfile - Iniciando logout');
    logout();
    navigate('/login');
  };

  // Se o usuário não existe, não renderizar nada
  if (!user) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="font-bold">{user.name}</span>
          <span className="text-xs text-muted-foreground">{userLevels[user.level]}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors hover:bg-sidebar-accent rounded-md p-2 mt-2"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </div>
  );
}
