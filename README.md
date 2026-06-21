# Saranya T — Personal Portfolio (Full-Stack)

A full-stack personal portfolio built to showcase Saranya T's projects, internships,
research, and skills as a Computer Science Engineering student specializing in AI
and Data Science.

- **Frontend:** React 19 (Vite) — no CSS framework, hand-built design system
- **Backend:** Node.js + Express.js — REST API
- **Database:** JSON file storage out of the box (swappable for MongoDB/PostgreSQL — see below)
- **Deployment-ready for:** Render/Railway (backend) + Vercel/Netlify (frontend), or a single Node host serving both

---

## 1. Project structure

```
portfolio/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # NavBar, Hero, Projects, ExperienceLog, About, Contact, Icons, StatusScreens
│   │   ├── hooks/
│   │   │   └── usePortfolioData.js   # fetch + contact-form POST logic
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # design tokens + base styles
│   ├── index.html
│   ├── vite.config.js       # dev-server proxy: /api -> http://localhost:5000
│   └── package.json
│
├── server/                  # Express backend
│   ├── data/
│   │   ├── db.json          # seeded portfolio content (profile, projects, internships, etc.)
│   │   └── messages.json    # contact-form submissions land here
│   ├── db.js                # tiny file-based data-access layer
│   ├── server.js            # all API routes
│   ├── .env.example
│   └── package.json
│
├── package.json              # root convenience scripts (installs/runs both apps)
└── README.md
```

---

## 2. Quick start (run locally)

You need **Node.js 18+** installed.

```bash
# 1. Unzip the project, then from the project root:
npm run install:all     # installs deps for both client and server

# 2. Start both client (Vite) and server (Express) together:
npm run dev
```

This starts:
- **Backend** at `http://localhost:5000`
- **Frontend** at `http://localhost:5173` (Vite dev server, proxies `/api/*` to the backend automatically)

Open **http://localhost:5173** in your browser. The site will load all content live from
the Express API.

### Running client/server separately

```bash
npm run dev:server   # just the backend, on :5000
npm run dev:client   # just the frontend, on :5173
```

---

## 3. Production build (single server)

For a single deployable Node app that serves both the API and the built React site:

```bash
npm start
```

This runs `vite build` (outputs to `client/dist`) and then starts Express, which serves
the built frontend as static files and answers `/api/*` requests from the same process.
Visit **http://localhost:5000** — everything (site + API) is on one origin.

---

## 4. API reference

All routes are prefixed with `/api`.

| Method | Route                  | Description                                   |
|--------|-------------------------|------------------------------------------------|
| GET    | `/api/health`           | Health check                                   |
| GET    | `/api/all`              | Entire portfolio payload in one request        |
| GET    | `/api/profile`          | Name, summary, contact info, headline stats     |
| GET    | `/api/skills`           | Skills grouped by category                      |
| GET    | `/api/education`        | Education history                               |
| GET    | `/api/internships`      | All 9 internships, newest first                 |
| GET    | `/api/projects`         | All projects. Add `?featured=true` for featured only |
| GET    | `/api/projects/:id`     | A single project by id                          |
| GET    | `/api/achievements`     | Achievement list                                |
| GET    | `/api/research`         | Research papers / publications                  |
| GET    | `/api/trainings`        | Training & cohort programs                       |
| GET    | `/api/certifications`  | Certifications list                              |
| GET    | `/api/hackathons`       | Hackathon participation                          |
| POST   | `/api/contact`          | Submit the contact form — body: `{ name, email, message }` |
| GET    | `/api/messages`         | View all received contact-form messages (local/demo use — no auth) |

