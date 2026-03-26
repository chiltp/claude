# The Bakery Handbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a pastries-themed learning guide and hands-on exercises that teach Claude Code workflows to a JavaScript beginner using VS Code.

**Architecture:** Markdown documentation files organized into a reference guide (`docs/learning-plan.md`), 8 exercise files (`docs/exercises/`), and a surprise journal template. The existing task tracker sample files will be deleted and replaced during exercises.

**Tech Stack:** Markdown, Node.js (CommonJS, built-ins only), Claude Code CLI + VS Code extension

---

### Task 1: Create the Surprise Journal template

**Files:**
- Create: `docs/surprise-journal.md`

- [ ] **Step 1: Write the surprise journal file**

```markdown
# Surprise Journal

Track moments where Claude Code did something unexpected — both good and bad. This builds your intuition faster than any tutorial.

## How to use

After each exercise (or anytime during real work), jot down surprises. Review weekly to spot patterns.

---

## Template

Copy this for each entry:

### [Date] — [Station or Exercise name]

**What I did:**
(What you asked Claude Code to do)

**What I expected:**
(What you thought would happen)

**What actually happened:**
(What Claude Code did — better, worse, or just different)

**Lesson:**
(What this tells you about when to trust Claude Code vs. steer it)

---

## My Entries

(Start adding entries below as you work through the exercises)
```

- [ ] **Step 2: Commit**

```bash
git add docs/surprise-journal.md
git commit -m "docs: add surprise journal template for tracking Claude Code learning moments"
```

---

### Task 2: Write the Bakery Guide — Stations 0-1

**Files:**
- Create: `docs/learning-plan.md`

- [ ] **Step 1: Write the guide header and Station 0**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/learning-plan.md
git commit -m "docs: add Bakery Guide with Stations 0-1 (architecture and setup)"
```

---

### Task 3: Write the Bakery Guide — Stations 2-3

**Files:**
- Modify: `docs/learning-plan.md` (append after Station 1)

- [ ] **Step 1: Append Station 2 and Station 3**

Append the following to `docs/learning-plan.md`:

```markdown

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
```

- [ ] **Step 2: Commit**

```bash
git add docs/learning-plan.md
git commit -m "docs: add Bakery Guide Stations 2-3 (planning and building)"
```

---

### Task 4: Write the Bakery Guide — Stations 4-5

**Files:**
- Modify: `docs/learning-plan.md` (append after Station 3)

- [ ] **Step 1: Append Station 4 and Station 5**

Append the following to `docs/learning-plan.md`:

```markdown

---

## Station 4: "The Tasting Counter" — Testing & Review

> *No bakery ships without tasting. Verify before committing.*

### Why test with Claude Code?

Claude Code writes code confidently — but confidence isn't correctness. Like a baker who thinks the soufflé is done because it looks right, Claude's code might have bugs that only show up when you actually run it.

The tasting counter is where you catch problems before they reach customers.

### Writing tests

Ask Claude to write tests for your code:

```
Write tests for the /stats and /logs endpoints using Node's built-in test runner (node:test and node:assert). No external test frameworks.
```

**JS concept — Node.js built-in test runner:**

```javascript
// test/server.test.js
const { describe, it } = require('node:test');  // Built-in test module (Node 18+)
const assert = require('node:assert');           // Built-in assertion module

describe('stats endpoint', () => {
  it('should return request counts', () => {
    const result = getStats();
    assert.strictEqual(typeof result, 'object');
  });
});
```

Run tests with: `node --test test/`

`node:test` and `node:assert` are built into Node.js — no need to install anything. `describe` groups related tests. `it` defines a single test. `assert` checks if things are correct.

### The review-fix-verify loop

This is your quality cycle:

1. **Review** — ask Claude to check the code: "Review the changes we've made" or use the review plugin
2. **Fix** — address any issues Claude finds
3. **Verify** — run tests again to make sure the fixes didn't break anything

