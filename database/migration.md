# Jaigurudev Platform — Database Migration & Hostinger Deployment Guide

This guide provides step-by-step instructions for migrating the **Jaigurudev Spiritual Platform** from MongoDB to a **MySQL / MariaDB** database and deploying it onto shared hosting such as **Hostinger** (hPanel or cPanel).

---

## 1. Architecture Overview

### Previous Architecture (MongoDB)
```
Frontend (React + Vite)
      ↓
Backend API (Express.js + Mongoose)
      ↓
MongoDB Atlas / Local MongoDB
```

### New Relational Architecture (MySQL / MariaDB)
```
Frontend (React + Vite)
      ↓
Backend API (Express.js + mysql2 Pool)
      ↓
MySQL / MariaDB (utf8mb4_unicode_ci)
      ↓
Hostinger Shared / Cloud Hosting (phpMyAdmin + Node.js App)
```

---

## 2. Relational Schema Mapping

| MongoDB Collection | MySQL / MariaDB Table | Description |
| :--- | :--- | :--- |
| `admins` | `admins` | Superadmin and administrator accounts with bcrypt password hashes. |
| `sitesettings` | `site_settings` | Organization branding, contacts, emergency helplines, social links. |
| `sitesettings.heroBanners` | `hero_banners` | Normalized child table for homepage banner slideshow items. |
| `satsangs` | `satsangs` | Satsang schedules, discourse dates, venues, organizers, attendees. |
| `notices` | `notices` | Urgent alerts, popup notices, and general announcements. |
| `events` | `events` | Bhandara mahotsavs, spiritual camps, and youth rallies. |
| `adheshes` | `adhesh` | Official Ashram orders, administrative directives, and decrees. |
| `videos` | `videos` | Satsang video discourses and YouTube live stream links. |
| `audios` | `audios` | Devotional bhajans, morning prayers, and naam dhun tracks. |
| `galleries` | `galleries` | Photo albums and event darshan galleries. |
| `galleries.photos` | `gallery_photos` | Normalized child table for photos inside each gallery album. |
| `documents` | `documents` | Downloadable publications, books, and ashram magazines. |
| `posts` | `posts` | Blog articles and press releases with SEO metadata. |
| `posts.gallery` | `post_gallery_images` | Normalized child table for post gallery images. |
| `faqs` | `faqs` | Devotee frequently asked questions organized by category. |
| `chatbotknowledges` | `chatbot_knowledge` | Verified spiritual Q&A knowledge base with fulltext search. |
| `contactenquiries` | `contact_enquiries` | Inquiries submitted by devotees through the contact form. |
| `activitylogs` | `activity_logs` | Audit trail recording all administrative CRUD operations. |

---

## 3. Database Setup on Hostinger (Step-by-Step)

### Step 3.1: Create MySQL Database on Hostinger
1. Log in to your **Hostinger Control Panel (hPanel)**.
2. Navigate to **Databases** > **Management** (or search for *MySQL Databases*).
3. Under **Create a New MySQL Database and Database User**:
   - **Database Name**: Enter name (e.g. `u123456789_jaigurudev`).
   - **Username**: Enter database user (e.g. `u123456789_admin`).
   - **Password**: Create a strong password and save it securely.
4. Click **Create**.

### Step 3.2: Import Schema via phpMyAdmin
1. In Hostinger hPanel under **MySQL Databases**, find your newly created database and click **Enter phpMyAdmin**.
2. Click the database name in the left panel.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `database/schema.sql` from this repository.
5. Ensure the character set is set to **utf-8** (or `utf8mb4`).
6. Click **Go** (or **Import**) at the bottom.
7. Confirm that all 18 tables are created with green success indicators.

### Step 3.3 (Optional): Import Default Seed Data
- If starting with a fresh database without existing MongoDB data, import `database/seed.sql` using the same phpMyAdmin **Import** tab.
- This creates the default superadmin (`admin@jaigurudev.org` / `JaigurudevAdmin@2026`) and initial spiritual content.

---

## 4. Migrating Existing MongoDB Data to MySQL

If you have live data stored in MongoDB (Atlas or local), follow these steps to migrate it directly into MySQL without losing any data.

