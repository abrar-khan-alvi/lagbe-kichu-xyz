// src/server.ts
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL as string;

async function main() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('🛢️  Database is connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
}

main();