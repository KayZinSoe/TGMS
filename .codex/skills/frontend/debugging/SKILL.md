---
name: debugging
description: 
  Activate whenever the user reports or asks to fix a frontend problem,
  including errors, failed builds, runtime exceptions, blank pages, broken
  rendering, broken buttons/interactions, routing/navigation problems,
  JavaScript/TypeScript errors, CSS/styling problems, API data not rendering,
  failing frontend tests, lint/type-check failures, asset loading problems,
  startup failures, environment/configuration issues, or vague reports such
  as "the page doesn't work" or "the app is broken".

  When activated, inspect the project autonomously, identify the relevant
  frontend execution path, determine the root cause from evidence, implement
  the smallest appropriate fix, and verify the result.
---

# Frontend Debugging

## Activation

This skill is active when the user's request describes a frontend
problem that needs investigation or fixing.

Treat the user's natural-language problem report as the bug report.
Do not require the user to identify a file, component, route, error stack,
or framework.

Examples that MUST activate this skill:

- "the page is blank"
- "the app crashes when I start it"
- "login doesn't work"
- "the button does nothing"
- "the dashboard crashes"
- "the page isn't loading"
- "the API data isn't showing"
- "the CSS is broken"
- "the route doesn't work"
- "the build is failing"
- "fix this React error"
- "my Vue component isn't rendering"

Examples that normally should NOT activate this skill:

- "Explain how React hooks work."
- "What is TypeScript?"
- "Write a React component for me."
- "How does CSS grid work?"

If the request both asks for implementation and reports a bug,
the debugging portion takes precedence.

## Activation Verification

When this skill is activated, follow the debugging workflow below.
Do not merely provide generic debugging advice.

Evidence of activation should be observable through actions:
- inspect the project
- identify the framework and build tool
- locate the relevant source code
- inspect relevant configuration/dependencies
- reproduce the issue when possible
- make a targeted fix when sufficient evidence exists
- verify the fix

Do not claim that the skill was activated merely because the request
looks like a debugging request. Demonstrate activation through the
investigation and verification work.

## Process

1. Treat the user's free-text message as the initial symptom report.
2. Extract the expected and actual behavior.
3. If either is unclear, infer it from the project where possible.
4. Inspect the project structure.
5. Identify the frontend framework, entry point, build tool, and commands.
6. Search for the relevant route, component, function, or execution path.
7. Reproduce the problem when possible.
8. Inspect terminal output, browser errors, network failures, and tests.
9. Trace the execution path to the failure.
10. Form hypotheses based on evidence.
11. Test those hypotheses.
12. Identify the most likely root cause.
13. Implement the smallest appropriate fix.
14. Run relevant verification.
15. Reproduce the original problem again when practical.
16. Check for obvious regressions.
17. Report the result.

## Investigation Rules

- Do not guess when evidence can be obtained.
- Do not ask the user for information that can be discovered from the project.
- Inspect relevant files before modifying them.
- Distinguish facts from assumptions.
- Do not modify unrelated code.
- Prefer the smallest appropriate fix.
- Avoid speculative changes.
- Preserve existing UI and behavior unless the bug requires a change.

## Verification Rules

A fix is not considered complete until it has been verified as far as
the available tools allow.

Use the most relevant available verification:

- build
- tests
- lint
- type-check
- dev server
- browser/runtime inspection
- network inspection
- affected route/component verification

If verification cannot be completed, explicitly state why.

Never claim "fixed" without evidence.

## Output

Use exactly these sections:

### Problem

Describe the observed problem.

### Root Cause

Explain the underlying cause.

### Evidence

Describe the evidence supporting the conclusion.

### Fix

Describe the changes made.

### Verification

Describe how the fix was verified and mention any remaining limitations.
