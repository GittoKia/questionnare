const path     = require("path");
const express  = require("express");
const cors     = require("cors");
const connect  = require("./connect");
const topics   = require("./topicRoutes");
const users    = require("./userRoutes");

const app  = express();
const PORT = process.env.PORT || 3000;          // Render injects its own port

/* ── CORS ──────────────────────────────────── */
const allowed = [
  "http://localhost:5173",                      // Vite dev
  "http://localhost:3000",                      // CRA dev
  "https://questionnaire-frontend.onrender.com" // your Render Static‑Site URL
];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* ── API routes ───────────────────────────── */
app.use(express.json());
app.use(topics);
app.use(users);

/* ── Serve React build (optional but handy) ─ */
const dist = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(dist));
app.get("*", (_, res) => res.sendFile(path.join(dist, "index.html")));

/* ── Start server & DB ─────────────────────── */
app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`API listening on port ${PORT}`);
});