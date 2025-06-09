import React from 'react';
import { useContextApp } from '@/contexts';

interface CallStatusBadgeProps {
  status: string;
}

const CallStatusBadge: React.FC<CallStatusBadgeProps> = ({ status }) => {
  const { theme } = useContextApp();
  const isDark = theme === 'dark';

  // Determinar o estilo com base no status
  const getStatusStyle = () => {
    switch (status.toUpperCase()) {
      case 'ATENDIDA':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800';
      case 'NÃO ATENDIDA':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700';
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusStyle()}`}
    >
      {status}
    </span>
  );
};

export default CallStatusBadge;
