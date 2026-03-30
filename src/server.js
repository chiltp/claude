const http = require('http');
const { route } = require('./router');

const PORT = 3000;

const server = http.createServer(route);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
