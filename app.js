const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('winston');
const promClient = require('prom-client');
const doctorRoutes = require('./routes/doctorRoutes');

// Initialize Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Create Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Load environment variables
dotenv.config({ path: './config.env' });
const dbURI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('MongoDB Connected'))
  .catch((err) => logger.error(err));

const app = express();

// Middleware
app.use(bodyParser.json());

// Morgan for HTTP request logging
app.use(morgan('combined'));

// Mount the doctor routes
app.use('/api/v1/doctors', doctorRoutes);

// Prometheus metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

// Start the server
const port = process.env.PORT || 7000;
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

// Exception handling
process.on('unhandledRejection', (err) => {
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
