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
