import { ObjectId } from 'mongodb';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

export interface ConnectionStatus {
  isConnected: boolean;
  database?: string;
}

export interface CollectionInfo {
  name: string;
  count: number;
  size: number;
}

export interface DocumentQuery {
  page?: number;
  limit?: number;
  sort?: {
    field: string;
    order: 1 | -1;
  };
  filter?: Record<string, any>;
}

export interface DocumentResponse {
  documents: any[];
  total: number;
}

export interface SavedQuery {
  id: string;
  name: string;
  query: string;
  collection?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MongoClient {
  db: any;
  close: () => Promise<void>;
} 