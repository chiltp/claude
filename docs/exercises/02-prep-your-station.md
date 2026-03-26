# Exercise 2: "Prep Your Station"

**Station:** 1 — Mise en Place
**Goal:** Build a fresh project with Claude Code and set up proper context
**Time:** 20-30 minutes
**Where:** VS Code terminal

---

## What you'll learn

- How Claude Code scaffolds new projects
- How to set up CLAUDE.md effectively
- How to verify Claude understands your codebase

## Before you start

After Exercise 1, you should have a clean project with just `CLAUDE.md`, `package.json`, and `docs/`. If you still have old files, ask Claude to remove them first.

Start Claude Code in your VS Code terminal:

```bash
claude
```

---

## Steps

### Step 1: Scaffold a new project

```
Build me a simple HTTP server in Node.js with these requirements:
- Use only the built-in http module (no Express, no external deps)
- Three routes: GET /, GET /health, POST /echo
- / returns a welcome message
- /health returns { "status": "ok" }
- /echo returns whatever JSON body was sent to it
- Separate the code into multiple files: server.js for startup, router.js for routing, handlers.js for request handlers
- Put all source files in src/
- Use CommonJS (require/module.exports)

Explain each file as you create it so I understand what the code does.
```

**Watch what Claude does:**
- It plans the structure (maybe)
- It creates files with `Write`
- It explains as it goes (because you asked)

**JS concepts to look for:** Claude's explanation should cover:
- What `require('http')` does (loads Node's built-in HTTP module)
- What `http.createServer()` does (creates a server that listens for requests)
- What `module.exports` does (makes functions available to other files)
- What a callback is (a function passed to another function, called later)

If Claude doesn't explain these, ask: "Can you explain how the callback in createServer works? I'm new to JavaScript."

### Step 2: Run it

```
How do I start this server?
```

Claude should tell you. Try it:

```bash
node src/server.js
```

Open another terminal tab and test:

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl -X POST http://localhost:3000/echo -H "Content-Type: application/json" -d '{"hello": "world"}'
```

**JS concept — curl:** `curl` is a terminal command that sends HTTP requests. `-X POST` means it's a POST request. `-H` sets a header. `-d` sends data.

Stop the server with `Ctrl+C` in the terminal where it's running.

### Step 3: Update CLAUDE.md

```
Update the CLAUDE.md to reflect this new project. Include the structure, conventions, and how to run/test it.
```

Review what Claude writes. Does it capture the important things? Edit if needed.

**Alternative:** Try `/init` to see how Claude auto-generates CLAUDE.md, then compare with what you'd write.

### Step 4: Test Claude's understanding

```
What happens when a POST request hits /echo? Trace it through the code, starting from server.js.
```

If Claude accurately traces the flow (server.js → router.js → handlers.js → response), your setup is solid. If it gets confused, your code or CLAUDE.md might need adjustments.

### Step 5: Try a cold start

Clear the conversation to simulate a new session:

```
/clear
```

Now ask:

```
What is this project and how do I run it?
```

Claude should be able to answer from CLAUDE.md alone. If it can't, your CLAUDE.md needs more detail.

---

## What to log in your Surprise Journal

- How did Claude's file structure compare to what you would have chosen?
- Did Claude explain JS concepts clearly enough for you?
- Did the `/clear` test reveal anything missing from CLAUDE.md?

---

## Next: Exercise 3 — "Plan the Menu"
