const { handleHome, handleHealth, handleEcho, handleNotFound, handleStats, trackRequest } = require('./handlers');
const { recordRequest, getLogs } = require('./logger');

function route(req, res) {
  const parsed = new URL(req.url, 'http://localhost');
  const { method } = req;
  const pathname = parsed.pathname;

  recordRequest(method, pathname, res);

  if (method === 'GET' && pathname === '/stats') {
    return handleStats(req, res);
  }

  trackRequest(method, pathname);

  if (method === 'GET' && pathname === '/') {
    return handleHome(req, res);
  }

  if (method === 'GET' && pathname === '/health') {
    return handleHealth(req, res);
  }

  if (method === 'POST' && pathname === '/echo') {
    return handleEcho(req, res);
  }

  if (method === 'GET' && pathname === '/logs') {
    const limit = parseInt(parsed.searchParams.get('limit'), 10) || 50;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getLogs().slice(0, limit)));
  }

  handleNotFound(req, res);
}

module.exports = { route };
