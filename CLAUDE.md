# HTTP Server

A simple HTTP server built with Node.js for learning Claude Code.

## Project Structure
- `src/server.js` - Entry point (creates and starts the server on port 3000)
- `src/router.js` - Routes requests to the correct handler based on method and URL
- `src/handlers.js` - Request handler functions for each route

## Routes
- `GET /` - Returns a welcome message (text/plain)
- `GET /health` - Returns `{ "status": "ok" }` (JSON)
- `POST /echo` - Returns whatever JSON body was sent to it

## Conventions
- Use CommonJS (require/module.exports)
- No external dependencies — use Node.js built-ins only (http module)
- Separation of concerns: handlers.js has logic, router.js has routing, server.js has startup

## Running
- Start: `node src/server.js`
- Test: `curl http://localhost:3000/`
