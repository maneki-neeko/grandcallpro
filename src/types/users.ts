export interface UserModel {
  id: number;
  name: string;
  email: string;
  username: string;
  department: string;
  status: 'active' | 'pending' | 'inactive';
  role: string;
  level: string;
  createdAt: string;
  updatedAt: string;
} 