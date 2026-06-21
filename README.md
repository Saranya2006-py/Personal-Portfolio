Saranya T — Portfolio

Full-stack personal portfolio. React frontend, Express backend, JSON file storage (swappable for MongoDB/PostgreSQL).

Run it

bashnpm run install:all
npm run dev

Open http://localhost:5173


Backend: http://localhost:5000
Frontend: http://localhost:5173 (proxies /api to backend)


Build for production

bashnpm start

Builds the React app and serves everything (site + API) from http://localhost:5000.

Project structure

client/   → React app (Vite)
server/   → Express API
  data/db.json       → all portfolio content (edit this to update your info)
  data/messages.json → contact form submissions

Edit your content

Everything — projects, internships, skills, achievements — lives in server/data/db.json. Edit it, restart the server, done.

API

RouteWhat it returnsGET /api/allEverything, in one callGET /api/projectsProjects (?featured=true for featured only)GET /api/internshipsInternship historyPOST /api/contactSubmit contact form — { name, email, message }

Swap in a real database

server/db.js has 3 functions: readDb(), readMessages(), addMessage(). Rewrite their insides for MongoDB/PostgreSQL/MySQL — no route changes needed in server.js.

Deploy

One host (Render/Railway): build with npm run install:all && npm run build:client, start with npm run start:server-only.

Split (Vercel/Netlify + backend host): set VITE_API_URL on the frontend to point at your deployed backend URL.
