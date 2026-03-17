const express = require('express')
const app=express()

const PORT=3000


app.use(express.json())

let posts = [
    {
      id: 1,
      title: "Getting Started with Express.js",
      content: "Express is a minimal and flexible Node.js web application framework...",
      author: "Alice",
      createdAt: new Date("2025-01-10T09:00:00Z"),
      updatedAt: new Date("2025-01-10T09:00:00Z"),
    },
    {
      id: 2,
      title: "Understanding Middleware",
      content: "Middleware functions are functions that have access to the request and response objects...",
      author: "Bob",
      createdAt: new Date("2025-02-14T12:30:00Z"),
      updatedAt: new Date("2025-02-14T12:30:00Z"),
    },
  ];

let nextId=posts.length+1

function findPostOrRespond(id,res){
    const post = posts.find((p) => p.id === Number(id))
    if(!post){
        res.status(404).json({error:'Post not found'})
        return null
    }
    return post
}

app.get('/', (req,res)=>{
    res.json({
        message:"Express Blog API is running",
        endpoints:{
            "GET    /posts":                 "List all posts",
      "GET    /view-post/:id":         "Get a single post by ID",
      "POST   /add-post":              "Create a new post",
      "PUT    /update-post/:id":       "Update an existing post",
      "DELETE /delete-post/:id":       "Delete a post",
        }
    })
})

app.get('/posts', (req,res)=>{
    const {author} = req.query;

    let result =[...posts].sort((a,b)=> b.createdAt-a.createdAt)
    if(author){
        result=result.filter((p)=> p.author.toLocaleLowerCase()===author.toLocaleLowerCase())
    }

    res.json({
        success:true,
        count:result.length,
        posts:result
    })
})

app.get('/view-post/:id', (req,res)=>{
    const post=findPostOrRespond(req.params.id,res)
    if(!post) return
    res.json({success:true,post})
})

app.post('/add-post',(req,res)=>{
    const {title,content,author="Anonymous"} = req.body

    if (!title || !title.trim()) {
        return res.status(400).json({ success: false, message: "Field 'title' is required." });
      }
      if (!content || !content.trim()) {
        return res.status(400).json({ success: false, message: "Field 'content' is required." });
      }

      const now = new Date()
      const newPost = {
        id: nextId++,
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        createdAt: now,
        updatedAt: now,
      };

      posts.push(newPost)

      res.status(201).json({
        success:true,
        message:"Post created successfully",
        post:newPost
      })
})

app.put("/update-post/:id", (req,res)=>{
    const post=findPostOrRespond(req.params.id,res)

    if(!post) return

    const {title,content,author} = req.body

    if (title  !== undefined) post.title   = title.trim();
  if (content !== undefined) post.content = content.trim();
  if (author  !== undefined) post.author  = author.trim();

  post.updatedAt=new Date()

  res.json({
    success:true,
    message:"Post Updated Successfully",
    post
  })
})

app.delete("/delete-post/:id", (req, res) => {
    const post = findPostOrRespond(req.params.id, res);
    if (!post) return; // 404 already sent
   
    posts = posts.filter((p) => p.id !== post.id);
   
    res.json({
      success: true,
      message: `Post "${post.title}" deleted successfully.`,
      deletedPost: post,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.path} not found.`,
    });
  });

  app.listen(PORT, () => {
    console.log(`\n🚀  Blog API running at http://localhost:${PORT}`);
    console.log(`📋  Visit http://localhost:${PORT}/ for all available endpoints\n`);
  });