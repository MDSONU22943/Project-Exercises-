const express = require('express');
const path= require('path');

const uploadRouter= require('./routes/upload');

const app = express();
const PORT=3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.use("/upload", uploadRouter)

app.get("/health", (req,res)=>{
    res.status(200).json({message:"Server is healthy"})
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:"Something went wrong!"})
})

app.listen(PORT, () => {
  console.log(`\n🚀 File Upload Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploaded files stored in: ./uploads/`);
  console.log(`\n  Endpoints:`);
  console.log(`  POST   /upload/disk       → Upload single image to disk`);
  console.log(`  POST   /upload/memory     → Upload single image to memory`);
  console.log(`  POST   /upload/multiple   → Upload up to 5 images to disk`);
  console.log(`  GET    /upload/list       → List all uploaded files`);
  console.log(`  DELETE /upload/:filename  → Delete a file\n`);
});