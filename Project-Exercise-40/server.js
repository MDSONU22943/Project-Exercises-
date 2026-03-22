const express = require('express')
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/booksDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))


const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String
    }
})

const Book = mongoose.model("Book", bookSchema)

app.post("/books", async (req,res)=>{
    try{
        const book = new Book(req.body)
        const savedBook = await book.save()
        res.status(201).json(savedBook)
    } catch(error){
        res.status(400).json({error:error.message})
    }
})

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});