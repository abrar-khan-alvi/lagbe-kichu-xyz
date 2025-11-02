export type TUser = {
  email: string;
  password: string;
  role: 'seller' | 'buyer' | 'admin';
  status: 'active' | 'suspended';
};