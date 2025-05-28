import { Router } from 'express';
import {
  executeQuery,
  saveQuery,
  getQueries,
  deleteQuery
} from '../controllers/queryController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: MongoDB query management
 */

/**
 * @swagger
 * /api/query/execute:
 *   post:
 *     summary: Execute a MongoDB query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *               collection:
 *                 type: string
 *     responses:
 *       200:
 *         description: Query results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/execute', executeQuery);

/**
 * @swagger
 * /api/query/save:
 *   post:
 *     summary: Save a MongoDB query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               query:
 *                 type: string
 *               collection:
 *                 type: string
 *     responses:
 *       201:
 *         description: Query saved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/save', saveQuery);

/**
 * @swagger
 * /api/queries:
 *   get:
 *     summary: Get all saved queries
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: List of saved queries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/', getQueries);

/**
 * @swagger
 * /api/query/{id}:
 *   delete:
 *     summary: Delete a saved query
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Query ID
 *     responses:
 *       200:
 *         description: Query deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete('/:id', deleteQuery);

export const queriesRouter = router; 