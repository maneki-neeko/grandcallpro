
// Type for department info
export type DepartmentInfo = {
  departamento: string;
  setor: string;
  subsetor: string;
  colaborador: string;
};

// Type for call data
export interface CallRecord {
  origem: string;
  destino: string;
  data: string;
  desfecho: string;
  duracao: string;
}

// Mock de dados para informações dos ramais
export const extensionInfo: Record<string, DepartmentInfo> = {
  "270": {
    departamento: "Depto. Financeiro",
    setor: "Contabilidade",
    subsetor: "Pagamentos",
    colaborador: "Ana Silva"
  },
  "204": {
    departamento: "Depto. Administrativo",
    setor: "RH",
    subsetor: "Admissão",
    colaborador: "Carlos Santos"
  },
  "222": {
    departamento: "Depto. Comercial",
    setor: "Vendas",
    subsetor: "Negociação",
    colaborador: "Paula Oliveira"
  },
  "311": {
    departamento: "Depto. TI",
    setor: "Suporte",
    subsetor: "Atendimento",
    colaborador: "João Costa"
  },
  "348": {
    departamento: "Depto. Saúde",
    setor: "PSF2",
    subsetor: "Recepção",
    colaborador: "Glenda"
  }
};

// Mock de dados para chamadas
export const callData: CallRecord[] = [
  { origem: "270", destino: "272", data: "15-04-25 10:32:04", desfecho: "ATENDIDA", duracao: "2s" },
  { origem: "204", destino: "400", data: "15-04-25 10:32:01", desfecho: "NÃO ATENDIDA", duracao: "0s" },
  { origem: "222", destino: "225", data: "15-04-25 10:31:04", desfecho: "ATENDIDA", duracao: "23s" },
  { origem: "18996060550", destino: "302", data: "15-04-25 10:30:18", desfecho: "ATENDIDA", duracao: "54s" },
  { origem: "311", destino: "997994623", data: "15-04-25 10:30:01", desfecho: "ATENDIDA", duracao: "1s" },
  { origem: "18996060550", destino: "9338", data: "15-04-25 10:29:59", desfecho: "NÃO ATENDIDA", duracao: "0s" },
  { origem: "311", destino: "996365013", data: "15-04-25 10:29:41", desfecho: "NÃO ATENDIDA", duracao: "0s" },
  { origem: "348", destino: "210", data: "15-04-25 10:29:18", desfecho: "ATENDIDA", duracao: "48s" },
  { origem: "210", destino: "348", data: "15-04-25 10:29:11", desfecho: "ATENDIDA", duracao: "39s" },
  { origem: "18996666390", destino: "348", data: "15-04-25 10:29:11", desfecho: "ATENDIDA", duracao: "2m 53s" },
];
