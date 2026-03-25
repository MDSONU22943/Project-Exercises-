const express = require('express');
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Book = require('../models/Book');

router.post("/", protect,async (req,res)=>{
    try{
        const {title, author, publishedYear, genre} = req.body
        const newBook = new Book({title, author, publishedYear, genre})
        const savedBook = await newBook.save()
        res.status(201).json(savedBook)
    }catch(error){
        res.status(500).json({message:"Failed to create book", error: error.message})
    }
})

router.get("/", protect,async (req,res)=>{
    try{
        const books = await Book.find()
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({message:"Failed to fetch books", error: error.message})
    }
})

router.get("/search", protect,async (req, res) => {
    try {
        const { genre, author } = req.query

        let filter = {}

        if (genre) filter.genre = genre
        if (author) filter.author = author

        const books = await Book.find(filter)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: "Search failed", error: error.message })
    }
})
router.get("/:id",protect, async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        res.status(200).json(book)
    }catch(error){
        res.status(500).json({message:"Failed to fetch book", error: error.message})
    }
})

router.put("/:id",protect, async (req,res)=>{
    try{
        const {title, author, publishedYear, genre} = req.body
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {title, author, publishedYear, genre}, {new:true})
        res.status(200).json(updatedBook)
    }catch(error){
        res.status(500).json({message:"Failed to update book", error: error.message})
    }
})

router.delete("/:id",protect, async (req,res)=>{
    try{
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Book deleted successfully"})
    }catch(error){
        res.status(500).json({message:"Failed to delete book", error: error.message})
    }
})


router.get("/search/genre/:genre",protect, async (req, res) => {
    try {
        const books = await Book.find({ genre: req.params.genre })
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: "Search failed", error: error.message })
    }
})

router.get("/search/author/:author",protect, async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author })
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: "Search failed", error: error.message })
    }
})


module.exports = router