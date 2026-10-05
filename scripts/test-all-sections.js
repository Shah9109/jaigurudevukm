const http = require('http');

function makeReq(options, body) {
  return new Promise((resolve) => {
    const r = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {}
        resolve({ status: res.statusCode, headers: res.headers, raw: data, json });
      });
    });
    r.on('error', (e) => resolve({ status: 'ERR', error: e.message }));
    if (body) r.write(typeof body === 'string' ? body : JSON.stringify(body));
    r.end();
  });
}

async function verifyAll() {
  const results = { passed: 0, failed: 0 };

  function log(name, ok, info) {
    if (ok) {
      results.passed++;
      console.log(`[PASS] ${name} ${info ? '-> ' + info : ''}`);
    } else {
      results.failed++;
      console.log(`[FAIL] ${name} ${info ? '-> ' + info : ''}`);
    }
  }

  console.log('==================================================');
  console.log('       EXHAUSTIVE WEBSITE VERIFICATION SUITE       ');
  console.log('==================================================');

  // 1. Client Routes (Vite Dev Server)
  console.log('\n--- Section 1: Client Front-End Routes ---');
  const clientRoutes = [
    '/',
    '/about',
    '/baba-jaigurudev-ji',
    '/baba-umakant-ji',
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
    '/search',
    '/admin/login',
    '/admin',
  ];

  for (const path of clientRoutes) {
    const res = await makeReq({ hostname: 'localhost', port: 5173, path, method: 'GET' });
    const ok = res.status === 200 && res.raw.includes('<div id="root">');
    log(`Client: ${path}`, ok, `HTTP ${res.status}`);
  }

  // 2. Public API Endpoints
  console.log('\n--- Section 2: Public API Endpoints ---');
  const publicApis = [
    { name: 'Health Check', path: '/api/health', check: (d) => d?.success || d?.status === 'ok' },
    { name: 'Homepage Composite', path: '/api/homepage', check: (d) => d?.success && d?.data?.settings },
    { name: 'Satsang List', path: '/api/satsang', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Events List', path: '/api/events', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Notices List', path: '/api/notices', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Ashram Adhesh List', path: '/api/adhesh', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Videos Gallery List', path: '/api/videos', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Audio Library List', path: '/api/audio', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Photo Gallery List', path: '/api/gallery', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Publications / Literature', path: '/api/documents', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'FAQ Collection', path: '/api/faq', check: (d) => Array.isArray(d) || Array.isArray(d?.data) },
    { name: 'Multi-Domain Search', path: '/api/search?q=Mathura', check: (d) => (d?.results || d?.data) !== undefined },
  ];

  for (const api of publicApis) {
    const res = await makeReq({ hostname: 'localhost', port: 5001, path: api.path, method: 'GET' });
    const ok = res.status === 200 && (api.check ? api.check(res.json || res.raw) : true);
    log(`API: ${api.name} (${api.path})`, ok, `HTTP ${res.status}`);
  }

  // 3. Dynamic SEO Assets
  console.log('\n--- Section 3: SEO Assets ---');
  const sitemap = await makeReq({ hostname: 'localhost', port: 5001, path: '/sitemap.xml', method: 'GET' });
  log('Dynamic Sitemap (/sitemap.xml)', sitemap.status === 200 && sitemap.raw.includes('urlset'), `HTTP ${sitemap.status}`);

  const robots = await makeReq({ hostname: 'localhost', port: 5001, path: '/robots.txt', method: 'GET' });
  log('Robots Policy (/robots.txt)', robots.status === 200 && robots.raw.includes('User-agent'), `HTTP ${robots.status}`);

  // 4. Interactive Forms & AI Services
  console.log('\n--- Section 4: Public Interactive Services ---');
  const contactRes = await makeReq(
    {
      hostname: 'localhost',
      port: 5001,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      name: 'Verification Tester',
      email: 'tester@example.com',
      phone: '9876543210',
      subject: 'Automated System Check',
      message: 'Verifying contact form processing.',
    }
  );
  log('Devotee Contact Form Submission', contactRes.status === 201 || contactRes.status === 200, `HTTP ${contactRes.status}`);

  const aiChatRes = await makeReq(
    {
      hostname: 'localhost',
      port: 5001,
      path: '/api/chatbot/message',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      message: 'Who is Baba Umakant Ji Maharaj?',
    }
  );
  log('Spiritual Chatbot Assistant Response', aiChatRes.status === 200 && Boolean(aiChatRes.json?.data?.reply), `HTTP ${aiChatRes.status}`);

  // 5. Admin Authentication & CMS
  console.log('\n--- Section 5: Admin CMS Control Center ---');
  const loginRes = await makeReq(
    {
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      email: 'admin@jaigurudev.org',
      password: 'JaigurudevAdmin@2026',
    }
  );

  const token = loginRes.json?.data?.token || loginRes.json?.token;
  log('Admin JWT Login', loginRes.status === 200 && Boolean(token), `HTTP ${loginRes.status}`);

  if (token) {
    const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

    const meRes = await makeReq({ hostname: 'localhost', port: 5001, path: '/api/auth/me', headers: authHeaders });
    log('Admin Token Validation (/api/auth/me)', meRes.status === 200, `HTTP ${meRes.status}`);

    const statsRes = await makeReq({ hostname: 'localhost', port: 5001, path: '/api/admin/dashboard-stats', headers: authHeaders });
    log('Admin Dashboard Metrics (/api/admin/dashboard-stats)', statsRes.status === 200, `HTTP ${statsRes.status}`);

    const logsRes = await makeReq({ hostname: 'localhost', port: 5001, path: '/api/admin/logs', headers: authHeaders });
    log('Admin Audit Logs (/api/admin/logs)', logsRes.status === 200, `HTTP ${logsRes.status}`);

    const settingsRes = await makeReq({ hostname: 'localhost', port: 5001, path: '/api/admin/settings', headers: authHeaders });
    log('Admin Site Settings (/api/admin/settings)', settingsRes.status === 200, `HTTP ${settingsRes.status}`);

    const enquiriesRes = await makeReq({ hostname: 'localhost', port: 5001, path: '/api/admin/enquiries', headers: authHeaders });
    log('Admin Devotee Enquiries (/api/admin/enquiries)', enquiriesRes.status === 200, `HTTP ${enquiriesRes.status}`);

    // CRUD: Photo Gallery
    const createPhoto = await makeReq(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/admin/gallery',
        method: 'POST',
        headers: authHeaders,
      },
      {
        title: 'Verif Ashram Gate',
        imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf68fe9ec1d',
        category: 'Ashram',
        description: 'Test description',
      }
    );
    log('Photo Gallery CRUD: Create', createPhoto.status === 201, `HTTP ${createPhoto.status}`);
    const photoId = createPhoto.json?.data?.id || createPhoto.json?.data?._id || createPhoto.json?.id;

    if (photoId) {
      const delPhoto = await makeReq({
        hostname: 'localhost',
        port: 5001,
        path: `/api/admin/gallery/${photoId}`,
        method: 'DELETE',
        headers: authHeaders,
      });
      log('Photo Gallery CRUD: Delete', delPhoto.status === 200, `HTTP ${delPhoto.status}`);
    }

    // CRUD: Video Control
    const createVid = await makeReq(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/admin/videos',
        method: 'POST',
        headers: authHeaders,
      },
      {
        title: 'Verif Satsang Pravachan',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'Pravachan',
        speaker: 'Baba Umakant Ji Maharaj',
      }
    );
    log('Video Control CRUD: Create', createVid.status === 201, `HTTP ${createVid.status}`);
    const vidId = createVid.json?.data?.id || createVid.json?.data?._id || createVid.json?.id;

    if (vidId) {
      const delVid = await makeReq({
        hostname: 'localhost',
        port: 5001,
        path: `/api/admin/videos/${vidId}`,
        method: 'DELETE',
        headers: authHeaders,
      });
      log('Video Control CRUD: Delete', delVid.status === 200, `HTTP ${delVid.status}`);
    }
  }

  console.log('\n==================================================');
  console.log(`TOTAL TESTS: ${results.passed + results.failed} | PASSED: ${results.passed} | FAILED: ${results.failed}`);
  console.log('==================================================');
  if (results.failed > 0) process.exit(1);
}

verifyAll();
