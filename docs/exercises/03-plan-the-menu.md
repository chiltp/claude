# Exercise 3: "Plan the Menu"

**Station:** 2 — The Proving Drawer
**Goal:** Experience the difference between planning and jumping straight in
**Time:** 20-30 minutes
**Where:** VS Code terminal

---

## What you'll learn

- How to use plan mode
- When planning saves time vs. when it's overkill
- How to prompt for design discussion

## Before you start

You should have the HTTP server project from Exercise 2 running. Start Claude Code:

```bash
claude
```

---

## Steps

### Step 1: Build without planning (the "just do it" attempt)

Ask Claude to build a feature with no planning:

```
Add a /stats endpoint that returns request counts per route
```

Let Claude build it. When it's done, look at what it made:
- Where did it store the count data?
- How did it structure the response?
- Did it handle edge cases?

**Take a screenshot or note what it built.** We'll compare later.

### Step 2: Undo the changes

```
Undo all the changes you just made. We're going to try again with a different approach.
```

Or use: `Esc` + `Esc` to rewind to the previous state.

### Step 3: Plan first (the "prove the dough" attempt)

Now enter plan mode:

```
/plan Add a /stats endpoint that returns request counts per route
```

Or type `Shift+Tab` until you see plan mode, then:

```
I want to add a /stats endpoint that returns how many times each route has been called.
Before building, let's discuss:
- Where should we store the count data? In which file?
- Should the counter reset when the server restarts? (in-memory is fine for now)
- What should the JSON response look like? Example format?
- Do we need to count failed requests too?
```

**Have a conversation.** Discuss the options. Ask follow-up questions. When the plan feels solid, tell Claude to build it.

### Step 4: Compare the results

Look at what Claude built with planning vs. without:
- Is the code better organized?
- Did it handle the edge cases you discussed?
- Did it store data where you agreed?

In most cases, the planned version will be cleaner and more aligned with what you actually wanted.

### Step 5: Reflect on when to plan

Ask Claude:

```
Based on what we just did, when should I use plan mode and when should I just ask you to build something directly?
```

Compare Claude's answer with the table in Station 2 of the Bakery Guide.

---

## What to log in your Surprise Journal

- How different were the "just build it" vs. "planned" results?
- Did the planning conversation surface questions you hadn't thought of?
- Was there a moment where Claude's plan was better than what you would have designed?

---

## Next: Exercise 4 — "Bake a Batch"