```
You: Review the /logs endpoint for edge cases
Claude: [identifies: what if there are no logs yet? what if the request body is malformed?]
You: Good catches. Fix those.
Claude: [adds checks]
You: Run the tests again
Claude: [runs tests — all pass]
```

### Asking for edge cases

Claude is good at finding edge cases you might miss:

```
What edge cases should I handle for the /logs endpoint? Think about:
- Empty states
- Invalid input
- Memory limits
- Concurrent requests
```

### Feature reference: Station 4

<details>
<summary>Testing commands</summary>

| Command | What it does |
|---------|-------------|
| `node --test test/` | Run all tests in the test directory |
| `node --test --watch test/` | Re-run tests when files change |
| `/review` | Review recent changes (via plugin) |
| `/security-review` | Check for security vulnerabilities |

</details>

---

## Station 5: "The Display Window" — Committing & Shipping

> *Finished pastries go in the window. Ship your verified work.*

### The git workflow with Claude Code

Git is how developers save and share their work — like boxing up pastries and putting them in the display window. Claude Code handles most of the git ceremony for you.

**JS concept — git basics (if you're new):**
- **commit** = save a snapshot of your changes with a message
- **branch** = a separate line of work (like a separate prep table)
- **PR (pull request)** = asking teammates to review your changes before merging

### Committing with Claude Code

The simplest way: just ask Claude.

```
Commit these changes with a good message
```

Claude will:
1. Check what's changed (`git diff`)
2. Write a descriptive commit message
3. Create the commit (with your approval)

Or use the `/commit` slash command for a streamlined flow.

### Branching

For bigger features, work on a branch:

```
Create a new branch called "add-stats-endpoint" and switch to it
```

Or if you want Claude to just do the git operations:

```
I'm done with the stats feature. Create a branch, commit everything, and show me what would go in a PR.
```

### Pull requests

If your project has a GitHub remote, Claude can create PRs:

```
Create a pull request for this branch with a good description
```

Claude will write a title and description summarizing the changes.

### The full shipping cycle

1. Create a branch (or work on main for learning)
2. Build and test (Stations 3-4)
3. Review changes: `/diff` to see what's changed
4. Commit: ask Claude or use `/commit`
5. Push and PR (if working with a remote)

### Feature reference: Station 5

<details>
<summary>Git commands</summary>

| Command/Feature | What it does |
|---------|-------------|
| `/diff` | Interactive diff viewer |
| "Commit these changes" | Ask Claude to commit |
| `/branch [name]` | Create a conversation branch |
| `--worktree` / `-w` | Start in an isolated git worktree |
| `/rewind` | Rewind conversation and code to a previous state |

</details>
```

- [ ] **Step 2: Commit**

```bash
git add docs/learning-plan.md
git commit -m "docs: add Bakery Guide Stations 4-5 (testing and shipping)"
```

---

### Task 5: Write the Bakery Guide — Stations 6-7

**Files:**
- Modify: `docs/learning-plan.md` (append after Station 5)

- [ ] **Step 1: Append Station 6 and Station 7**

Append the following to `docs/learning-plan.md`:

```markdown

---

## Station 6: "The Kitchen Timer" — Hooks & SDK

> *Timers buzz when something needs attention. Hooks automate repetitive behaviors.*

### What are hooks?

Hooks are shell commands that run automatically when Claude Code does something — like kitchen timers that buzz at the right moment. They let you automate repetitive checks.

**Example:** Every time Claude edits a file, automatically run your tests. Every time Claude is about to delete a file, show a warning.

### Hook events (when do timers go off?)

| Event | When it fires | Example use |
|-------|-------------|-------------|
| `PreToolUse` | Before Claude uses a tool | Block dangerous commands, warn before deletions |
| `PostToolUse` | After Claude uses a tool | Run tests after file edits, log activity |
| `UserPromptSubmit` | When you hit Enter on a prompt | Validate or transform your input |
| `Notification` | When Claude sends a notification | Handle permission prompts, alerts |
| `SessionStart` | When a session begins | Load environment, set context |
| `Stop` | When Claude finishes responding | Run post-response checks |
| `SubagentStart` / `SubagentStop` | When sub-agents launch/finish | Restrict capabilities, process results |

### Setting up a hook

Hooks live in your settings file. Here's how to add one:

**Method 1: Ask Claude Code**
```
Set up a hook that runs "node --test test/" after any file is written
```

**Method 2: Edit settings manually**

In `.claude/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node --test test/ 2>&1 | tail -5"
          }
        ]
      }
    ]
  }
}
```

**JS concept — JSON (JavaScript Object Notation):**
JSON is a text format for storing structured data. It looks like JavaScript objects but stricter — keys must be in double quotes, no trailing commas. Settings files use JSON because it's easy for both humans and programs to read.

### Hook types

| Type | What it does |
|------|-------------|
| `command` | Runs a shell script, receives JSON input via stdin |
| `prompt` | Asks Claude a yes/no question to decide whether to proceed |

### Gotchas

- **Hooks run as YOU, not as Claude.** They have your full permissions. Be careful with what they do.
- **Slow hooks block Claude.** If a hook takes 30 seconds, Claude waits 30 seconds. Keep them fast.
- **Hooks can block actions.** A `PreToolUse` hook that exits with a non-zero code blocks the tool. Use this for safety gates, but be careful not to block yourself.
- **Test your hooks.** A buggy hook can make Claude Code unusable. Start simple.

### Claude Code SDK (the bakery equipment catalog)

The SDK lets you use Claude programmatically — like buying bakery equipment to build into your own kitchen, rather than relying on the sous-chef.

A basic SDK example in Node.js:

```javascript
// sdk-example.js
// Install first: npm install @anthropic-ai/claude-code
const { claude } = require('@anthropic-ai/claude-code');

async function main() {
  // Send a prompt and get a response
  const response = await claude({
    prompt: 'What is 2 + 2?',
    options: {
      maxTurns: 1
    }
  });

  console.log(response);
}

main();
```

**When to use the SDK:**
- Automating repetitive Claude tasks in scripts
- Building custom tools that use Claude under the hood
- Integrating Claude into CI/CD pipelines

### Feature reference: Station 6

<details>
<summary>Hook events (complete list)</summary>

| Event | Description |
|-------|-------------|
| `SessionStart` | Session begins |
| `UserPromptSubmit` | User submits a prompt |
| `PreToolUse` | Before a tool runs (can block it) |
| `PostToolUse` | After a tool succeeds |
| `PostToolUseFailure` | After a tool fails |
| `Notification` | Notification triggers |
| `SubagentStart` | Sub-agent spawned |
| `SubagentStop` | Sub-agent finishes |
| `Stop` | Claude finishes responding |
| `PreCompact` / `PostCompact` | Before/after context compaction |
| `SessionEnd` | Session ends |

</details>

<details>
<summary>Hook management commands</summary>

| Command | What it does |
|---------|-------------|
| `/hooks` | View all configured hooks |
| `/update-config` | Ask Claude to modify settings.json |
| "Add a hook that..." | Natural language hook setup |

</details>

---

## Station 7: "The Spice Rack" — MCP Servers

> *Specialty spice imports that extend your kitchen's capabilities.*

### What are MCP servers?

MCP (Model Context Protocol) servers are external tools that plug into Claude Code — like importing specialty spices from around the world. They give Claude abilities it doesn't have built in.

**Built-in tools** can read files, run commands, and search code. But what if you need Claude to:
- Query a database?
- Read your Figma designs?
- Access your Gmail?
- Interact with a specific API?

That's what MCP servers are for. Each one adds new "tools" that Claude can use.

### When are MCP servers worth it?

| Use an MCP server when... | Don't bother when... |
|---|---|
| You need to access an external service regularly | You can copy-paste data into Claude manually |
| The integration saves significant time | You only need it once |
| A well-maintained server exists | You'd need to build one from scratch for a minor convenience |

### Connecting an MCP server

**Method 1: Through the Claude Code command**
```
/mcp
```
This opens the MCP management interface where you can add, remove, and configure servers.

**Method 2: Through configuration**

In `.mcp.json` (project root):
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-filesystem"],
      "env": {}
    }
  }
}
```

### Popular MCP servers

| Server | What it adds |
|--------|-------------|
| Figma | Read designs, get design context |
| Gmail | Read and search emails |
| GitHub (via `gh` CLI) | Already built into Claude Code via Bash |
| Filesystem | Extended file operations |
| Notion | Access Notion databases |
| Slack | Read Slack messages |
| Custom servers | Build your own for any API |

### Using MCP tools in conversation

Once connected, MCP tools appear alongside Claude's built-in tools. You don't need to reference them specially — just ask for what you need:

```
What does the design in this Figma file look like?
[paste Figma URL]
```

Claude will automatically use the Figma MCP tools if they're connected.

### Feature reference: Station 7

<details>
<summary>MCP commands</summary>

| Command | What it does |
|---------|-------------|
| `/mcp` | Manage MCP server connections |
| MCP tools appear in tool list | Use normally once connected |
| `.mcp.json` | Project-level MCP configuration |
| `settings.json` → `mcpServers` | User-level MCP configuration |

</details>
```