### Example: submitting the contact form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Recruiter","email":"hr@company.com","message":"We'\''d love to chat!"}'
```

Messages are appended to `server/data/messages.json`. In production you'd typically wire
this up to an email service (e.g. Nodemailer + SMTP, SendGrid, or Resend) — `nodemailer`
is already listed as a dependency to make that easy to add in `server/server.js`'s
`/api/contact` handler.

---

## 5. Editing your content

All resume content lives in **`server/data/db.json`** — a single JSON file with these
top-level keys: `profile`, `skills`, `education`, `internships`, `projects`,
`achievements`, `research`, `trainings`, `certifications`, `hackathons`.

To update your portfolio:
1. Edit `server/data/db.json` directly (it's plain JSON, easy to hand-edit).
2. Restart the server (`npm run dev:server` or `npm start`) — no frontend changes needed,
   since the React app fetches everything from the API at load time.

To add a new project, append an object to the `projects` array:

```json
{
  "id": "proj-8",
  "title": "Your Project Name",
  "subtitle": "One-line description",
  "description": "A longer paragraph about what it does and why it matters.",
  "tags": ["AI", "Web App"],
  "link": "https://github.com/yourname/project",
  "featured": true
}
```

---

## 6. Swapping in a real database

The file-based store in `server/db.js` exposes exactly three functions:
`readDb()`, `readMessages()`, `addMessage()`. To move to MongoDB or PostgreSQL, you only
need to rewrite the **insides** of these functions — `server.js` (all the routes) never
needs to change.

### Option A — MongoDB (via Mongoose)

```bash
cd server
npm install mongoose
```

```js
// server/db.js (MongoDB version)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  receivedAt: { type: Date, default: Date.now },
}));

// Portfolio content can stay in db.json and be read with fs as before,
// or be migrated into its own Mongoose model the same way.

async function readMessages() {
  return Message.find().sort({ receivedAt: -1 }).lean();
}

async function addMessage({ name, email, message }) {
  const doc = await Message.create({ name, email, message });
  return doc.toObject();
}

module.exports = { readDb, readMessages, addMessage };
```

Don't forget to `await` these calls in `server.js` once they become async, and add
`MONGODB_URI=mongodb://localhost:27017/portfolio` to your `.env`.

### Option B — PostgreSQL (via `pg`)

```bash
cd server
npm install pg
```

```js
// server/db.js (PostgreSQL version)
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function readMessages() {
  const { rows } = await pool.query('SELECT * FROM messages ORDER BY received_at DESC');
  return rows;
}

async function addMessage({ name, email, message }) {
  const { rows } = await pool.query(
    `INSERT INTO messages (name, email, message, received_at)
     VALUES ($1, $2, $3, NOW()) RETURNING *`,
    [name, email, message]
  );
  return rows[0];
}

module.exports = { readDb, readMessages, addMessage };
```

Create the table first:

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  received_at TIMESTAMP DEFAULT NOW()
);
```

### Option C — MySQL (via `mysql2`)

Same shape as the PostgreSQL example, swapping in `mysql2/promise` and `?` placeholders
instead of `$1, $2, $3`.

---

## 7. Deploying live

**Simplest path — one host, one process:**
Deploy the whole `portfolio/` folder to a Node host (Render, Railway, Fly.io, a VPS).
Set the build command to `npm run install:all && npm run build:client` and the start
command to `npm run start:server-only`. Express will serve the built React app and the
API from the same URL.

**Split path — frontend and backend separately:**
- Deploy `server/` to Render/Railway/Heroku-equivalent. Note the resulting URL.
- Deploy `client/` to Vercel or Netlify. Set an environment variable
  `VITE_API_URL=https://your-backend-url.com` (the frontend already reads this via
  `import.meta.env.VITE_API_URL` in `usePortfolioData.js`) and update CORS in
  `server.js` if you want to restrict origins.

---

## 8. Design notes

The visual direction is a "research lab notebook" theme — deep navy background, warm
paper-toned cards, signal-amber and data-teal accents, with Fraunces (display serif),
Inter (body), and JetBrains Mono (data/labels/timestamps) for type. Internships render
as dated log entries; the hero's stats count up like a live dashboard metric — both
chosen to reflect Saranya's actual background in data analytics rather than a generic
"developer portfolio" template.

---

## 9. Tech stack summary

| Layer        | Technology                                   |
|--------------|-----------------------------------------------|
| Frontend     | React 19, Vite 8, plain CSS (custom design system) |
| Backend      | Node.js, Express 4                            |
| Data store   | JSON file (swappable — see §6)                |
| HTTP client  | Native `fetch`                                |
| Dev tooling  | concurrently (run both servers with one command), ESLint |

Enjoy — and good luck with the internship/job search, Saranya! 🚀
#   P e r s o n a l - P o r t f o l i o  
 