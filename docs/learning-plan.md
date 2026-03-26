# The Bakery Handbook: A Pastries-Themed Guide to Claude Code

Welcome to the bakery! This guide teaches you Claude Code workflows through a bakery metaphor.

**You** are the head baker — you make decisions, set direction, and judge quality.
**Claude Code** is your sous-chef — it reads recipes, preps ingredients, does the heavy lifting, and suggests ideas. But you run the kitchen.

## How to use this guide

- **Read a station** to understand the workflow concept
- **Do the matching exercise** in `docs/exercises/` to practice it hands-on
- **Log surprises** in `docs/surprise-journal.md` to build intuition
- Stations 0-5 are your **Daily Bread** — master these first
- Stations 6-7 are **Specialty Pastries** — learn when you need them

## Quick reference: Where to find things

| What you want | Where to look |
|---|---|
| All slash commands | Type `/` in Claude Code |
| Keyboard shortcuts | Press `Ctrl+?` or type `/help` |
| Your project rules | `CLAUDE.md` in project root |
| Claude Code settings | `~/.claude/settings.json` (global) or `.claude/settings.json` (project) |
| MCP server config | `.mcp.json` or `/mcp` command |
| Hook config | `.claude/settings.json` under `"hooks"` |

---

## Station 0: "Know Your Kitchen" — How Claude Code Works

> *Before you bake, understand your oven's heat zones.*

### The big picture

Claude Code is not autocomplete. It's an **agent** — a program that can read your files, think about what to do, run commands, and edit code. Think of it as a sous-chef who can:

1. **Look around the kitchen** (read files, search code)
2. **Think about what to cook** (reason about your request)
3. **Prep and cook** (write code, run commands)
4. **Taste and adjust** (check output, fix errors)

### The tools (your sous-chef's utensils)

Claude Code has specific tools it reaches for automatically — like a baker grabbing a whisk vs. a spatula depending on the task:

| Tool | What it does | Bakery analogy |
|------|-------------|----------------|
| `Read` | Reads a file's contents | Reading a recipe card |
| `Glob` | Finds files by name pattern (e.g., `*.js`) | Scanning the pantry shelves |
| `Grep` | Searches inside files for text | Looking for "sugar" across all recipes |
| `Edit` | Changes specific parts of a file | Tweaking a recipe ("use 2 cups, not 3") |
| `Write` | Creates or overwrites a file | Writing a brand new recipe card |
| `Bash` | Runs terminal commands | Using kitchen equipment (oven, mixer) |
| `Agent` | Spawns a helper with its own focus | Sending an apprentice to prep a side dish |
| `WebFetch` | Fetches content from a URL | Ordering specialty ingredients online |
| `WebSearch` | Searches the web | Looking up a technique you've never tried |

**JS concept — what "tools" means here:** In programming, a "tool" is a function that Claude Code can call. When you ask "find all files with errors," Claude Code decides to call the `Grep` tool with a search pattern. You'll see these tool names in the output as Claude works.

### The countertop (context window)

Your kitchen counter has limited space. Claude Code's **context window** is the same — it can only "see" so much at once (about 200,000 tokens, roughly 150,000 words).

What's on the counter at all times:
- Your **CLAUDE.md** file (pinned recipe card — always visible)
- The **conversation** so far (your back-and-forth with Claude)
- **Tool results** (files Claude read, command outputs)

When the counter gets full, Claude Code **compacts** — it summarizes older conversation to free up space, like clearing finished dishes to make room. You can also do this manually with `/compact`.

**Tips for managing your counter:**
- `/context` — see how full your counter is (shows a visual grid)
- `/compact` — manually compress conversation
- `/clear` — wipe the counter clean and start fresh
- Keep CLAUDE.md focused — everything in it takes up counter space every turn

### CLAUDE.md — your recipe card on the wall

`CLAUDE.md` is a special file that Claude Code reads at the start of every conversation. It's like a recipe card pinned to the bakery wall — always visible, always followed.

Put in it:
- Project conventions ("we use CommonJS, not ES modules")
- Architecture decisions ("tasks.js handles data, index.js handles UI")
- Rules ("no external dependencies")
- File structure notes

You can create it manually, or use `/init` to generate one. You can also have:
- `~/.claude/CLAUDE.md` — personal rules for all projects
- `.claude/rules/` — organized rules by folder

### Permission modes (oven temperature settings)

Claude Code asks permission before doing risky things. You control how much it asks:

| Mode | What Claude can do freely | Toggle with |
|------|--------------------------|-------------|
| **Default** | Read files only | (starting mode) |
| **Accept Edits** | Read + edit files | `Shift+Tab` |
| **Plan** | Read only (research mode) | `Shift+Tab` or `/plan` |
| **Auto** | Everything (with safety checks) | `Shift+Tab` |

**`Shift+Tab`** cycles through modes. Start with Default, move to Accept Edits as you get comfortable.

### VS Code integration

Claude Code works in two places:
- **Terminal** — run `claude` in VS Code's integrated terminal
- **Extension panel** — the Claude Code sidebar in VS Code

