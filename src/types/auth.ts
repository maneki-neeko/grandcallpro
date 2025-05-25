export interface User {
  id: string;
  name: string;
  email: string;
  level: string;
}

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  department: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export type UserLevel = 'admin' | 'user' | 'supervisor';