- [ ] **Step 2: Commit**

```bash
git add docs/learning-plan.md
git commit -m "docs: add Bakery Guide Stations 6-7 (hooks, SDK, MCP servers)"
```

---

### Task 6: Write Exercise 1 — "Taste the Dough"

**Files:**
- Create: `docs/exercises/01-taste-the-dough.md`

- [ ] **Step 1: Create the exercises directory and write Exercise 1**

```bash
mkdir -p docs/exercises
```

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/01-taste-the-dough.md
git commit -m "docs: add Exercise 1 — Taste the Dough (tool observation)"
```

---

### Task 7: Write Exercise 2 — "Prep Your Station"

**Files:**
- Create: `docs/exercises/02-prep-your-station.md`

- [ ] **Step 1: Write Exercise 2**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/02-prep-your-station.md
git commit -m "docs: add Exercise 2 — Prep Your Station (scaffolding and setup)"
```

---

### Task 8: Write Exercise 3 — "Plan the Menu"

**Files:**
- Create: `docs/exercises/03-plan-the-menu.md`

- [ ] **Step 1: Write Exercise 3**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/03-plan-the-menu.md
git commit -m "docs: add Exercise 3 — Plan the Menu (plan mode practice)"
```

---

### Task 9: Write Exercise 4 — "Bake a Batch"

**Files:**
- Create: `docs/exercises/04-bake-a-batch.md`

- [ ] **Step 1: Write Exercise 4**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/04-bake-a-batch.md
git commit -m "docs: add Exercise 4 — Bake a Batch (prompting and iteration)"
```

