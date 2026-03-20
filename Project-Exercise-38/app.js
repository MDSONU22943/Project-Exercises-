const express=require('express')
const app=express()

const PORT=3000

app.use((req,res,next)=>{
    const timestamp= new Date().toISOString()
    console.log(`[${timestamp}] ${req.method} ${req.url}`)
    next()
})


app.get("/", (req,res)=>{
    res.send("Home Page")
})

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/error", (req, res, next) => {
  const err = new Error("Manual error triggered");
  next(err);
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});