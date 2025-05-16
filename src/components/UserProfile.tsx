import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="font-bold">{user?.name || 'Usuário'}</span>
          <span className="text-xs text-muted-foreground">{user?.role || 'Cargo'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors hover:bg-gray-100 rounded-md p-2"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </div>
  );
}
