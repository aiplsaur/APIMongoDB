# MongoDB Vista Manager API

A Node.js API for managing MongoDB databases with TypeScript and Express.

## Features

- MongoDB connection management
- Collection operations (create, rename, drop)
- Document CRUD operations with pagination and filtering
- Custom query execution and saving
- TypeScript implementation
- Error handling and input validation
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mongovista-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Endpoints

### Connection

- `POST /api/connection`
  - Body: `{ connectionString: string }`
  - Response: `{ success: boolean, message: string }`

- `GET /api/connection/status`
  - Response: `{ isConnected: boolean, database?: string }`

### Collections

- `GET /api/collections`
  - Response: `Array<{ name: string, count: number, size: number }>`

- `POST /api/collection`
  - Body: `{ name: string }`
  - Response: `{ success: boolean, message: string }`

- `PATCH /api/collection/:oldName/rename/:newName`
  - Response: `{ success: boolean, message: string }`

- `DELETE /api/collection/:name/drop`
  - Response: `{ success: boolean, message: string }`

### Documents

- `GET /api/collection/:collection/documents`
  - Query: `?page=1&limit=20&sort={"field":"name","order":1}&filter={"age":{$gt:18}}`
  - Response: `{ documents: Array<any>, total: number }`

- `GET /api/collection/:collection/document/:id`
  - Response: `{ document: any }`

- `POST /api/collection/:collection/document`
  - Body: `{ document: any }`
  - Response: `{ document: any }`

- `PUT /api/collection/:collection/document/:id`
  - Body: `{ document: any }`
  - Response: `{ document: any }`

- `DELETE /api/collection/:collection/document/:id`
  - Response: `{ success: boolean, message: string }`

- `DELETE /api/collection/:collection/documents`
  - Body: `{ ids: string[] }`
  - Response: `{ success: boolean, message: string }`

### Queries

- `POST /api/query/execute`
  - Body: `{ query: string, collection?: string }`
  - Response: `{ results: any[] }`

- `POST /api/query/save`
  - Body: `{ name: string, query: string, collection?: string }`
  - Response: `{ query: any }`

- `GET /api/queries`
  - Response: `Array<{ id: string, name: string, query: string }>`

- `DELETE /api/query/:id`
  - Response: `{ success: boolean, message: string }`

## Error Handling

The API uses standard HTTP status codes:

- 400: Bad Request (invalid input)
- 404: Not Found (resource doesn't exist)
- 500: Server Error (database/connection issues)

Error responses follow this format:
```json
{
  "success": false,
  "error": string,
  "message": string,
  "details": any
}
```

## Security

- Input sanitization
- MongoDB query validation
- CORS configuration
- Basic error handling

## Development

1. Install development dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build the project:
```bash
npm run build
```

## License

MIT 