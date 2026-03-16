const http = require('http');

const hostname = 'localhost';
const port = 3000

const homePage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f4f8; }
    h1 { color: #2c3e50; }
    .container { max-width: 700px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Our Website</h1>
    <p>This is the home page.</p>
    <nav>
      <a href="/home">Home</a> | 
      <a href="/about">About</a>
    </nav>
  </div>
</body>
</html>

`

const aboutPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f4f8; }
    h1 { color: #2c3e50; }
    .container { max-width: 700px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>About Us</h1>
    <p>We are learning Node.js routing and HTTP status codes.</p>
    <p>This is a simple educational project.</p>
    <nav>
      <a href="/home">Home</a> | 
      <a href="/about">About</a>
    </nav>
  </div>
</body>
</html>
`;

const notFoundPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page Not Found</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 100px 20px; background: #ffecec; color: #444; }
    h1 { font-size: 5rem; margin: 0; color: #e74c3c; }
    h2 { margin: 20px 0; }
    a { color: #2980b9; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>404</h1>
  <h2>Page Not Found</h2>
  <p>Sorry, the page you're looking for doesn't exist.</p>
  <p><a href="/home">← Go back to Home</a></p>
</body>
</html>
`;

const server = http.createServer((req, res) => {

    const url = req.url.toLowerCase()
    // Basic routing
    if (url === '/home' || url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(homePage);
    }
    else if (url === '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(aboutPage);
    }
    else if (url === '/api/hello') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Hello from API!", time: new Date() }));
    }

    // Redirect example
    else if (url === '/old-home') {
        res.statusCode = 301;
        res.setHeader('Location', '/home');
        res.end();
    }
    else {
        // 404 - Not Found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(notFoundPage);
    }
})

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})