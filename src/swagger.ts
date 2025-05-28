import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MongoDB Vista Manager API',
    version: '1.0.0',
    description: 'API for managing MongoDB databases.',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production'
        ? process.env.BASE_URL || 'https://your-app-name.onrender.com'
        : `http://localhost:${process.env.PORT || 8080}`,
    },
  ],
  components: {
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indicates if the request was successful.'
          },
          data: {
            type: 'object',
            description: 'The response data (optional).'
          },
          message: {
            type: 'string',
            description: 'A success or error message (optional).'
          },
          error: {
            type: 'string',
            description: 'An error message if the request failed (optional).'
          },
          details: {
            type: 'object',
            description: 'Additional error details (optional).'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; 