---

### Task 10: Write Exercise 5 — "Quality Control"

**Files:**
- Create: `docs/exercises/05-quality-control.md`

- [ ] **Step 1: Write Exercise 5**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/05-quality-control.md
git commit -m "docs: add Exercise 5 — Quality Control (testing and review)"
```

---

### Task 11: Write Exercise 6 — "Box It Up"

**Files:**
- Create: `docs/exercises/06-box-it-up.md`

- [ ] **Step 1: Write Exercise 6**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/06-box-it-up.md
git commit -m "docs: add Exercise 6 — Box It Up (git workflow)"
```

---

### Task 12: Write Exercise 7 — "Set Your Timers"

**Files:**
- Create: `docs/exercises/07-set-your-timers.md`

- [ ] **Step 1: Write Exercise 7**

```markdown
# Exercise 7: "Set Your Timers"

**Station:** 6 — The Kitchen Timer
**Goal:** Automate repetitive behaviors with hooks and try the SDK
**Time:** 30-40 minutes
**Where:** VS Code terminal

---

## What you'll learn

- How to configure hooks in settings.json
- Practical automation patterns
- Basics of the Claude Code SDK

## Before you start

You should have the complete HTTP server with tests from previous exercises. Start Claude Code:

```bash
claude
```

---

## Steps

### Step 1: Set up an auto-test hook

Every time Claude edits a file, we want tests to run automatically.

Ask Claude:

```
Set up a hook in .claude/settings.json that runs "node --test test/" after any file is written or edited. Show me the settings file so I can understand the format.
```

Claude will add something like this to `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node --test test/ 2>&1 | tail -5"
          }
        ]
      }
    ]
  }
}
```

**JS concept — JSON structure:**
- `"hooks"` is the top-level key
- `"PostToolUse"` means "after a tool is used"
- `"matcher": "Write|Edit"` means "only for Write or Edit tools" (the `|` means "or")
- `"command"` is the shell command to run
- `2>&1 | tail -5` captures errors and shows only the last 5 lines (to keep output short)

### Step 2: Test the hook

Now make a small change and see the hook fire:

```
Add a comment to src/server.js explaining what the port number is
```

After Claude edits the file, you should see the test results appear automatically. If tests pass, great! If they fail, the hook caught a problem.

### Step 3: Set up a safety hook

Add a hook that warns before Claude deletes any file:

```
Add a PreToolUse hook that prints a warning before any Bash command that contains "rm". The warning should say "WARNING: About to delete files!"
```

Test it:

```
Delete the test file we just created
```

You should see the warning before Claude proceeds.

### Step 4: See the gotcha — slow hooks

Let's see what happens with a slow hook:

```
Add a PostToolUse hook that runs "sleep 5" after every Read. Just temporarily, to see the effect.
```

Now ask Claude to read a file. Notice the 5-second delay. This is why hooks should be fast.

Remove the slow hook:

```
Remove the sleep hook we just added. Keep the test runner and the delete warning hooks.
```

### Step 5: Try the SDK (optional, advanced)

This step requires the Claude Code SDK to be installed. If you want to try it:

```bash
npm install @anthropic-ai/claude-code
```

Then ask Claude:

```
Create a simple script called scripts/ask-claude.js that uses the Claude Code SDK to:
1. Accept a question as a command-line argument
2. Send it to Claude
3. Print the response

