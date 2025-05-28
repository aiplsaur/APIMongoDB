import { Router } from 'express';
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  deleteDocuments
} from '../controllers/documentController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: MongoDB document management
 */

/**
 * @swagger
 * /api/collection/{collection}/documents:
 *   get:
 *     summary: Get documents from a collection
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Documents per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort JSON string
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter JSON string
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/:collection/documents', getDocuments);

/**
 * @swagger
 * /api/collection/{collection}/document/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/:collection/document/:id', getDocument);

/**
 * @swagger
 * /api/collection/{collection}/document:
 *   post:
 *     summary: Create a document
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: object
 *     responses:
 *       201:
 *         description: Document created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/:collection/document', createDocument);

/**
 * @swagger
 * /api/collection/{collection}/document/{id}:
 *   put:
 *     summary: Update a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: object
 *     responses:
 *       200:
 *         description: Document updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/:collection/document/:id', updateDocument);

/**
 * @swagger
 * /api/collection/{collection}/document/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete('/:collection/document/:id', deleteDocument);

/**
 * @swagger
 * /api/collection/{collection}/documents:
 *   delete:
 *     summary: Delete multiple documents
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Documents deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete('/:collection/documents', deleteDocuments);

export const documentsRouter = router; 