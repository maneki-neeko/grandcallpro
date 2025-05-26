import React from "react";

interface CallStatusBadgeProps {
  status: string;
}

const CallStatusBadge: React.FC<CallStatusBadgeProps> = ({ status }) => {
  // Determinar o estilo com base no status
  const getStatusStyle = () => {
    switch (status.toUpperCase()) {
      case "ATENDIDA":
        return "bg-green-100 text-green-800 border-green-200";
      case "NÃO ATENDIDA":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