Explain how the SDK works as you write it.
```

Try running it:

```bash
node scripts/ask-claude.js "What is Node.js?"
```

**Note:** The SDK uses your existing Claude authentication. If this doesn't work, that's fine — you can explore the SDK later when you have a specific use case.

### Step 6: View all hooks

```
/hooks
```

This shows you all configured hooks. Review them and make sure they make sense.

---

## What to log in your Surprise Journal

- Did the auto-test hook catch anything?
- How did the slow hook feel? Did it change how you think about hook design?
- Would you use hooks in your daily workflow? For what?

---

## Next: Exercise 8 — "Import Spices"
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/07-set-your-timers.md
git commit -m "docs: add Exercise 7 — Set Your Timers (hooks and SDK)"
```

---

### Task 13: Write Exercise 8 — "Import Spices"

**Files:**
- Create: `docs/exercises/08-import-spices.md`

- [ ] **Step 1: Write Exercise 8**

```markdown
# Exercise 8: "Import Spices"

**Station:** 7 — The Spice Rack
**Goal:** Extend Claude Code's capabilities with MCP servers
**Time:** 20-30 minutes
**Where:** VS Code terminal

---

## What you'll learn

- What MCP servers are and when to use them
- How to connect and disconnect an MCP server
- How to evaluate if an MCP server is worth the setup

## Before you start

You should have the complete HTTP server project from previous exercises. Start Claude Code:

```bash
claude
```

---

## Steps

### Step 1: Understand what's already built in

Before adding new tools, understand what Claude Code already has:

```
What tools do you currently have access to? List them all.
```

Claude will list its built-in tools (Read, Write, Edit, Bash, etc.) plus any MCP tools already connected (like Figma or Gmail if you have them configured).

### Step 2: Discuss when MCP servers help

```
I'm building a Node.js HTTP server as a learning project. What MCP servers would be useful for this kind of work? Be honest about which ones are worth the setup and which are overkill.
```

Listen to Claude's assessment. For a simple learning project, most MCP servers are overkill. But Claude should explain when each becomes valuable.

### Step 3: Explore MCP management

```
/mcp
```

This opens the MCP management interface. Explore what's available. You can:
- See connected servers
- Add new ones
- Remove existing ones

### Step 4: Try connecting an MCP server

If you want hands-on practice, the filesystem MCP server is a safe choice:

```
Help me connect the Anthropic filesystem MCP server. Walk me through what it does and how to set it up.
```

If you'd rather not install anything, you can explore a different approach:

```
Show me what an .mcp.json file looks like for a project that uses the filesystem and GitHub MCP servers. Explain each part.
```

### Step 5: Evaluate the trade-off

If you connected an MCP server, try using it:

```
Use the filesystem MCP tools to list what's in the src/ directory
```

Then compare:

```
Now do the same thing with your built-in tools
```

Ask yourself: was the MCP version better? Faster? For many basic tasks, the built-in tools are sufficient. MCP servers shine for things Claude genuinely can't do otherwise (accessing external services, databases, etc.).

### Step 6: Clean up

If you connected an MCP server just for testing, disconnect it:

```
Remove the MCP server we just connected. I only needed it for practice.
```

---

## What to log in your Surprise Journal

- Was any MCP server clearly useful for your work?
- Did the built-in tools handle most of what you needed?
- When would you choose to add an MCP server in the future?

---

## You've completed all 8 exercises!

### What's next?

1. **Use Claude Code on a real project.** Pick something you care about and apply the workflows you've learned.

2. **Review your Surprise Journal.** Look for patterns:
   - What makes Claude Code most helpful? (specific prompts? planning first?)
   - Where does it struggle? (vague requests? complex logic?)
   - What habits save you the most time?

3. **Keep the Bakery Guide as a reference.** Open `docs/learning-plan.md` whenever you forget a command or workflow.

4. **Explore features you haven't tried.** The feature references in each station have many tools and commands we didn't cover in exercises. Try them as you encounter real needs.

Happy baking!
```

