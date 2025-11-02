import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/modules/user/user.model'; 

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'adminpassword';

const seedAdmin = async () => {
  try {
   
    await mongoose.connect(DATABASE_URL);
    console.log('🛢️  Database connected for seeding');

  
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists. Deleting it before re-seeding...');
      await User.deleteOne({ email: ADMIN_EMAIL });
    }

    
    await User.create({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, 
      role: 'admin',
      status: 'active',
    });

    console.log('Admin user seeded successfully!');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    
    await mongoose.disconnect();
    console.log('Database disconnected');
  }
};

seedAdmin();