const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const env = require('./config/env.config');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware');
const swaggerSpec = require('./swagger/swagger.json');
const { startReminderCron } = require('./cron/reminderScheduler.cron');

const app = express();

// Security & Core Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Endpoint & Healthcheck
app.get('/', (req, res) => {
  res.json({
    name: 'SmartEdu AI - Education Management Portal Backend API',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/api-docs',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 SmartEdu AI Backend Server Running on Port: ${PORT}`);
  console.log(`📡 Base API Endpoint: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`==================================================`);

  // Initialize background daily reminder cron runner
  try {
    startReminderCron();
  } catch (cronErr) {
    console.error('Failed to initialize reminder cron:', cronErr.message);
  }
});

module.exports = { app, server };
