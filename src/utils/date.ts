// src/utils/formatDate.ts
export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const formatDateWithTime = (dateString: Date): string => {
  return new Date(dateString).toLocaleString('pt-BR');
};