- [ ] **Step 2: Commit**

```bash
git add docs/exercises/08-import-spices.md
git commit -m "docs: add Exercise 8 — Import Spices (MCP servers)"
```

---

### Task 14: Final review and cleanup commit

**Files:**
- Review: all files in `docs/`

- [ ] **Step 1: Review the complete file structure**

```bash
find docs/ -type f -name "*.md" | sort
```

Expected output:
```
docs/exercises/01-taste-the-dough.md
docs/exercises/02-prep-your-station.md
docs/exercises/03-plan-the-menu.md
docs/exercises/04-bake-a-batch.md
docs/exercises/05-quality-control.md
docs/exercises/06-box-it-up.md
docs/exercises/07-set-your-timers.md
docs/exercises/08-import-spices.md
docs/learning-plan.md
docs/surprise-journal.md
docs/superpowers/plans/2026-03-26-bakery-learning-plan.md
docs/superpowers/specs/2026-03-26-bakery-learning-plan-design.md
```

- [ ] **Step 2: Verify all exercises reference the correct next exercise**

Read each exercise file and confirm the "Next:" line at the bottom points to the correct next exercise. Verify Exercise 8 has the "You've completed" ending.

- [ ] **Step 3: Verify the learning-plan.md is complete**

Read `docs/learning-plan.md` and confirm it contains all 8 stations (0-7), each with a feature reference section.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A docs/
git commit -m "docs: complete Bakery Handbook — learning guide, 8 exercises, surprise journal"
```
