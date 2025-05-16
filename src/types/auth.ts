export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  level: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
