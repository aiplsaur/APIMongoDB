import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/database';
import { ApiResponse, SavedQuery } from '../types';

export const executeQuery = async (req: Request, res: Response): Promise<void> => {
  const { query, collection } = req.body;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  if (!query) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Query is required'
    });
    return;
  }

  try {
    // Basic query validation
    if (!query.startsWith('db.')) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid query format. Must start with db.'
      });
      return;
    }

    // Execute the query using runCommand
    const result = await db.command({ eval: query });

    const response: ApiResponse<any> = {
      success: true,
      data: {
        results: result
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to execute query'
    });
  }
};

export const saveQuery = async (req: Request, res: Response): Promise<void> => {
  const { name, query, collection } = req.body;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  if (!name || !query) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Name and query are required'
    });
    return;
  }

  try {
    const savedQuery: SavedQuery = {
      id: new ObjectId().toString(),
      name,
      query,
      collection,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('saved_queries').insertOne(savedQuery);

    const response: ApiResponse<{ query: SavedQuery }> = {
      success: true,
      data: {
        query: savedQuery
      }
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to save query'
    });
  }
};

export const getQueries = async (req: Request, res: Response): Promise<void> => {
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
    const queries = await db.collection('saved_queries')
      .find({})
      .project({ id: 1, name: 1, query: 1, collection: 1, createdAt: 1, updatedAt: 1 })
      .toArray() as SavedQuery[];

    const response: ApiResponse<SavedQuery[]> = {
      success: true,
      data: queries
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to get queries'
    });
  }
};

export const deleteQuery = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
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
    const result = await db.collection('saved_queries').deleteOne({ id });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Query not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Query deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to delete query'
    });
  }
}; 