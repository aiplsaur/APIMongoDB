import { Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { ApiResponse, CollectionInfo } from '../types';

export const getCollections = async (req: Request, res: Response): Promise<void> => {
  const db = getDatabase();
  
  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Database not connected'
    });
    return;
  }

  try {
    const collections = await db.listCollections().toArray();
    const collectionsInfo = await Promise.all(
      collections.map(async (collection) => {
        const stats = await db.command({ collStats: collection.name });
        return {
          name: collection.name,
          count: stats.count,
          size: stats.size,
          avgDocumentSize: stats.avgObjSize,
          storageSize: stats.storageSize,
          indexes: stats.nindexes,
          indexDetails: stats.indexSizes
        };
      })
    );

    res.json({
      success: true,
      data: collectionsInfo
    });
  } catch (error) {
    console.error('Error getting collections:', error);
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createCollection = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  if (!name) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Collection name is required'
    });
    return;
  }

  try {
    await db.createCollection(name);
    res.json({
      success: true,
      message: `Collection ${name} created successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to create collection'
    });
  }
};

export const renameCollection = async (req: Request, res: Response): Promise<void> => {
  const { oldName, newName } = req.params;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  try {
    await db.collection(oldName).rename(newName);
    res.json({
      success: true,
      message: `Collection renamed from ${oldName} to ${newName}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to rename collection'
    });
  }
};

export const dropCollection = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  try {
    await db.collection(name).drop();
    res.json({
      success: true,
      message: `Collection ${name} dropped successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to drop collection'
    });
  }
}; 