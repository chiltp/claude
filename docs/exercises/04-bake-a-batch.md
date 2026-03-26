# Exercise 4: "Bake a Batch"

**Station:** 3 — The Main Oven
**Goal:** Practice multi-turn feature development with effective prompting
**Time:** 25-35 minutes
**Where:** VS Code terminal

---

## What you'll learn

- How prompt specificity affects output quality
- How to iterate and refine Claude's code
- How conversation context shapes Claude's work

## Before you start

You should have the HTTP server from Exercise 2 with the `/stats` endpoint from Exercise 3. Start Claude Code:

```bash
claude
```

---

## Steps

### Step 1: Start vague (deliberately)

Give Claude a vague prompt on purpose:

```
Add logging to the server
```

See what Claude does. It will make assumptions about what "logging" means. Note:
- What did it build?
- Where did it put the logging code?
- Did it match what you had in mind?

**Don't accept this yet.** Tell Claude:

```
Hold on — that's not quite what I meant. Let me be more specific.
```

### Step 2: Be specific

Now give a detailed prompt:

```
Undo those changes. Instead, I want a /logs endpoint that:
- Records every incoming request (method, path, timestamp as ISO string)
- Stores the last 50 requests in memory (newest first)
- GET /logs returns the array as JSON
- The logging should happen in the router, before the request reaches the handler
- Store the log data in a new file: src/logger.js
```

Compare Claude's response this time. It should be closer to what you want because you gave it clear constraints.

### Step 3: Iterate and refine

Now practice the refinement loop. Ask for small changes:

```
The timestamps look good, but also add the response status code to each log entry
```

Then:

```
Good. Now add a query parameter: GET /logs?limit=10 should return only the last 10 entries. Default to 50 if no limit is given.
```

**JS concept — query parameters:** When you visit `/logs?limit=10`, the `?limit=10` part is a query parameter. In Node.js, you parse it from the URL:

```javascript
const url = new URL(request.url, 'http://localhost');
const limit = parseInt(url.searchParams.get('limit')) || 50;
```

If Claude's code handles this differently, that's OK — there are multiple valid approaches.

### Step 4: Test it manually

Start the server and try:

```bash
node src/server.js &
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/stats
curl http://localhost:3000/logs
curl "http://localhost:3000/logs?limit=2"
kill %1
```

**JS concept — `&` in terminal:** Adding `&` after a command runs it in the background so you can use the same terminal. `kill %1` stops the background job.

### Step 5: Push back on something

Find something in Claude's code that you'd do differently. Maybe:
- A variable name that's unclear
- An approach that feels overcomplicated
- Extra code you didn't ask for

Practice saying:

```
I see you added [thing]. I'd prefer [alternative]. Can you change it?
```

Or:

```
This is more complex than it needs to be. Can you simplify the [specific part]?
```

---

## What to log in your Surprise Journal

- How different was the vague vs. specific prompt result?
- Did the iteration loop feel natural or awkward?
- Did you push back on anything? How did Claude respond?

---

## Next: Exercise 5 — "Quality Control"
