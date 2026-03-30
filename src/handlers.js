const requestCounts = {};
const startTime = Date.now();

function trackRequest(method, url) {
  const key = `${method} ${url}`;
  requestCounts[key] = (requestCounts[key] || 0) + 1;
}

function handleStats(req, res) {
  const totalRequests = Object.values(requestCounts).reduce((sum, n) => sum + n, 0);
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    totalRequests,
    routes: requestCounts,
    uptime: uptimeSeconds
  }));
}

function handleHome(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to the Node.js HTTP server!');
}

function handleHealth(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
}

function handleEcho(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(body);
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

module.exports = { handleHome, handleHealth, handleEcho, handleNotFound, handleStats, trackRequest };
