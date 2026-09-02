import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../config/db.js';
import app from '../app.js';

async function runSystemVerification() {
  console.log('====================================================');
  console.log('  JAIGURUDEV FULL-STACK ECOSYSTEM VERIFICATION SUITE');
  console.log('====================================================\n');

  await connectDB();

  const server = app.listen(5099, async () => {
    let passed = 0;
    let failed = 0;

    const testEndpoint = async (name, url, options = {}) => {
      try {
        const res = await fetch(`http://localhost:5099${url}`, options);
        const isJson = res.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await res.json() : await res.text();

        if (res.status >= 200 && res.status < 300) {
          console.log(`[PASS] ${res.status} | ${name} -> ${url}`);
          passed++;
          return { res, data };
        } else {
          console.error(`[FAIL] ${res.status} | ${name} -> ${url} | Response:`, data);
          failed++;
          return { res, data, failed: true };
        }
      } catch (err) {
        console.error(`[FAIL] ERR | ${name} -> ${url} | Error:`, err.message);
        failed++;
        return { error: err, failed: true };
      }
    };

    try {
      // 1. Health
      await testEndpoint('Health Check', '/api/health');

      // 2. SEO Sitemap & Robots
      await testEndpoint('Dynamic XML Sitemap', '/sitemap.xml');
      await testEndpoint('Dynamic Robots.txt', '/robots.txt');

      // 3. Public Content Endpoints
      await testEndpoint('Composite Homepage Data', '/api/homepage');
      await testEndpoint('Satsang Schedule List', '/api/satsang');
      await testEndpoint('Events List', '/api/events');
      await testEndpoint('Notices List', '/api/notices');
      await testEndpoint('Ashram Adhesh List', '/api/adhesh');
      await testEndpoint('Videos List', '/api/videos');
      await testEndpoint('Audio Library List', '/api/audio');
      await testEndpoint('Photo Gallery List', '/api/gallery');
      await testEndpoint('Publications / Documents List', '/api/documents');
      await testEndpoint('FAQ List', '/api/faq');

      // 4. Contact Form Submission
      await testEndpoint('Public Contact Enquiry', '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Devotee',
          email: 'devotee@example.com',
          phone: '+919876543210',
          subject: 'General Enquiry',
          message: 'जयगुरुदेव! टेस्ट मैसेज फॉर वेरिफिकेशन।',
        }),
      });

      // 5. Multi-Domain Search
      await testEndpoint('Global Multi-Domain Search', '/api/search?q=Satsang');

      // 6. Knowledge AI Chatbot
      await testEndpoint('AI Chatbot Query (Satsang)', '/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'सत्संग का समय क्या है?' }),
      });

      await testEndpoint('AI Chatbot Query (Ashram Address)', '/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'मथुरा आश्रम का पता' }),
      });

      // 7. Admin Authentication & Protected Endpoints
      const loginRes = await testEndpoint('Admin JWT Login', '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: process.env.INITIAL_ADMIN_EMAIL || 'admin@jaigurudev.org',
          password: process.env.INITIAL_ADMIN_PASSWORD || 'JaigurudevAdmin@2026',
        }),
      });

      const token = loginRes?.data?.data?.token;
      if (token) {
        const authHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        await testEndpoint('Admin Verify Token (GET /api/auth/me)', '/api/auth/me', { headers: authHeaders });
        await testEndpoint('Admin Dashboard Overview Stats', '/api/admin/dashboard-stats', { headers: authHeaders });
        await testEndpoint('Admin Site Settings GET', '/api/admin/settings', { headers: authHeaders });
        await testEndpoint('Admin Activity Logs GET', '/api/admin/logs', { headers: authHeaders });
        await testEndpoint('Admin Devotee Enquiries GET', '/api/admin/enquiries', { headers: authHeaders });
        await testEndpoint('Admin Knowledge Base GET', '/api/chatbot/knowledge', { headers: authHeaders });
      }

      console.log('\n====================================================');
      console.log(`  VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED`);
      console.log('====================================================\n');

      server.close();
      process.exit(failed > 0 ? 1 : 0);
    } catch (e) {
      console.error('Test run failure:', e);
      server.close();
      process.exit(1);
    }
  });
}

runSystemVerification();
