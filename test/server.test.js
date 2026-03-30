const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { route } = require('../src/router');

// --- Helper function ---
// This makes an HTTP request and returns a Promise.
// Promises + async/await let us write asynchronous code (like network requests)
// in a way that reads top-to-bottom, instead of nesting callbacks.
function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,       // Use 3001 so tests don't clash with a running server on 3000
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// --- Test setup ---
// before() runs once before all tests — we start the server.
// after() runs once after all tests — we shut it down.
// This way each test talks to a real running server.
let server;

before(() => {
  return new Promise((resolve) => {
    server = http.createServer(route);
    server.listen(3001, resolve);
  });
});

after(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

// --- Tests ---

// describe() groups related tests together. Think of it like a folder.
// it() is a single test case. Think of it like "it should do X".

describe('GET /', () => {
  it('should return 200 with a welcome message', async () => {
    const res = await makeRequest('GET', '/');

    // assert.strictEqual checks that two values are exactly equal (===)
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.includes('Welcome'));
  });
});

describe('GET /health', () => {
  it('should return 200 with status ok', async () => {
    const res = await makeRequest('GET', '/health');

    assert.strictEqual(res.statusCode, 200);

    // JSON.parse turns a JSON string into a JavaScript object
    const data = JSON.parse(res.body);

    // assert.deepStrictEqual checks that objects have the same structure
    // and values — unlike strictEqual, it compares inside the object,
    // not just whether they're the same reference in memory.
    assert.deepStrictEqual(data, { status: 'ok' });
  });
});

describe('POST /echo', () => {
  it('should return the same JSON body sent to it', async () => {
    const sent = { hello: 'world', number: 42 };
    const res = await makeRequest('POST', '/echo', sent);

    assert.strictEqual(res.statusCode, 200);
    const data = JSON.parse(res.body);
    assert.deepStrictEqual(data, sent);
  });
});

describe('GET /stats', () => {
  it('should return request counts with totalRequests and routes', async () => {
    const res = await makeRequest('GET', '/stats');

    assert.strictEqual(res.statusCode, 200);
    const data = JSON.parse(res.body);

    // Check that the response has the expected shape
    assert.ok(typeof data.totalRequests === 'number');
    assert.ok(typeof data.routes === 'object');
    assert.ok(typeof data.uptime === 'number');
  });
});

describe('GET /logs', () => {
  it('should return an array of recent request log entries', async () => {
    const res = await makeRequest('GET', '/logs');

    assert.strictEqual(res.statusCode, 200);
    const data = JSON.parse(res.body);

    // Array.isArray checks if something is an array (not just any object)
    assert.ok(Array.isArray(data));
    assert.ok(data.length > 0);

    // Check that each log entry has the fields we expect
    const entry = data[0];
    assert.ok('method' in entry);
    assert.ok('path' in entry);
    assert.ok('timestamp' in entry);
    assert.ok('status' in entry);
  });

  it('should respect the limit query parameter', async () => {
    // Make a few requests first to ensure there are enough log entries
    await makeRequest('GET', '/');
    await makeRequest('GET', '/health');
    await makeRequest('GET', '/');

    const res = await makeRequest('GET', '/logs?limit=2');

    assert.strictEqual(res.statusCode, 200);
    const data = JSON.parse(res.body);
    assert.ok(data.length <= 2);
  });
});
