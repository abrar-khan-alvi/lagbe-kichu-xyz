import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: 0, 
  },
  role: {
    type: String,
    enum: ['seller', 'buyer', 'admin'], 
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const User = model<TUser>('User', userSchema);