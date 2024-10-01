const http = require('http');

const PORT = 3000;

http.createServer((req, res) => {
  // console.log("A simple and innocent console log :3")
  
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.end('GET request - Hello from GET!\n');
  } else if (req.method === 'POST') {
    res.statusCode = 200;
    res.end('POST request - Hello from POST!\n');
  } else {
    res.statusCode = 405;
    res.end('Method not allowed\n');
  }
}).listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});