Both connect to the same Claude. The terminal gives you more control; the panel is more visual. Use whichever feels natural, or both.

### Feature reference: Station 0

<details>
<summary>All tools Claude Code uses</summary>

| Tool | Permission needed? | Description |
|------|---|---|
| Read | No | Read file contents |
| Glob | No | Find files by name pattern |
| Grep | No | Search file contents |
| Edit | Yes | Modify specific parts of files |
| Write | Yes | Create or overwrite files |
| Bash | Yes | Run shell commands |
| Agent | No | Spawn a sub-agent with its own context |
| WebFetch | Yes | Fetch content from a URL |
| WebSearch | Yes | Search the web |
| NotebookEdit | Yes | Edit Jupyter notebook cells |
| TaskCreate/Update/List | No | Manage task tracking |
| Skill | Yes | Execute a skill/command |
| ToolSearch | No | Load deferred tool definitions |

</details>

<details>
<summary>Key keyboard shortcuts</summary>

| Shortcut | What it does |
|----------|-------------|
| `Ctrl+C` | Cancel current generation |
| `Ctrl+L` | Clear terminal screen |
| `Shift+Tab` | Cycle permission modes |
| `Esc` + `Esc` | Rewind to previous state |
| `Ctrl+R` | Search command history |
| `Option+P` (Mac) | Switch model |
| `Option+T` (Mac) | Toggle extended thinking |
| `Option+O` (Mac) | Toggle fast mode |
| `\` + `Enter` | New line in prompt |

</details>

<details>
<summary>Key slash commands for this station</summary>

| Command | What it does |
|---------|-------------|
| `/help` | Show all commands |
| `/context` | Visualize context usage |
| `/compact` | Compress conversation |
| `/clear` | Clear conversation history |
| `/status` | Show version, model, account info |
| `/cost` | Show token usage and cost |
| `/doctor` | Diagnose installation issues |

</details>

---

## Station 1: "Mise en Place" — Onboarding & Setup

> *A baker lays out all ingredients before starting. Orient Claude Code before asking it to work.*

### Why setup matters

If you ask Claude Code to "add a feature" without context, it's like telling a new chef "make something good" without showing them the kitchen. It might work, but it'll guess wrong about conventions, file structure, and patterns.

5 minutes of setup saves hours of corrections.

### Step 1: Explore the codebase

When you open a new project, start by asking Claude Code to look around:

```
Explain this project to me — what does it do, how is it structured, and what conventions does it follow?
```

Watch what Claude does: it will use `Glob` to find files, `Read` to examine them, maybe `Grep` to search for patterns. This is your sous-chef surveying the kitchen.

### Step 2: Set up CLAUDE.md

Two options:

**Option A: Auto-generate with `/init`**
Type `/init` and Claude Code will explore your project and create a CLAUDE.md for you. Review and customize it.

**Option B: Write it yourself**
Create a `CLAUDE.md` file in your project root with:
- What the project does (one sentence)
- File structure overview
- Conventions (language, style, patterns)
- How to run/test things

Example:
```markdown
# My HTTP Server

A simple Node.js HTTP server for learning Claude Code.

## Structure
- src/server.js — main server, routing
- src/handlers.js — request handlers
- src/store.js — in-memory data store

