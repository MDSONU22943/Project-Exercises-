/**
 * Error-Handling Middleware
 *
 * Express recognises an error-handling middleware by its FOUR parameters:
 *   (err, req, res, next)
 *
 * It must be registered AFTER all routes so it can catch:
 *   1. Errors forwarded via next(err)   – application errors
 *   2. 404 – unknown routes (handled by the notFound middleware below)
 */

// ─── 404 – Route Not Found ────────────────────────────────────────────────────
/**
 * Catches any request that fell through all defined routes.
 * Creates a structured error and forwards it to the error handler.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward to errorHandler
};

// ─── Global Error Handler ─────────────────────────────────────────────────────
/**
 * Handles all errors in a consistent, user-friendly JSON format.
 *
 * Response shape:
 * {
 *   "success" : false,
 *   "status"  : <HTTP status code>,
 *   "message" : "<human-readable message>",
 *   "path"    : "<request path>",
 *   "method"  : "<HTTP method>",
 *   "timestamp": "<ISO timestamp>",
 *   "stack"   : "<stack trace>  ← only in development"
 * }
 */
const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code
  // Priority: error.status → error.statusCode → 500
  const statusCode = err.status || err.statusCode || 500;

  // Build a friendly message for known client errors; keep it vague for 5xx
  const clientMessage =
    statusCode < 500
      ? err.message
      : "An unexpected error occurred. Please try again later.";

  // Log the full error on the server side (stack trace included)
  console.error(
    `\x1b[31m[ERROR]\x1b[0m ${statusCode} – ${err.message}\n` +
    (err.stack ? `\x1b[2m${err.stack}\x1b[0m` : "")
  );

  // Send a structured JSON response
  res.status(statusCode).json({
    success   : false,
    status    : statusCode,
    message   : clientMessage,
    path      : req.originalUrl,
    method    : req.method,
    timestamp : new Date().toISOString(),
    // Expose stack trace only in development – never in production
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };