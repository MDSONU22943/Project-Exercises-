/**
 * Exercise 32: Basic File System Explorer
 * Explores a directory and displays all files and subdirectories recursively.
 * Uses core modules: fs, path, os
 */

const fs   = require('fs');
const path = require('path');
const os   = require('os');

// ─── ANSI colour helpers ───────────────────────────────────────────────────────
const c = {
  reset  : '\x1b[0m',
  bold   : '\x1b[1m',
  dim    : '\x1b[2m',
  cyan   : '\x1b[36m',
  yellow : '\x1b[33m',
  green  : '\x1b[32m',
  red    : '\x1b[31m',
  blue   : '\x1b[34m',
  magenta: '\x1b[35m',
};

const paint = (colour, text) => `${colour}${text}${c.reset}`;

// ─── Utility: human-readable file size ────────────────────────────────────────
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

// ─── Utility: last-modified timestamp ─────────────────────────────────────────
function formatDate(date) {
  return date.toLocaleString('en-US', {
    year : 'numeric', month : 'short', day  : '2-digit',
    hour : '2-digit', minute: '2-digit',
  });
}

// ─── Core: recursive directory explorer ───────────────────────────────────────
/**
 * @param {string}  dirPath   - Absolute/relative path to explore
 * @param {string}  prefix    - Tree-drawing prefix (used in recursion)
 * @param {object}  stats     - Accumulator { files, dirs, totalSize, errors }
 * @param {number}  depth     - Current depth (0 = root call)
 * @param {number}  maxDepth  - Maximum recursion depth (-1 = unlimited)
 */
