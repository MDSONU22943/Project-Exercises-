const http=require('http')

const hostname='localhost'
const port=3000

const server = http.createServer((req,res)=>{
    const url=req.url.toLowerCase() || '/'

    if(url==='/'){
        res.statusCode=200
        res.setHeader('Content-Type','text/plain')
        res.end('Welcome to the Home Page')
    }


    else if(url==='/html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Node.js Says Hi</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 100px; background: #f0f4f8; }
                    h1   { color: #2c3e50; }
                    p    { font-size: 1.3rem; color: #7f8c8d; }
                </style>
            </head>
            <body>
                <h1>Hello, Browser! 🌐</h1>
                <p>Powered by your own Node.js server 😎</p>
            </body>
            </html>
        `);
    }

    else if(url==='/json'){
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({message:'Hello, JSON!'}))
    }

    else{
        res.statusCode=404
        res.setHeader('Content-Type','text/plain')
        res.end('404 Not Found')
    }
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})