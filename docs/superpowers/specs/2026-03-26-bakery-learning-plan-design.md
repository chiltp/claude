# The Bakery Handbook: A Pastries-Themed Guide to Claude Code

## Overview

A learning plan that teaches Claude Code workflows through a bakery metaphor. The user is the head baker (decision-maker), Claude Code is the sous-chef (executor). The goal is not to learn individual tools but to learn how to run the kitchen.

**Target learner:** JavaScript developer comfortable with code and CLI, new to AI-assisted development. Completing the [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) Skilljar course in parallel.

## Deliverables

1. **The Bakery Guide** (`docs/learning-plan.md`) — Reference document covering 8 workflow stations
2. **The Bake-Off Exercises** — Progressive hands-on exercises using a Node.js sample project
3. **Surprise Journal template** (`docs/surprise-journal.md`) — A log for the learner to track unexpected Claude Code behaviors (good and bad) to build intuition faster

## Constraints

- All sample code in JavaScript (Node.js, CommonJS)
- No external dependencies — Node.js built-ins only
- Delete the existing task tracker files; build new sample project as part of the exercises
- Exercises build on each other progressively

---

## The Bakery Guide: 8 Stations

### Station 0: "Know Your Kitchen" (How Claude Code Works)

**Concept:** Before you bake, understand your oven's heat zones.

Covers:
- Claude Code's architecture: how it reads files (Read, Glob, Grep), runs commands (Bash), and edits code (Edit, Write)
- The context window as your "countertop space" — limited, so you manage what's on it
- How CLAUDE.md acts as your recipe card pinned to the wall — always visible, guides every action
- Tool use: Claude Code picks tools automatically, like a baker reaching for the right utensil

**Key takeaway:** Claude Code is not magic autocomplete. It's an agent that reads, reasons, plans, and acts using specific tools. Understanding this helps you prompt it effectively.

### Station 1: "Mise en Place" (Onboarding & Setup)

**Concept:** A baker lays out all ingredients before starting. You orient Claude Code in a project before asking it to work.

Covers:
- First contact with a new codebase: asking Claude to explore and explain
- Setting up CLAUDE.md with project conventions, architecture decisions, and constraints
- Using `/init` to bootstrap CLAUDE.md
- Reading existing docs, README, and config files

**Key takeaway:** 5 minutes of setup saves hours of Claude Code guessing wrong.

### Station 2: "The Proving Drawer" (Planning & Design)

**Concept:** You don't throw dough in the oven immediately — you let it prove. Think before coding.

Covers:
- Plan mode: when to use it, how to enter/exit
- Asking Claude Code to brainstorm approaches before committing to one
- Comparing "just build it" vs. planning first — when each is appropriate
- Using Claude Code to ask questions about the codebase before changing it

**Key takeaway:** This is the highest-leverage station. Planning with Claude Code before building is where the real efficiency gain happens. For trivial changes, skip it. For anything you'd think about for more than 2 minutes, plan first.

### Station 3: "The Main Oven" (Building Features & Fixing Bugs)

**Concept:** Set the temperature (your prompt), put the dough in (let Claude work), check if it's done (review output).

Covers:
- Writing effective prompts: specific > vague, constraints help
- Multi-turn iteration: refining Claude's output through conversation
- When to accept Claude's approach vs. push back
- Sub-agents: delegating independent subtasks
- Slash commands for common operations

**Key takeaway:** Good prompts are like good recipes — specific about what you want, clear about constraints, flexible about method.

### Station 4: "The Tasting Counter" (Testing & Review)

**Concept:** No bakery ships without tasting. Verify before committing.

Covers:
- Asking Claude to write tests for new code
- Using `/review` to check recent changes
- Asking Claude to find edge cases and potential issues
- The review-fix-verify loop: review output, fix issues, verify the fix

**Key takeaway:** Claude Code is confident but not infallible. Always taste before serving.

### Station 5: "The Display Window" (Committing & Shipping)

**Concept:** Finished pastries go in the window. Ship your verified work.

Covers:
- `/commit` for clean commit messages
- Branch management with Claude Code
- Creating PRs with descriptions
- The full cycle: branch, build, test, commit, PR

**Key takeaway:** Claude Code handles the git ceremony so you can focus on what to ship, not how to ship it.

### Station 6: "The Kitchen Timer" (Hooks & SDK)

**Concept:** Timers buzz when something needs attention. Hooks automate repetitive behaviors.

Covers:
- What hooks are: shell commands that run in response to Claude Code events
- Hook types: PreToolUse, PostToolUse, Notification, etc.
- Defining hooks in `settings.json`
- Practical examples: auto-lint after edits, warn before deletions, log activity
- Gotchas: hooks run as the user (security), blocking vs. non-blocking
- Claude Code SDK intro: using Claude programmatically in JS scripts

**Key takeaway:** Learn this when you notice yourself repeating the same manual step. Not before.

### Station 7: "The Spice Rack" (MCP Servers)

**Concept:** Specialty spice imports that extend your kitchen's capabilities.

Covers:
- What MCP servers are: external tool providers Claude Code can connect to
- When they're worth it vs. overkill
- Connecting an MCP server
- Using MCP tools in conversation
- Examples: filesystem, database, API integrations

**Key takeaway:** MCP servers are powerful but add complexity. Use them when the built-in tools genuinely can't do what you need.

---

## The Bake-Off Exercises

### Learning path structure

Exercises are grouped into two tiers:

- **Tier 1 (Stations 0-5): "Daily Bread"** — Master these first. This is your everyday workflow.
- **Tier 2 (Stations 6-7): "Specialty Pastries"** — Pick these up when you hit a real need.

After each exercise, the learner should try the same workflow on a real project they care about.

### The sample project

