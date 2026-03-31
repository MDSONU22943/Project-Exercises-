require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const bookRoutes = require("./routes/bookRoutes")
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const {connectRedis} = require("./config/redis")

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser());

connectDB()
connectRedis()

app.use("/api/auth", authRoutes)
app.use("/books", bookRoutes)

app.get("/", (req,res)=>{
    res.send("Welcome to the Book API")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