function exploreDirectory(dirPath, prefix = '', stats = null, depth = 0, maxDepth = -1) {
  // Initialise accumulator on the first call
  if (stats === null) {
    stats = { files: 0, dirs: 0, totalSize: 0, errors: 0 };
  }

  // ── Validate the target directory ────────────────────────────────────────────
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Path does not exist: "${dirPath}"`);
  }

  const rootStat = fs.statSync(dirPath);
  if (!rootStat.isDirectory()) {
    throw new Error(`Path is not a directory: "${dirPath}"`);
  }

  // ── Read directory entries ────────────────────────────────────────────────────
  let entries;
  try {
    entries = fs.readdirSync(dirPath);
  } catch (err) {
    console.error(paint(c.red, `  ${prefix}└── [ERROR reading dir] ${err.message}`));
    stats.errors++;
    return stats;
  }

  entries.sort((a, b) => {
    // Directories first, then files — both sorted alphabetically
    const aIsDir = fs.statSync(path.join(dirPath, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dirPath, b)).isDirectory();
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return  1;
    return a.localeCompare(b);
  });

  entries.forEach((entry, index) => {
    const fullPath   = path.join(dirPath, entry);
    const isLast     = index === entries.length - 1;
    const connector  = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';

    let entryStat;
    try {
      entryStat = fs.statSync(fullPath);
    } catch (err) {
      console.log(`${prefix}${connector}${paint(c.red, entry)} ${paint(c.dim, '[permission denied]')}`);
      stats.errors++;
      return;
    }

    if (entryStat.isDirectory()) {
      // ── Directory ──────────────────────────────────────────────────────────────
      stats.dirs++;
      const dirLabel = paint(c.bold + c.cyan, entry + '/');
      const meta     = paint(c.dim, `  [dir | modified: ${formatDate(entryStat.mtime)}]`);
      console.log(`${prefix}${connector}${dirLabel}${meta}`);

      if (maxDepth === -1 || depth < maxDepth) {
        exploreDirectory(fullPath, prefix + childPrefix, stats, depth + 1, maxDepth);
      } else {
        console.log(`${prefix}${childPrefix}${paint(c.dim, '└── [max depth reached]')}`);
      }

    } else if (entryStat.isFile()) {
      // ── File ───────────────────────────────────────────────────────────────────
      stats.files++;
      stats.totalSize += entryStat.size;

      const ext       = path.extname(entry).toLowerCase();
      const fileColour = getFileColour(ext);
      const fileLabel  = paint(fileColour, entry);
      const meta       = paint(c.dim, `  [${formatSize(entryStat.size)} | modified: ${formatDate(entryStat.mtime)}]`);
      console.log(`${prefix}${connector}${fileLabel}${meta}`);

    } else {
      // ── Symbolic link / special file ──────────────────────────────────────────
      console.log(`${prefix}${connector}${paint(c.magenta, entry)} ${paint(c.dim, '[symlink/special]')}`);
    }
  });

  return stats;
}

// ─── Colour-code files by extension ───────────────────────────────────────────
function getFileColour(ext) {
  const map = {
    // Source code
    '.js': c.yellow,  '.ts': c.yellow,  '.jsx': c.yellow, '.tsx': c.yellow,
    '.py': c.green,   '.rb': c.green,   '.go':  c.green,  '.rs': c.green,
    '.java': c.blue,  '.c':  c.blue,    '.cpp': c.blue,   '.cs': c.blue,
    // Data / config
    '.json': c.cyan,  '.yaml': c.cyan,  '.yml': c.cyan,   '.toml': c.cyan,
    '.xml':  c.cyan,  '.csv': c.cyan,   '.env': c.cyan,
    // Docs
    '.md':  c.reset,  '.txt': c.reset,  '.pdf': c.reset,
    // Images
    '.png': c.magenta, '.jpg': c.magenta, '.jpeg': c.magenta,
    '.gif': c.magenta, '.svg': c.magenta, '.webp': c.magenta,
  };
  return map[ext] ?? c.reset;
}

// ─── Print summary banner ──────────────────────────────────────────────────────
function printSummary(targetDir, stats, durationMs) {
  const sep = paint(c.dim, '─'.repeat(52));
  console.log(`\n${sep}`);
  console.log(paint(c.bold, '  Summary'));
  console.log(sep);
  console.log(`  ${paint(c.cyan,    '📁 Directories :')}\t${stats.dirs}`);
  console.log(`  ${paint(c.yellow,  '📄 Files       :')}\t${stats.files}`);
  console.log(`  ${paint(c.green,   '💾 Total size  :')}\t${formatSize(stats.totalSize)}`);
  if (stats.errors > 0) {
    console.log(`  ${paint(c.red,   '⚠  Errors      :')}\t${stats.errors}`);
  }
  console.log(`  ${paint(c.dim,    '⏱  Duration    :')}\t${durationMs} ms`);
  console.log(`  ${paint(c.dim,    '🖥  Host        :')}\t${os.hostname()} (${os.platform()})`);
  console.log(`${sep}\n`);
}

// ─── Entry point ──────────────────────────────────────────────────────────────
function main() {
  // Accept directory from CLI arg, default to current working directory
  const rawTarget  = process.argv[2] ?? '.';
  const targetDir  = path.resolve(rawTarget);          // always absolute
  const maxDepth   = parseInt(process.argv[3] ?? '-1', 10); // optional depth cap

  console.log('\n' + paint(c.bold, '  🗂  File System Explorer'));
  console.log(paint(c.dim, `  Path : ${targetDir}`));
  if (maxDepth !== -1) console.log(paint(c.dim, `  Max depth : ${maxDepth}`));
  console.log(paint(c.dim, '─'.repeat(52)));
  console.log(paint(c.bold + c.cyan, path.basename(targetDir) + '/'));

  const start = Date.now();

  try {
    const stats = exploreDirectory(targetDir, '', null, 0, maxDepth);
    const elapsed = Date.now() - start;
    printSummary(targetDir, stats, elapsed);

  } catch (err) {
    // Top-level errors: path doesn't exist, not a directory, etc.
    console.error('\n' + paint(c.red + c.bold, '  ✖  Error: ') + err.message);
    console.error(paint(c.dim, '  Usage: node fileExplorer.js <directory> [maxDepth]'));
    console.error(paint(c.dim, '  Example: node fileExplorer.js ./my-project 3\n'));
    process.exit(1);
  }
}

main();