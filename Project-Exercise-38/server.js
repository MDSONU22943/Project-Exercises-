/**
 * ╔═══════════════════════════════════════════════════════╗
 * ║          Project Exercise 38: Middleware in Action    ║
 * ║          Topic: Middleware in Express.js              ║
 * ╚═══════════════════════════════════════════════════════╝
 *
 * Middleware pipeline (order matters!):
 *
 *  Request
 *    │
 *    ▼
 *  [1] express.json()          ← parse JSON request bodies
 *    │
 *    ▼
 *  [2] logger                  ← log URL, method, timestamp  ← APPLICATION-LEVEL
 *    │
 *    ▼
 *  [3] Route Handlers (/api/…) ← business logic
 *    │
 *    ▼
 *  [4] notFound                ← catch unknown routes → 404
 *    │
 *    ▼
 *  [5] errorHandler            ← format & send error JSON   ← ERROR-HANDLING
 *    │
 *    ▼
 *  Response
 */

const express      = require("express");
const logger       = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const apiRoutes    = require("./routes/api");

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── 1. Built-in / Third-party Middleware ────────────────────────────────────
app.use(express.json());               // parse application/json bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// ─── 2. Application-Level Middleware: Request Logger ─────────────────────────
// Registered with app.use() so it runs on EVERY request, for every route.
app.use(logger);

// ─── 3. Route Handlers ───────────────────────────────────────────────────────
app.use("/api", apiRoutes);

// Root redirect to API
app.get("/", (req, res) => {
  res.json({
    message : "Middleware Demo Server is running ✅",
    docs    : "Visit /api for available endpoints",
  });
});

// ─── 4. 404 Middleware – must come after all valid routes ─────────────────────
app.use(notFound);

// ─── 5. Global Error-Handling Middleware – must be LAST ──────────────────────
// Express identifies error-handling middleware by its 4-parameter signature.
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n\x1b[1m\x1b[36m╔════════════════════════════════════════╗\x1b[0m");
  console.log(  "\x1b[1m\x1b[36m║   🚀  Express Middleware Demo Server   ║\x1b[0m");
  console.log(  "\x1b[1m\x1b[36m╚════════════════════════════════════════╝\x1b[0m");
  console.log(`\n  Server running at: \x1b[4mhttp://localhost:${PORT}\x1b[0m`);
  console.log(  "  Press Ctrl+C to stop\n");
  console.log(  "\x1b[2m─────────────── Request Log ───────────────\x1b[0m\n");
});

module.exports = app; // export for testing