const logs = [];
const MAX_ENTRIES = 50;

function recordRequest(method, path, res) {
  const entry = {
    method,
    path,
    timestamp: new Date().toISOString(),
    status: null
  };

  logs.unshift(entry);
  logs.length = Math.min(logs.length, MAX_ENTRIES);

  res.on('finish', () => {
    entry.status = res.statusCode;
  });
}

function getLogs() {
  return logs;
}

module.exports = { recordRequest, getLogs };
