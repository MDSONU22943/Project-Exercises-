const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const {uploadToDisk,uploadToMemory} = require("../middleware/multerConfig")

const formatBytes = (bytes) => {
    if(bytes<1024) return bytes + " Bytes"
    else if(bytes<1024*1024) return (bytes/1024).toFixed(2) + " KB"
    else if(bytes<1024*1024*1024) return (bytes/(1024*1024)).toFixed(2) + " MB"
    else return (bytes/(1024*1024*1024)).toFixed(2) + " GB"
}

router.post("/disk", (req,res)=>{
    uploadToDisk.single('profilePicture')(req,res,(err)=>{
        if(err) return handleMulterError(err,res)
        
            if(!req.file){
                return res.status(400).json({success:false, message:"No file uploaded"})
            }

            const {originalname,filename,mimetype,size,path:filePath}= req.file
            res.status(200).json({
                success:true,
                storage:"disk",
                message:"File uploaded to disk successfully",
                file:{
                    originalName:originalname,
                    savedAs:filename,
                    mimeType:mimetype,
                    size:formatBytes(size),
                    sizeBytes:size,
                    path:`/uploads/${filename}`,
                    uploadTime:new Date().toISOString()
                }
            })
    })
})


router.post("/memory", (req,res)=>{
    uploadToMemory.single('profilePicture')(req,res,(err)=>{
        if(err) return handleMulterError(err,res)

        if(!req.file){
            return res.status(400).json({success:false, message:"No file uploaded"})
        }

        const {originalname,mimetype,size, buffer}= req.file

            const base64Preview = `data:${mimetype};base64,${buffer.toString("base64")}`;

            res.status(200).json({
                success:true,
                storage:"memory",
                message:"File uploaded to memory successfully",
                file:{
                    originalName:originalname,
                    mimeType:mimetype,
                    size:formatBytes(size),
                    sizeBytes:size,
                    bufferLength:buffer.length,
                    preview:base64Preview,
                    uploadTime:new Date().toISOString()
                }
            })
    })
})


router.post("/multiple", (req,res)=>{
    uploadToDisk.array('photos',5)(req,res,(err)=>{
        if(err) return handleMulterError(err,res)

        if(!req.files || req.files.length===0){
            return res.status(400).json({success:false, message:"No files uploaded"})
        }

        const files = req.files.map(file=>{
            const {originalname,filename,mimetype,size,path:filePath}= file
            return {
                originalName:originalname,
                savedAs:filename,
                mimeType:mimetype,
                size:formatBytes(size),
                sizeBytes:size,
                path:`/uploads/${filename}`,
                uploadTime:new Date().toISOString()
            }
        })

        res.status(200).json({
            success:true,
            storage:"disk",
            message:"Files uploaded to disk successfully",
            files
        })
    })
})  

router.get("/list",(req,res)=>{
    const uploadsDir = path.join(__dirname, "../uploads")
    fs.readdir(uploadsDir, (err, files) => {
        if(err) return res.status(500).json({success:false, message:"Failed to read uploads directory"})

        const fileList = files.map(filename=>{
            const filePath = path.join(uploadsDir, filename)
            const stats = fs.statSync(filePath)
            return {
                filename,
                size:formatBytes(stats.size),
                sizeBytes:stats.size,
                uploadTime:stats.birthtime.toISOString(),
                path:`/uploads/${filename}`
            }
        })

        res.status(200).json({
            success:true,
            message:"List of uploaded files",
            files:fileList
        })
    })
})

router.delete("/:filename",(req,res)=>{
    const {filename} = req.params
    const filePath = path.join(__dirname, "../uploads", filename)
    fs.unlink(filePath, (err)=>{
        if(err){
            if(err.code === "ENOENT"){
                return res.status(404).json({success:false, message:"File not found"})
            }
            return res.status(500).json({success:false, message:"Failed to delete file"})    
        }
        res.status(200).json({success:true, message:"File deleted successfully"})
    })
    })


function handleMulterError(err,res){
    const {MulterError} =require("multer")
    if (err instanceof MulterError) {
    const messages = {
      LIMIT_FILE_SIZE: "File is too large. Maximum allowed size is 5MB.",
      LIMIT_FILE_COUNT: "Too many files. Maximum is 5 files at once.",
      LIMIT_UNEXPECTED_FILE: `Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.`,
    };
    return res.status(400).json({
      success: false,
      error: "Upload Error",
      message: messages[err.code] || err.message,
      code: err.code,
    });
  }
    return res.status(500).json({success:false, message:"Failed to upload file"})
}

module.exports = router