### Step 4.1: Configure Environment Variables
Open `server/.env` and ensure the database credentials match your target MySQL instance:
```env
# MySQL Credentials (Hostinger or Local)
DB_HOST=127.0.0.1          # Or your Hostinger MySQL Host IP
DB_PORT=3306
DB_NAME=jaigurudev_db      # Or your Hostinger database name
DB_USER=root               # Or your Hostinger database user
DB_PASSWORD=your_password  # Your Hostinger database user password

# MongoDB Source (Retained untouched during migration)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jaigurudev_db
```

### Step 4.2: Execute the Automated Migration Script
From the project root directory, run:
```bash
npm run migrate:mongo-to-mysql
```
Or directly from Node:
```bash
node scripts/migrate-mongodb-to-mysql.js
```

### Step 4.3: Validate Migration Metrics
The script will display a summary table upon completion:
```
====================================================
       MONGODB TO MYSQL MIGRATION SUMMARY
====================================================
Admins migrated:            1
Site Settings migrated:     1
Hero Banners migrated:      1
Satsangs migrated:          3
Notices migrated:           2
Events migrated:            2
Ashram Adhesh migrated:     2
Videos migrated:            2
Audios migrated:            2
Galleries migrated:         1
Gallery Photos migrated:    1
Documents migrated:         1
Posts migrated:             0
Post Gallery Images:        0
FAQs migrated:              2
Chatbot Knowledge migrated: 4
Contact Enquiries migrated: 1
Activity Logs migrated:     1
Errors:                     0
====================================================
```
> [!IMPORTANT]
> The migration script reads documents from MongoDB and performs non-destructive `INSERT ... ON DUPLICATE KEY UPDATE` operations into MySQL. **No MongoDB documents are deleted.**

---

## 5. Hostinger Node.js Application Deployment

### Step 5.1: Build the Frontend Client
Before deployment, build the production bundle of the React frontend:
```bash
npm run build
```
This produces optimized static assets in `client/dist/`.

### Step 5.2: Configure Hostinger Node.js App
1. In **Hostinger hPanel**, navigate to **Advanced** > **Node.js** (available on Business Web Hosting, Cloud Hosting, and VPS).
2. Click **Create Application**:
   - **Node.js version**: Select **18.x** or **20.x**.
   - **Application mode**: `Production`.
   - **Application root**: `jaigurudev-backend` (or your subfolder).
   - **Application startup file**: `src/server.js`.
3. Upload the `server/` directory files via File Manager or Git deployment.
4. Click **Run NPM Install** in the Node.js panel to install dependencies (`express`, `mysql2`, `bcryptjs`, etc.).
5. Add environment variables in the Node.js configuration interface:
   - `PORT`: Set to port assigned by Hostinger (or `5001`).
   - `NODE_ENV`: `production`.
   - `DB_HOST`: `localhost` (Hostinger internal MySQL hostname).
   - `DB_PORT`: `3306`.
   - `DB_NAME`: Your database name.
   - `DB_USER`: Your database username.
   - `DB_PASSWORD`: Your database password.
   - `JWT_SECRET`: Your production secret key.
   - `CLIENT_URL`: `https://yourdomain.com`.

### Step 5.3: Deploy Frontend to `public_html`
Upload the contents of `client/dist/` into your Hostinger `public_html/` directory.

### Step 5.4: Apache `.htaccess` Configuration for SPA & API Routing
Create or update `.htaccess` in `public_html/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Proxy /api requests to the Node.js backend port (e.g. 5001)
  RewriteRule ^api/(.*)$ http://127.0.0.1:5001/api/$1 [P,L]
  RewriteRule ^sitemap\.xml$ http://127.0.0.1:5001/sitemap.xml [P,L]
  RewriteRule ^robots\.txt$ http://127.0.0.1:5001/robots.txt [P,L]

  # Route all other frontend requests to index.html (React Router SPA)
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 6. Verification Checklist

After deployment, verify all features:
- [ ] Database connectivity: `GET /api/health` returns `200 OK`.
- [ ] Dynamic sitemap: `GET /sitemap.xml` generates valid XML with dynamic satsang and event links.
- [ ] Homepage payload: `GET /api/homepage` returns all sections.
- [ ] Devotee search: `GET /api/search?q=Satsang` returns filtered results.
- [ ] Chatbot: `POST /api/chatbot/message` returns verified guidance.
- [ ] Contact Form: `POST /api/contact` stores devotee inquiries in MySQL.
- [ ] Admin Login: `POST /api/auth/login` verifies bcrypt hash and issues JWT.
- [ ] Admin CRUD: Create, update, and delete satsangs, notices, and videos.
