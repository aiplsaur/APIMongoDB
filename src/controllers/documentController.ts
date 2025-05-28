import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/database';
import { ApiResponse, DocumentQuery, DocumentResponse } from '../types';

export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  const { collection } = req.params;
  const { page = 1, limit = 20, sort, filter } = req.query as DocumentQuery;
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
    const skip = (page - 1) * limit;
    let query = db.collection(collection).find(filter || {});

    if (sort) {
      query = query.sort({ [sort.field]: sort.order });
    }

    const [documents, total] = await Promise.all([
      query.skip(skip).limit(limit).toArray(),
      db.collection(collection).countDocuments(filter || {})
    ]);

    const response: ApiResponse<DocumentResponse> = {
      success: true,
      data: {
        documents,
        total
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to get documents'
    });
  }
};

export const getDocument = async (req: Request, res: Response): Promise<void> => {
  const { collection, id } = req.params;
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
    const document = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    
    if (!document) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Document not found'
      });
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: { document }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to get document'
    });
  }
};

export const createDocument = async (req: Request, res: Response): Promise<void> => {
  const { collection } = req.params;
  const { document } = req.body;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  if (!document) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Document is required'
    });
    return;
  }

  try {
    const result = await db.collection(collection).insertOne(document);
    const response: ApiResponse = {
      success: true,
      data: {
        document: { ...document, _id: result.insertedId }
      }
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to create document'
    });
  }
};

export const updateDocument = async (req: Request, res: Response): Promise<void> => {
  const { collection, id } = req.params;
  const { document } = req.body;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  if (!document) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Document is required'
    });
    return;
  }

  try {
    // Create a copy of the document without the _id field
    const { _id, ...documentWithoutId } = document;

    const result = await db.collection(collection).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: documentWithoutId },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Document not found'
      });
      return;
    }

    const updatedDocument = result.value;
    if (!updatedDocument) {
      res.status(500).json({
        success: false,
        error: 'Database Error',
        message: 'Failed to retrieve updated document'
      });
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: {
        document: updatedDocument
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to update document'
    });
  }
};

export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  const { collection, id } = req.params;
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
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Document not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to delete document'
    });
  }
};

export const deleteDocuments = async (req: Request, res: Response): Promise<void> => {
  const { collection } = req.params;
  const { ids } = req.body;
  const db = getDatabase();

  if (!db) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'Not connected to database'
    });
    return;
  }

  if (!Array.isArray(ids)) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Ids array is required'
    });
    return;
  }

  try {
    const objectIds = ids.map(id => new ObjectId(id));
    const result = await db.collection(collection).deleteMany({ _id: { $in: objectIds } });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} documents`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database Error',
      message: error instanceof Error ? error.message : 'Failed to delete documents'
    });
  }
}; 