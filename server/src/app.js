import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { helmetMiddleware, corsMiddleware, generalLimiter } from './middleware/security.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { sendSuccess } from './utils/apiResponse.js';
import authRoutes from './routes/authRoutes.js';
import homepageRoutes from './routes/homepageRoutes.js';
import satsangRoutes from './routes/satsangRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import noticesRoutes from './routes/noticesRoutes.js';
import adheshRoutes from './routes/adheshRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import generalRoutes from './routes/generalRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import { getSitemap, getRobots } from './controllers/seoController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Global Middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Apply general rate limit to all /api/ routes
app.use('/api/', generalLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/satsang', satsangRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/adhesh', adheshRoutes);
app.use('/api', mediaRoutes);
app.use('/api', generalRoutes);

// SEO Routes
app.get('/sitemap.xml', getSitemap);
app.get('/api/sitemap.xml', getSitemap);
app.get('/robots.txt', getRobots);

// Health check endpoint
app.get('/api/health', (req, res) => {
  return sendSuccess(res, 'Jaigurudev API is operational', {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
  });
});

// Root informational endpoint
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Jaigurudev Spiritual Platform API</title>
      <style>
        body { font-family: system-ui, sans-serif; background: #FFF5F7; color: #4D1219; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 2rem 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center; max-width: 500px; border-top: 4px solid #DE7358; }
        h1 { margin-top: 0; color: #8A202D; font-size: 1.8rem; }
        p { color: #6E2F21; line-height: 1.6; }
        .status { display: inline-block; background: #E8F5E9; color: #2E7D32; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9rem; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>जयगुरुदेव — Jaigurudev API</h1>
        <p>Spiritual Platform REST Backend & Content Management System.</p>
        <div class="status">● Status: Active</div>
        <p><small>Endpoints available under <code>/api/*</code></small></p>
      </div>
    </body>
    </html>
  `);
});

// Export app for testing and server entry
export default app;
