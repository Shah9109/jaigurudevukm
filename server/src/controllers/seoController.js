import { Satsang } from '../models/Satsang.js';
import { Event } from '../models/Event.js';
import { Notice } from '../models/Notice.js';
import { Post } from '../models/Post.js';

/**
 * Generate Dynamic XML Sitemap
 * GET /sitemap.xml & /api/sitemap.xml
 */
export const getSitemap = async (req, res, next) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://jaigurudev.org';

    const staticRoutes = [
      '',
      '/about',
      '/teachings',
      '/satsang',
      '/events',
      '/notices',
      '/adhesh',
      '/videos',
      '/audio',
      '/gallery',
      '/publications',
      '/faq',
      '/contact',
      '/privacy-policy',
      '/terms',
      '/disclaimer',
    ];

    const [satsangs, events, notices] = await Promise.all([
      Satsang.find({ status: 'upcoming' }).select('_id updatedAt').lean(),
      Event.find().select('slug _id updatedAt').lean(),
      Notice.find({ status: 'active' }).select('_id updatedAt').lean(),
    ]);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // 1. Static Pages
    staticRoutes.forEach((route) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${route}</loc>\n`;
      xml += `    <changefreq>${route === '' || route === '/satsang' ? 'daily' : 'weekly'}</changefreq>\n`;
      xml += `    <priority>${route === '' ? '1.0' : route === '/satsang' ? '0.9' : '0.8'}</priority>\n`;
      xml += '  </url>\n';
    });

    // 2. Dynamic Satsang Detail Pages
    satsangs.forEach((item) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/satsang/${item._id}</loc>\n`;
      xml += '    <changefreq>daily</changefreq>\n';
      xml += '    <priority>0.85</priority>\n';
      xml += '  </url>\n';
    });

    // 3. Dynamic Events Detail Pages
    events.forEach((item) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/events/${item.slug || item._id}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    return res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

/**
 * Generate Robots.txt
 * GET /robots.txt
 */
export const getRobots = (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'https://jaigurudev.org';
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/auth
Disallow: /api/admin

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain');
  return res.status(200).send(robots);
};
