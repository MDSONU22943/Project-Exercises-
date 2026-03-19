const express= require('express')
const app=express()
const PORT=3000

app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

let users = [
  { name: "Rahul", age: 22 },
  { name: "Sonu", age: 20 }
];

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.get("/add",(req,res)=>{
    res.render("addUser")
})

app.post("/add",(req,res)=>{
    const { name, age } = req.body;
    users.push({ name, age });
    res.redirect("/");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})