/**
 * db.js
 * --------------------------------
 * Minimal file-backed "database" layer.
 *
 * Why a JSON file instead of MySQL/MongoDB/PostgreSQL out of the box?
 * It lets this project run instantly with `npm install && npm start`,
 * no database server to install or configure. Every function below
 * is intentionally small and isolated so you can swap the internals
 * for a real database without touching server.js:
 *
 *   - readDb()        -> replace with a query that returns the same shape
 *   - readMessages()   -> SELECT * FROM messages
 *   - addMessage(msg)  -> INSERT INTO messages ...
 *
 * See README.md "Swapping in a real database" section for a worked
 * example using MongoDB (Mongoose) and PostgreSQL (pg).
 */

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "data", "db.json");
const MESSAGES_PATH = path.join(__dirname, "data", "messages.json");

function readDb() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function readMessages() {
  if (!fs.existsSync(MESSAGES_PATH)) return [];
  const raw = fs.readFileSync(MESSAGES_PATH, "utf-8");
  return JSON.parse(raw || "[]");
}

function addMessage({ name, email, message }) {
  const messages = readMessages();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };
  messages.push(entry);
  fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2));
  return entry;
}

module.exports = { readDb, readMessages, addMessage };
