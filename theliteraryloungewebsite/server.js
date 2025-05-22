const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // You can change this port if needed

// Main server logic
http.createServer((req, res) => {
  const url = req.url;
  let filePath;
  let contentType = 'text/html'; // Default content type

  console.log(`Request for: ${url}`); // Log incoming requests for debugging

  // Routing logic based on the requested URL
  switch (url) {
    case '/':
      filePath = path.join(__dirname, 'index.html');
      break;
    case '/about':
      filePath = path.join(__dirname, 'about.html');
      break;
    case '/contact':
      filePath = path.join(__dirname, 'contact.html');
      break;
    case '/style.css': // Route to serve the CSS file
      filePath = path.join(__dirname, 'style.css');
      contentType = 'text/css';
      break;
    default:
      // Handle 404 Not Found errors
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
      return; // Exit early for 404
  }

  // Read and serve the determined file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Handle 500 Server Error if file reading fails
      console.error(`Error reading file ${filePath}:`, err); // Log the specific error
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Server Error</h1><p>Sorry, we encountered an error reading the requested file.</p>');
    } else {
      // Serve the file with the correct content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });

}).listen(port, () => {
  // Log message when the server starts successfully
  console.log(`Server running on port ${port} at http://localhost:${port}`);
  console.log(`Access your site at http://localhost:${port}/`);
});