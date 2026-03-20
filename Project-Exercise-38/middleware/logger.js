/**
 * Application-Level Middleware: Request Logger
 *
 * Intercepts every incoming request and logs:
 *  - HTTP Method  (GET, POST, PUT, DELETE …)
 *  - Request URL
 *  - Timestamp    (ISO-8601 format)
 *  - Response time in milliseconds (logged after the response is sent)
 */

const logger = (req, res, next) => {
  const startTime = Date.now(); // capture start time

  // Gather request details
  const method    = req.method;
  const url       = req.originalUrl || req.url;
  const timestamp = new Date().toISOString();

  // ANSI colour helpers (only visible in a real terminal)
  const colors = {
    reset  : "\x1b[0m",
    cyan   : "\x1b[36m",
    yellow : "\x1b[33m",
    green  : "\x1b[32m",
    red    : "\x1b[31m",
    dim    : "\x1b[2m",
    bold   : "\x1b[1m",
  };

  /** Choose a colour based on the HTTP method */
  const methodColor = {
    GET    : colors.green,
    POST   : colors.cyan,
    PUT    : colors.yellow,
    DELETE : colors.red,
    PATCH  : colors.yellow,
  }[method] || colors.dim;

  // Log the incoming request immediately
  console.log(
    `${colors.dim}[${timestamp}]${colors.reset} ` +
    `${methodColor}${colors.bold}${method.padEnd(7)}${colors.reset} ` +
    `${colors.cyan}${url}${colors.reset}`
  );

  /**
   * Hook into the 'finish' event so we can log the response
   * status code and total round-trip duration AFTER Express
   * has actually sent the response.
   */
  res.on("finish", () => {
    const duration   = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Colour the status code: 2xx green, 3xx cyan, 4xx yellow, 5xx red
    const statusColor =
      statusCode >= 500 ? colors.red    :
      statusCode >= 400 ? colors.yellow :
      statusCode >= 300 ? colors.cyan   :
                          colors.green;

    console.log(
      `${colors.dim}[${new Date().toISOString()}]${colors.reset} ` +
      `${methodColor}${colors.bold}${method.padEnd(7)}${colors.reset} ` +
      `${colors.cyan}${url}${colors.reset} ` +
      `→ ${statusColor}${colors.bold}${statusCode}${colors.reset} ` +
      `${colors.dim}(${duration}ms)${colors.reset}`
    );
  });

  next(); // IMPORTANT: pass control to the next middleware / route handler
};

module.exports = logger;