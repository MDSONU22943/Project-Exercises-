const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// ─── Allowed MIME Types ───────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// ─── File Filter ──────────────────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new multer.MulterError("LIMIT_UNEXPECTED_FILE", `Only image files are allowed. Received: ${file.mimetype}`),
      false
    );
  }
};

// ─── DISK STORAGE ─────────────────────────────────────────────────────────────
// Files are saved permanently to the /uploads directory on disk
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname).toLowerCase()}`;
    cb(null, uniqueName);
  },
});

// ─── MEMORY STORAGE ───────────────────────────────────────────────────────────
// Files are kept in RAM as Buffer objects — not written to disk
const memoryStorage = multer.memoryStorage();

// ─── Multer Instances ─────────────────────────────────────────────────────────
const uploadToDisk = multer({
  storage: diskStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

const uploadToMemory = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = { uploadToDisk, uploadToMemory, ALLOWED_MIME_TYPES, MAX_FILE_SIZE };