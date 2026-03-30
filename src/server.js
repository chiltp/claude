const http = require('http');
const { route } = require('./router');

// Port 3000 is where the server listens for incoming HTTP requests
const PORT = 3000;

const server = http.createServer(route);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
