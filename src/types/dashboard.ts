export interface Dashboard {
  cards: Card[];
  calls: Call[];
}

export interface Call {
  origin: Origin;
  destiny: Destiny;
  status: Status;
  timestamp: Date;
  duration: string;
}

export interface Destiny {
  value: string;
}

export interface Origin {
  value: string;
  options: Options;
}

export interface Options {
  department: string;
  sector: string;
  employee: string;
}

export interface Status {
  value: 'ATENDIDA' | 'NAO ATENDIDA';
  answered: boolean;
}

export interface Card {
  title: string;
  content: string;
  percentualDifference: string;
}
