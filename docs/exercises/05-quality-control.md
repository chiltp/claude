# Exercise 5: "Quality Control"

**Station:** 4 — The Tasting Counter
**Goal:** Verify work before shipping
**Time:** 20-30 minutes
**Where:** VS Code terminal

---

## What you'll learn

- How to ask Claude to write tests
- The review-fix-verify loop
- How to find edge cases

## Before you start

You should have the HTTP server with `/stats`, `/logs` endpoints from previous exercises. Start Claude Code:

```bash
claude
```

---

## Steps

### Step 1: Write tests

```
Write tests for the HTTP server using Node's built-in test runner (node:test and node:assert).

Test these endpoints:
- GET / — should return 200 with a welcome message
- GET /health — should return 200 with { "status": "ok" }
- POST /echo — should return the same JSON body sent to it
- GET /stats — should return request counts
- GET /logs — should return recent request log entries
- GET /logs?limit=2 — should respect the limit parameter

Put the tests in test/server.test.js.
Explain the test patterns you're using since I'm learning JavaScript.
```

**JS concepts Claude should explain:**
- How `describe` and `it` work (grouping and naming tests)
- What `assert.strictEqual` vs `assert.deepStrictEqual` means
- How to make HTTP requests in tests (using Node's `http` module)
- What `async/await` means (a way to wait for things that take time, like network requests)

### Step 2: Run the tests

```bash
node --test test/server.test.js
```

Some tests might fail. That's normal and actually valuable — it shows you what's not working.

If tests fail:

```
These tests are failing: [paste the error output]. Can you fix them?
```

Let Claude debug. Watch how it reads error messages and traces issues.

### Step 3: Ask for a review

```
Review all the code we've written in this project. Are there any bugs, code smells, or improvements you'd suggest?
```

Claude will go through the codebase and list issues. Don't fix everything — just the actual bugs and anything that would cause problems.

**Alternative:** Try `/review` for a more structured review format.

### Step 4: Hunt for edge cases

```
What edge cases should we handle that we're not handling yet? Think about:
- What if someone sends a GET to /echo instead of POST?
- What if the JSON body is malformed?
- What if someone requests a route that doesn't exist?
- What if the server gets 1000 requests per second?
```

Pick 2-3 edge cases that matter and ask Claude to fix them:

```
Handle the "malformed JSON" and "wrong method for /echo" cases. Add tests for them too.
```

### Step 5: Re-run tests

```bash
node --test test/server.test.js
```

All tests should pass now. If not, iterate with Claude until they do.

---

## What to log in your Surprise Journal

- Did Claude's tests catch any real bugs?
- Were the edge cases Claude found surprising?
- How did the review-fix-verify loop feel?

---

## Next: Exercise 6 — "Box It Up"
