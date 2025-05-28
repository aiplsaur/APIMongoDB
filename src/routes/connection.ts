import { Router } from 'express';
import { connect, getStatus } from '../controllers/connectionController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Connection
 *   description: MongoDB connection management
 */

/**
 * @swagger
 * /api/connection:
 *   post:
 *     summary: Connect to MongoDB
 *     tags: [Connection]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               connectionString:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connection result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/', connect);

/**
 * @swagger
 * /api/connection/status:
 *   get:
 *     summary: Get connection status
 *     tags: [Connection]
 *     responses:
 *       200:
 *         description: Connection status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/status', getStatus);

export const connectionRouter = router; 