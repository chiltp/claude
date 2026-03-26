# Exercise 6: "Box It Up"

**Station:** 5 — The Display Window
**Goal:** Commit and prepare to ship
**Time:** 15-20 minutes
**Where:** VS Code terminal

---

## What you'll learn

- How to use git with Claude Code
- Clean commit practices
- How to create a PR description

## Before you start

You should have the complete HTTP server with tests from previous exercises. Start Claude Code:

```bash
claude
```

---

## Steps

### Step 1: Check what's changed

```
/diff
```

This opens an interactive diff viewer showing all your uncommitted changes. Scroll through and review — do you understand every change?

You can also ask:

```
Summarize all the changes we've made to this project
```

### Step 2: Create a branch

```
Create a new git branch called "http-server-feature" and switch to it
```

**JS concept — git branches:** A branch is like a separate prep table. You can make changes without affecting the "main" version. When you're happy with your changes, you merge the branch back.

### Step 3: Commit with Claude

Try two approaches:

**Approach A: Natural language**
```
Commit all these changes with a good commit message that describes what we built
```

**Approach B: Slash command**
```
/commit
```

Both work. The slash command is faster for routine commits.

Notice how Claude writes the commit message — it reads the diff and summarizes what changed and why. This is much faster than writing commit messages manually.

### Step 4: Practice multiple commits

If you have a lot of changes, it's often better to make several small commits than one big one. Ask Claude:

```
Can we split these changes into logical commits? Maybe one for the server, one for the features, and one for the tests?
```

Claude will suggest how to group the changes and help you commit each group separately.

### Step 5: Write a PR description

Even if you don't have a GitHub remote, practice the PR workflow:

```
Write a pull request description for this branch. Include:
- What we built and why
- How to test it
- Any known limitations
```

Review the description Claude writes. Would a teammate understand what this PR does?

---

## What to log in your Surprise Journal

- Was Claude's commit message better or worse than what you'd write?
- Did the multi-commit approach feel useful?
- Was the PR description accurate?

---

## Congratulations! You've completed the Daily Bread tier (Stations 0-5).

At this point, you have the core Claude Code workflow down. Try using these skills on a real project you care about before moving to the Specialty Pastries tier.

---

## Next: Exercise 7 — "Set Your Timers" (Specialty Pastries tier)
