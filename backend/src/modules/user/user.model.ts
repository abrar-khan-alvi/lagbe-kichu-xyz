// src/modules/user/user.model.ts
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
    select: 0, // This will hide the password by default on queries
  },
  role: {
    type: String,
    enum: ['seller', 'buyer', 'admin'], // Ensure 'admin' is here
    required: true,
  },
  status: { // This is the single, correct status field
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
}, { timestamps: true });

// Mongoose pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const User = model<TUser>('User', userSchema);