# ॥ जयगुरुदेव ॥ Jaigurudev Full-Stack Spiritual Platform & Mobile Ecosystem

A comprehensive, production-ready, full-stack digital ecosystem built for **Jaigurudev Sanstha (Mathura Ashram)**. Designed with clean architecture, high visual aesthetics, 100% offline-tolerant database connection, an administrative CMS with full content control, an integrated Knowledge AI assistant, and an offline-first companion mobile app.

---

## 📦 Project Architecture & Workspace Structure

```
jaigurudevukm/
├── client/                     # Public Web App & Admin CMS UI (React 18 + Vite + TailwindCSS)
│   ├── src/
│   │   ├── admin/              # Admin CMS Control Panel (Dashboard, Satsang, Notices, Adhesh, Settings, AI)
│   │   ├── components/         # Reusable Devotional Components (Logo, Nav, Cards, ChatWidget, SEO)
│   │   ├── context/            # React AuthContext (JWT Admin Session Guard)
│   │   ├── pages/              # 18+ Public Pages (Home, Satsang, Events, Notices, Adhesh, Audio, Gallery...)
│   │   └── services/           # Axios Client with Auto JWT Interceptors
│   └── package.json
│
├── server/                     # Backend API & CMS Core (Node.js + Express + MongoDB Atlas Mongoose)
│   ├── src/
│   │   ├── config/             # Resilient Database Connection Layer (db.js)
│   │   ├── controllers/        # REST & CMS Business Logic (Auth, Satsang, Events, Media, Chatbot, SEO)
│   │   ├── middleware/         # Security Suite (Helmet, CORS, Rate Limiting, Admin JWT Guard)
│   │   ├── models/             # 15 Complete Mongoose Models with Indexing
│   │   ├── routes/             # Organized Express Routers
│   │   ├── tests/              # End-to-End System Verification Suite (24 tests)
│   │   └── utils/              # Response Formatter & Authentic Database Seeder
│   └── package.json
│
├── mobile/                     # Jaigurudev Sadhana Mobile App (React Native / Expo Companion)
│   ├── src/
│   │   ├── screens/            # HomeScreen, MeditationTimerScreen, SadhanaDiaryScreen, PrayersScreen, AshramGuideScreen
│   │   ├── services/           # 100% Offline Local Storage Service (AsyncStorage)
│   │   └── theme.js            # Sacred Devotional Color Tokens & Scales
│   └── package.json
│
├── package.json                # Monorepo Workspaces Configuration
└── README.md
```

---

## 🌟 Key Ecosystem Features

### 1. Devotional Public Spiritual Website
- **Design System:** Devotional aesthetic with sacred color tokens (Deep Maroon, Soft Rose Blush, Pure Cream, Divine Gold).
- **Composite Dynamic Homepage:** 14 customizable dynamic sections (Hero, Maharaj Ji Introduction, Upcoming Satsang, Emergency Announcements, Ashram Directives, Video Discourses, Devotional Audio, Photo Gallery, Digital Downloads, Seva Pillars, and Location Guide).
- **Satsang Center:** Interactive monthly calendar view, map navigation, filters by city/state, and one-tap event sharing.
- **Official Ashram Directives (Adhesh):** Numbered administrative circulars with signatory metadata and official PDF downloads.
- **Media Galleries:** Continuous devotional audio player with lyrics drawer, modal YouTube discourse player, and lightbox photo gallery.
- **Global Multi-Domain Search:** High-speed keyword search across Satsang, Events, Notices, Directives, Videos, and FAQs.
- **Dynamic SEO Engine:** Auto-generated `sitemap.xml`, `robots.txt`, and Schema.org `Organization` JSON-LD structured data.

### 2. Admin CMS & Knowledge AI Control Center
- **JWT Protected CMS:** Secured routes under `/admin` with persistent tokens and auto-logout on invalid credentials.
- **Overview Dashboard:** Live counters across all 15 models, recent audit trails, and devotee message triage.
- **Content CRUD Managers:** Create, edit, and delete Satsang programs, notices, ashram adhesh, events, video discourses, and audio tracks.
- **Homepage Section Manager:** Enable or disable homepage sections on the fly without writing code.
- **Audit Logs:** Automated tracking of all mutations (`CREATE`, `UPDATE`, `DELETE`, `SETTINGS_CHANGE`, `LOGIN`) with IP address logs.
- **Knowledge AI Q&A Assistant:** Hybrid AI engine answering queries via exact/keyword matches, dynamic Satsang schedule synthesis, and ashram office coordinates.

### 3. Jaigurudev Sadhana Mobile App
- **100% Offline-First Privacy:** Devotee meditation logs, daily checklist, and personal diary remain strictly on device.
- **Meditation Timer:** Configurable durations (15m, 30m, 45m, 1h, 2h, 3h) with haptic 15-minute interval reminder chimes.
- **Daily Discipline Checklist:** Amrit Vela (03:00–05:00 AM) and Sandhya Aarti checkboxes + Lifetime Vegetarianism pledge.
- **Offline Liturgy & Prayers:** Complete Hindi Devanagari texts for Morning Prayers, Evening Aarti, Naam-Dhun, and Sakhis with font scaling (`A-` / `A+`).
- **Ashram Visitor Guide:** One-tap dialing to the Mathura Central Ashram office and Google Maps directions.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
# Install root monorepo dependencies
npm install

# Install client, server, and mobile dependencies
npm --prefix server install
npm --prefix client install
npm --prefix mobile install
```

### 2. Environment Variables Configuration

#### Server (`server/.env`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://sanjayshah910930_db_user:q3wpXjoCqgOlbC2R@cluster0.kln1oaq.mongodb.net/?appName=Cluster0
JWT_SECRET=jaigurudev_sacred_jwt_secret_key_2026_prod
JWT_EXPIRES_IN=7d
INITIAL_ADMIN_EMAIL=admin@jaigurudev.org
INITIAL_ADMIN_PASSWORD=JaigurudevAdmin@2026
```

#### Client (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Seed Database with Authentic Ashram Records
```bash
npm --prefix server run seed
```

### 4. Run Development Servers
```bash
# Run both Backend API and Frontend Web App concurrently
npm run dev

# Or run individually:
npm run dev:server     # Runs Express on http://localhost:5000
npm run dev:client     # Runs Vite on http://localhost:5173
npm --prefix mobile start  # Runs Expo Mobile Dev Server
```

---

## 🧪 Automated Testing & Verification

Run the full system integration test suite verifying all 24 API endpoints:
```bash
npm --prefix server test
# Or: node server/src/tests/systemVerification.test.js
```

---

## 🔐 Default Admin Credentials

- **Portal URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@jaigurudev.org`
- **Password:** `JaigurudevAdmin@2026`

---

## 🏛️ License & Copyright
Developed for **Jaigurudev Sanstha (Mathura Ashram)**. Dedicated to spiritual enlightenment, vegetarianism, non-violence, and universal human welfare.
