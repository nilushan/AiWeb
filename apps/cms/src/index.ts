import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { makeHandler } from '@keystatic/core/api';
import keystaticConfig from './keystatic.config.js';

// Load environment variables
dotenvConfig();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'keystatic-cms'
  });
});

// Keystatic API handler
const keystaticHandler = makeHandler({
  config: keystaticConfig,
});

// Mount Keystatic API at /api/keystatic
app.use('/api/keystatic', keystaticHandler);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Keystatic CMS API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/keystatic/*'
    }
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Keystatic CMS server running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/keystatic`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
