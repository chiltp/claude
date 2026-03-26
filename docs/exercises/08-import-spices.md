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