Instead of a pre-built project, **Exercise 2 builds the sample project together with Claude Code.** This teaches the learner about Claude's scaffolding capabilities while creating the material for later exercises.

The project: a simple **Node.js HTTP server** (plain `http` module, no frameworks, no deps) with:
- A few routes (`/`, `/health`, `/echo`)
- A simple in-memory data store
- Separated concerns: routing, handlers, data layer
- Multiple files to practice codebase navigation

### Exercise 1: "Taste the Dough" (Station 0 — Understanding the tools)

**Goal:** See how Claude Code explores and understands code.

Steps:
1. Start with the existing task tracker files in the project (before deletion)
2. Ask Claude Code: "Explain this project to me"
3. Observe which tools it uses (Read, Glob, Grep) and in what order
4. Ask: "What would you change about this code?" — observe how it reasons
5. Ask: "What's in my CLAUDE.md?" — understand context management
6. Delete the task tracker files together with Claude Code

**Learns:** Tool use observation, context awareness, how Claude reads code.

### Exercise 2: "Prep Your Station" (Station 1 — Onboarding & building together)

**Goal:** Build a fresh project with Claude Code and set up proper context.

Steps:
1. Ask Claude Code to scaffold a simple Node.js HTTP server (no deps)
2. Watch how it creates files, decides on structure, names things
3. Ask Claude to explain the structure it chose and why
4. Set up CLAUDE.md together — practice `/init`, then customize
5. Ask Claude to trace a request through the code: "What happens when GET /echo is called?"

**Learns:** Project scaffolding, CLAUDE.md setup, codebase onboarding.

### Exercise 3: "Plan the Menu" (Station 2 — Planning)

**Goal:** Experience the difference between planning and jumping in.

Steps:
1. Feature request: "Add a `/stats` endpoint that returns request counts per route"
2. First attempt: ask Claude to just build it (no planning) — note the result
3. Undo the changes
4. Second attempt: enter plan mode, discuss the approach, consider where to store state, then build
5. Compare the two results

**Learns:** Plan mode, when planning matters, prompting for design discussion.

### Exercise 4: "Bake a Batch" (Station 3 — Building)

**Goal:** Practice multi-turn feature development with effective prompting.

Steps:
1. Feature request: "Add a `/logs` endpoint that stores and returns the last 50 requests with timestamps"
2. Start with a vague prompt, then iterate with more specific instructions
3. Practice: "That's close but I want X instead of Y" refinement
4. Try breaking it into subtasks and see how Claude handles each
5. Observe how conversation context affects output quality

**Learns:** Prompt iteration, specificity, multi-turn development.

### Exercise 5: "Quality Control" (Station 4 — Testing & review)

**Goal:** Verify work before shipping.

Steps:
1. Ask Claude to write tests for the `/stats` and `/logs` features (using Node's built-in `node:test` and `node:assert`)
2. Run the tests — fix any failures with Claude
3. Use `/review` to review all changes since the project was created
4. Ask Claude: "What edge cases am I missing?"
5. Fix any issues found, re-run tests

**Learns:** Test writing, the review-fix-verify loop, edge case discovery.

### Exercise 6: "Box It Up" (Station 5 — Git workflow)

**Goal:** Commit and prepare to ship.

Steps:
1. Initialize git (if not already), create a branch
2. Use `/commit` to commit with a good message
3. Practice: ask Claude to create a PR description
4. Review the commit history and PR — would a teammate understand this?

**Learns:** Git workflow with Claude Code, clean commits, PR creation.

### Exercise 7: "Set Your Timers" (Station 6 — Hooks)

**Goal:** Automate a repetitive behavior.

Steps:
1. Set up a PostToolUse hook that runs tests after any file write
2. Set up a PreToolUse hook that warns before deleting files
3. Observe how hooks fire during normal Claude Code usage
4. Gotcha exercise: try a hook that takes too long — see what happens
5. SDK intro: write a small JS script that sends a prompt to Claude and prints the response

**Learns:** Hook configuration, practical automation, SDK basics.

### Exercise 8: "Import Spices" (Station 7 — MCP)

**Goal:** Extend Claude Code's capabilities.

Steps:
1. Discuss: when would the built-in tools not be enough?
2. Connect a simple MCP server (e.g., a filesystem or custom one)
3. Use an MCP tool in conversation
4. Disconnect it and discuss: was it worth the setup?

**Learns:** MCP server connection, practical evaluation of when to use them.

---

## Surprise Journal

A simple markdown file (`docs/surprise-journal.md`) with a template:

```
## Date — Station/Exercise

**What happened:**
**Expected:**
**Actual:**
**Lesson:**
```

The learner fills this in as they go. It accelerates intuition-building about when to trust Claude Code vs. when to steer it.

---

## File structure

After implementation, the project should look like:

```
claude/
  docs/
    learning-plan.md          # The Bakery Guide (reference)
    surprise-journal.md       # Surprise Journal template
    exercises/
      01-taste-the-dough.md   # Exercise instructions
      02-prep-your-station.md
      03-plan-the-menu.md
      04-bake-a-batch.md
      05-quality-control.md
      06-box-it-up.md
      07-set-your-timers.md
      08-import-spices.md
  src/                        # Will be rebuilt in Exercise 2
  CLAUDE.md                   # Updated during exercises
  package.json                # Updated during exercises
```

The existing `src/index.js`, `src/tasks.js`, `src/CLAUDE.md`, and `data/tasks.json` will be deleted as part of Exercise 1, then new files built in Exercise 2.

---

## Out of scope

- Teaching JavaScript fundamentals (learner is already proficient)
- Covering every Claude Code feature exhaustively (this is workflow-focused)
- Building a production application (sample project is for learning only)
- IDE integrations (VS Code, JetBrains) — focus is on CLI
