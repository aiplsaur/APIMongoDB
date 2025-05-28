import { MongoClient, Db } from 'mongodb';
import { MongoClient as MongoClientType } from '../types';

let client: MongoClientType | null = null;
let db: Db | null = null;

export const connectToDatabase = async (connectionString: string): Promise<{ success: boolean; message: string }> => {
  try {
    if (client) {
      await client.close();
    }

    client = await MongoClient.connect(connectionString);
    db = client.db();
    
    return {
      success: true,
      message: 'Successfully connected to MongoDB'
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to connect to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

export const getDatabase = (): Db | null => {
  return db;
};

export const closeConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

export const isConnected = (): boolean => {
  return client !== null && db !== null;
}; 