## Conventions
- CommonJS (require/module.exports)
- No external dependencies
- Run with: node src/server.js
```

### Step 3: Trace a request

Once Claude knows your project, test its understanding:

```
What happens when a GET request hits /health? Trace it through the code.
```

If Claude can accurately trace the flow, your setup is good. If it gets confused, your CLAUDE.md might need more detail.

### VS Code tip

In VS Code, you can right-click a file in the explorer and select "Add to Claude Context" to quickly share it. You can also use `@filename` in the Claude panel to reference specific files.

### Feature reference: Station 1

<details>
<summary>Setup commands</summary>

| Command | What it does |
|---------|-------------|
| `/init` | Auto-generate CLAUDE.md from project analysis |
| `/memory` | View and edit CLAUDE.md files |
| `/add-dir <path>` | Add another directory to the session |

</details>

<details>
<summary>Context files</summary>

| File | Purpose |
|------|---------|
| `CLAUDE.md` (project root) | Project-level instructions, always loaded |
| `~/.claude/CLAUDE.md` | Personal rules for all projects |
| `.claude/rules/` | Organized rules by directory path |
| `.claudeignore` | Exclude files from Claude's view (like .gitignore) |

</details>

---

## Station 2: "The Proving Drawer" — Planning & Design

> *You don't throw dough in the oven immediately — you let it prove. Think before coding.*

### Why plan first?

When you ask Claude Code to "just build it," it picks the first reasonable approach and runs with it. Sometimes that's fine. But for anything non-trivial, you get better results by thinking together first.

Planning is the highest-leverage Claude Code skill. It's the difference between a baker who dumps ingredients in a bowl vs. one who reads the recipe, checks what's in the pantry, and thinks about timing.

### Plan mode

Plan mode makes Claude Code read-only — it can explore and think, but not edit files. This is useful when you want to discuss an approach before committing to it.

**How to enter plan mode:**
- Type `/plan` followed by your question
- Or press `Shift+Tab` until you see "plan" mode
- Or type: "Let's plan this before building — don't write code yet"

**How to exit:**
- Claude presents its plan and offers options: auto mode, accept edits, or review each change
- Or press `Shift+Tab` to switch to a different mode

### When to plan vs. when to just build

| Just build it | Plan first |
|---|---|
| One-line fix | New feature spanning multiple files |
| Rename a variable | Architecture decisions |
| Add a simple log statement | Anything you'd think about for 2+ minutes |
| Copy an existing pattern | Unfamiliar part of the codebase |

### How to plan effectively

**Bad planning prompt:**
```
Plan how to add a stats endpoint
```

**Good planning prompt:**
```
I want to add a /stats endpoint that returns request counts per route.
Before building, let's discuss:
- Where should we store the count data?
- Should it persist across restarts or be in-memory only?
- What should the response format look like?
```

The more specific your questions, the more useful the plan.

### Feature reference: Station 2

<details>
<summary>Plan mode commands</summary>

| Command/Shortcut | What it does |
|---------|-------------|
| `/plan [description]` | Enter plan mode with optional topic |
| `Shift+Tab` | Cycle modes (default → acceptEdits → plan → auto) |
| `/effort high` or `/effort max` | Make Claude think harder (slower but better for complex planning) |
| `Option+T` (Mac) | Toggle extended thinking mode |

</details>

---

## Station 3: "The Main Oven" — Building Features & Fixing Bugs

> *Set the temperature (your prompt), put the dough in (let Claude work), check if it's done (review output).*

### The build loop

Most of your time with Claude Code follows this cycle:

1. **You prompt** — describe what you want
2. **Claude works** — reads files, writes code, runs commands
3. **You review** — check the output, accept or redirect
4. **Repeat** — refine until it's right

### Writing effective prompts

Prompts are like recipes — the more specific, the better the result.

**Vague (underbaked):**
```
Add logging
```

**Specific (perfectly baked):**
```
Add a /logs endpoint that:
- Stores the last 50 requests in memory (method, path, timestamp)
- Returns them as a JSON array, newest first
- Don't use any external dependencies
```

**Prompt tips:**
- State what you want, not how to do it (let Claude choose the approach)
- Include constraints ("no external deps," "use existing patterns")
- Mention files if relevant ("modify src/handlers.js")
- Say what "done" looks like ("should return JSON with these fields")

### Multi-turn refinement

You don't have to get the prompt perfect on the first try. Claude Code remembers the conversation:

```
You: Add a /logs endpoint that stores recent requests
Claude: [writes code]
You: That's close, but I want it to cap at 50 entries, not 100
Claude: [updates code]
You: Also format the timestamps as ISO strings
Claude: [updates code]
```

Each turn builds on the last. This is like adjusting seasoning as you taste.

### When to push back

Claude Code is confident. Sometimes too confident. Push back when:
- The approach feels overcomplicated for what you asked
- It added things you didn't request (extra error handling, logging, comments)
- It changed files you didn't expect
- Something doesn't feel right (trust your instincts)

Say things like:
- "That's more complex than I need. Simpler please."
- "Why did you change server.js? I only asked about handlers.js."
- "Undo that last change and try a different approach."

### Sub-agents

For bigger tasks, Claude Code can spawn **sub-agents** — apprentice bakers who work on a specific subtask with their own focus. You don't need to manage this manually; Claude decides when to delegate. But you can suggest it:

```
This has two independent parts — the data store and the endpoint. Can you work on them separately?
```

### JS concept — CommonJS modules

You'll see this pattern in Node.js code:

```javascript
// Importing (like getting ingredients from the pantry)
const http = require('http');           // Built-in Node.js module
const { handler } = require('./handlers'); // Your own file

// Exporting (like putting finished dishes on the pass)
module.exports = { myFunction };
// or
module.exports = myFunction;
```

`require()` loads code from another file. `module.exports` makes code available to other files. This is called **CommonJS** — the original Node.js module system.

### Feature reference: Station 3

<details>
<summary>Key slash commands for building</summary>

| Command | What it does |
|---------|-------------|
| `/diff` | Show uncommitted changes and per-turn diffs |
| `/cost` | Check how much this session has cost |
| `/compact` | Free up context space during long sessions |
| `/clear` | Start a fresh conversation (keeps files) |
| `/effort [level]` | Adjust reasoning depth (low/medium/high/max) |
| `/fast` | Toggle faster responses |

</details>

<details>
<summary>Useful shortcuts while building</summary>

| Shortcut | What it does |
|----------|-------------|
| `Ctrl+C` | Stop Claude mid-generation |
| `Esc` + `Esc` | Undo Claude's changes (rewind) |
| `Ctrl+B` | Send a running task to background |
| `Shift+Tab` | Switch permission mode |
| `\` + `Enter` | Multi-line input |

</details>
