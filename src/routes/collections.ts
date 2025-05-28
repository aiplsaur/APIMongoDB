import { Router } from 'express';
import {
  getCollections,
  createCollection,
  renameCollection,
  dropCollection
} from '../controllers/collectionController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: MongoDB collection management
 */

/**
 * @swagger
 * /api/collections:
 *   get:
 *     summary: Get all collections
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: List of collections
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/', getCollections);

/**
 * @swagger
 * /api/collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Collection created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/', createCollection);

/**
 * @swagger
 * /api/collections/{oldName}/rename/{newName}:
 *   patch:
 *     summary: Rename a collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: oldName
 *         schema:
 *           type: string
 *         required: true
 *         description: Old collection name
 *       - in: path
 *         name: newName
 *         schema:
 *           type: string
 *         required: true
 *         description: New collection name
 *     responses:
 *       200:
 *         description: Collection renamed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.patch('/:oldName/rename/:newName', renameCollection);

/**
 * @swagger
 * /api/collections/{name}/drop:
 *   delete:
 *     summary: Drop a collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Collection name
 *     responses:
 *       200:
 *         description: Collection dropped
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete('/:name/drop', dropCollection);

export const collectionsRouter = router; 