const express = require('express')
const path = require("path")

const app= express()
const PORT=3000

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).send("<h1>404 – Page Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`\n🚀  Server running at http://localhost:${PORT}`);
  console.log(`📁  Serving static files from → /public\n`);
});