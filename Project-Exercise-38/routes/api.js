/**
 * Sample Routes
 * These demonstrate how middleware wraps every request/response cycle.
 */

const express = require("express");
const router  = express.Router();

// ── GET /api ──────────────────────────────────────────────────────────────────
router.get("/", (req, res) => {
  res.json({
    success : true,
    message : "Welcome to the Middleware Demo API 🚀",
    version : "1.0.0",
    endpoints: [
      { method: "GET",  path: "/api",           description: "API root"              },
      { method: "GET",  path: "/api/users",      description: "List of users"         },
      { method: "GET",  path: "/api/users/:id",  description: "Single user by ID"     },
      { method: "POST", path: "/api/users",      description: "Create a new user"     },
      { method: "GET",  path: "/api/error",      description: "Trigger a 500 error"   },
      { method: "GET",  path: "/api/not-found",  description: "Trigger a custom 404"  },
    ],
  });
});

// ── GET /api/users ────────────────────────────────────────────────────────────
router.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice Johnson",  role: "Admin"     },
    { id: 2, name: "Bob Martinez",   role: "Developer" },
    { id: 3, name: "Carol Williams", role: "Designer"  },
  ];
  res.json({ success: true, count: users.length, users });
});

// ── GET /api/users/:id ────────────────────────────────────────────────────────
router.get("/users/:id", (req, res, next) => {
  const id   = parseInt(req.params.id, 10);
  const users = {
    1: { id: 1, name: "Alice Johnson",  role: "Admin"     },
    2: { id: 2, name: "Bob Martinez",   role: "Developer" },
    3: { id: 3, name: "Carol Williams", role: "Designer"  },
  };

  if (isNaN(id)) {
    const err  = new Error("User ID must be a number");
    err.status = 400; // Bad Request
    return next(err); // forward to error-handling middleware
  }

  const user = users[id];
  if (!user) {
    const err  = new Error(`User with ID ${id} not found`);
    err.status = 404;
    return next(err);
  }

  res.json({ success: true, user });
});

// ── POST /api/users ───────────────────────────────────────────────────────────
router.post("/users", (req, res, next) => {
  const { name, role } = req.body;

  // Simple validation
  if (!name || !role) {
    const err  = new Error("Both 'name' and 'role' fields are required");
    err.status = 422; // Unprocessable Entity
    return next(err);
  }

  const newUser = { id: Date.now(), name, role };
  res.status(201).json({ success: true, message: "User created", user: newUser });
});

// ── GET /api/error – intentionally throws a 500 ───────────────────────────────
router.get("/error", (req, res, next) => {
  try {
    throw new Error("Something went wrong on the server!");
  } catch (err) {
    err.status = 500;
    next(err); // forward the error to errorHandler middleware
  }
});

module.exports = router;