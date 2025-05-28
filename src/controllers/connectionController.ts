import { Request, Response } from 'express';
import { connectToDatabase, isConnected, getDatabase } from '../config/database';
import { ApiResponse, ConnectionStatus } from '../types';

export const connect = async (req: Request, res: Response): Promise<void> => {
  const { connectionString } = req.body;

  if (!connectionString) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Connection string is required'
    });
    return;
  }

  const result = await connectToDatabase(connectionString);
  res.json(result);
};

export const getStatus = async (req: Request, res: Response): Promise<void> => {
  const connected = isConnected();
  const db = getDatabase();
  
  const status: ConnectionStatus = {
    isConnected: connected,
    database: connected ? db?.databaseName : undefined
  };

  const response: ApiResponse<ConnectionStatus> = {
    success: true,
    data: status
  };

  res.json(response);
}; 