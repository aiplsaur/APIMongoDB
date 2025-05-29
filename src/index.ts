import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectionRouter } from './routes/connection';
import { collectionsRouter } from './routes/collections';
import { documentsRouter } from './routes/documents';
import { queriesRouter } from './routes/queries';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/connection', connectionRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/collection', documentsRouter);
app.use('/api/query', queriesRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}); 