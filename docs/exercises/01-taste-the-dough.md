# Exercise 1: "Taste the Dough"

**Station:** 0 — Know Your Kitchen
**Goal:** See how Claude Code explores and understands code
**Time:** 15-20 minutes
**Where:** VS Code terminal (open with `` Ctrl+` ``)

---

## What you'll learn

- How Claude Code uses tools to read and understand code
- What the context window is and how to manage it
- How CLAUDE.md shapes Claude's behavior

## Before you start

You should have the sample task tracker files in your project:
- `src/index.js` — CLI entry point
- `src/tasks.js` — Task management logic
- `data/tasks.json` — Sample task data
- `CLAUDE.md` — Project instructions

If these don't exist, that's OK — you can start from Exercise 2 instead.

Open VS Code, then open the integrated terminal (`` Ctrl+` ``). Start Claude Code by typing:

```bash
claude
```

---

## Steps

### Step 1: Ask Claude to explore

Type this prompt:

```
Explain this project to me — what does it do, how is it structured, and what are the main files?
```

**Watch what happens.** In the output, you'll see Claude using tools:
- `Glob` — finding files (scanning the pantry)
- `Read` — reading file contents (reading recipe cards)

**Write in your surprise journal:** Did Claude find all the files? Did it understand the project correctly? Did anything surprise you about HOW it explored?

### Step 2: Ask Claude to critique

```
What would you change about this code? Be specific.
```

Watch how Claude reasons about code quality. It might suggest:
- Better error handling
- Clearer naming
- Structural improvements

**Notice:** Claude is confident in its suggestions. Some might be great, some might be unnecessary. You decide what's worth doing — you're the head baker.

### Step 3: Check context awareness

```
What's in my CLAUDE.md? How does it affect your behavior?
```

This shows you that CLAUDE.md is always "on the counter" — Claude can see it without reading it from disk, because it's loaded at session start.

### Step 4: Check your context usage

Type:

```
/context
```

You'll see a visual grid showing how much of the context window is used. After a few prompts, it's probably barely used. This gives you a feel for the "countertop space" concept.

### Step 5: Clean up (preparation for Exercise 2)

```
Delete the src/ directory, the data/ directory, and the LEARNING_NOTES.md file. We're going to build a new project from scratch.
```

Claude will ask for permission before deleting. Review what it's deleting and approve.

**Keep:** `CLAUDE.md`, `package.json`, `docs/` — we'll update these in the next exercise.

---

## What to log in your Surprise Journal

After this exercise, open `docs/surprise-journal.md` and add an entry:

- What tools did Claude use that you didn't expect?
- Did Claude's critique of the code match your own impression?
- How did it feel to watch Claude work vs. doing it yourself?

---

## Next: Exercise 2 — "Prep Your Station"
