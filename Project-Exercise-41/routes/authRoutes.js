const express= require("express")
const router = express.Router()
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

router.post("/register", async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User Already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({name,email,password:hashedPassword})
        await user.save()

       const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  maxAge: 24 * 60 * 60 * 1000
});

res.status(201).json({
  message: "User registered & logged in"
});
    }catch(error){
        res.status(500).json({message:"Registration failed", error: error.message})

    }
})

router.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token", token, {
  httpOnly: true,   
  secure: false,  
  maxAge: 24 * 60 * 60 * 1000 
});

        res.status(200).json({message:"Login successful",token})
    }catch(error){
        res.status(500).json({message:"Login failed", error: error.message})
    }
    })

module.exports = router