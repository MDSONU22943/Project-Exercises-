const express = require('express');
const multer = require('multer');
const path= require('path');

const app=express()
const PORT=3000

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const uniqueName=Date.now()+ "-" + file.originalname
        cb(null,uniqueName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, and GIF files are allowed'), false);
    }
};

const upload=multer({storage:storage,fileFilter:fileFilter})

app.post("/upload", upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', file: req.file });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
