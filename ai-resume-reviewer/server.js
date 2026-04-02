const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const {extractText} = require("./utils/extractText");
const {getAIResponse} = require("./utils/ai");

const app=express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });


app.get("/", (req, res) => {
    res.send("Welcome to the AI Resume Reviewer API. Use POST /upload to submit a resume for review.");
});

app.post("/upload", upload.single('resume'), async (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log("File:", req.file);
        const text = await extractText(req.file.path);
        console.log("Extracted text length:", text.length)
        const aiFeedback = await getAIResponse(text);
        console.log("AI Done")
        res.json({feedback: aiFeedback});
    } catch(err){
        console.error("Error processing resume:", err);
        res.status(500).json({error: "An error occurred while processing the resume."});
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

