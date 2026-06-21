/**
 * Portfolio Backend Server
 * --------------------------------
 * A small Express API that serves portfolio content (profile, skills,
 * education, internships, projects, achievements, etc.) and accepts
 * contact-form submissions.
 *
 * Data is stored in simple JSON files under ./data so the project runs
 * immediately with zero external database setup. Swapping in MongoDB
 * or PostgreSQL later only requires changing the functions in
 * ./db.js — none of the route handlers below need to change.
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------- Health check ----------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running" });
});

// ---------- Profile ----------
app.get("/api/profile", (req, res) => {
  const data = db.readDb();
  res.json(data.profile);
});

// ---------- Skills ----------
app.get("/api/skills", (req, res) => {
  const data = db.readDb();
  res.json(data.skills);
});

// ---------- Education ----------
app.get("/api/education", (req, res) => {
  const data = db.readDb();
  res.json(data.education);
});

// ---------- Internships ----------
app.get("/api/internships", (req, res) => {
  const data = db.readDb();
  res.json(data.internships);
});

// ---------- Projects ----------
app.get("/api/projects", (req, res) => {
  const data = db.readDb();
  const { featured } = req.query;
  let projects = data.projects;
  if (featured === "true") {
    projects = projects.filter((p) => p.featured);
  }
  res.json(projects);
});

app.get("/api/projects/:id", (req, res) => {
  const data = db.readDb();
  const project = data.projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// ---------- Achievements ----------
app.get("/api/achievements", (req, res) => {
  const data = db.readDb();
  res.json(data.achievements);
});

// ---------- Research & Publications ----------
app.get("/api/research", (req, res) => {
  const data = db.readDb();
  res.json(data.research);
});

// ---------- Trainings ----------
app.get("/api/trainings", (req, res) => {
  const data = db.readDb();
  res.json(data.trainings);
});

// ---------- Certifications ----------
app.get("/api/certifications", (req, res) => {
  const data = db.readDb();
  res.json(data.certifications);
});

// ---------- Hackathons ----------
app.get("/api/hackathons", (req, res) => {
  const data = db.readDb();
  res.json(data.hackathons);
});

// ---------- Aggregate "everything" endpoint ----------
// Handy for the frontend to fetch the whole site in a single request.
app.get("/api/all", (req, res) => {
  const data = db.readDb();
  res.json(data);
});

// ---------- Contact form ----------
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const saved = db.addMessage({ name, email, message });

  // Optional: wire up real email delivery here using nodemailer (already a
  // dependency). Example:
  //   const nodemailer = require("nodemailer");
  //   const transporter = nodemailer.createTransport({ ... });
  //   await transporter.sendMail({ to: process.env.OWNER_EMAIL, subject: `New message from ${name}`, text: message });
  // For now, messages are simply persisted to data/messages.json.

  res.status(201).json({ success: true, id: saved.id });
});

// Admin-style endpoint to view received messages (no auth — for local/demo use only)
app.get("/api/messages", (req, res) => {
  res.json(db.readMessages());
});

// ---------- Serve frontend build in production ----------
const clientBuildPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientBuildPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientBuildPath, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});
