// src/modules/user/user.interface.ts
export type TUser = {
  email: string;
  password: string;
  role: 'seller' | 'buyer' | 'admin';
  status: 'active' | 'suspended';
};