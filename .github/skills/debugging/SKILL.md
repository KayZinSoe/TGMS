---
name: debugging
description: Investigate and fix errors, unexpected behavior, failed builds, runtime issues, and broken application behavior. Automatically inspect the project, identify the root cause, implement the smallest appropriate fix, and verify the result from the user's natural-language problem report.
---

# Debugging

Investigate and fix errors, unexpected behavior, failed builds, runtime issues, and broken application behavior.

## Activation

Activate this skill whenever the user describes a problem with the project in natural language, including:

- Error messages
- Failed builds
- Runtime exceptions
- Application startup failures
- Pages or components not rendering correctly
- Incorrect or unexpected behavior
- Tests failing
- Lint or type-check failures
- API or integration failures
- Performance or loading problems
- "It doesn't work" or similar vague problem reports

The user's message is the bug report.

The user does NOT need to:

- explicitly mention this skill
- use a special command
- identify the affected file
- identify the relevant component
- provide a stack trace
- explain the root cause
- tell the agent what files to inspect

When the reported problem is incomplete or ambiguous, inspect the project first and use available evidence to determine what is happening.

Ask a clarifying question only when the project and available evidence are insufficient to make meaningful progress.

## Process

1. Treat the user's free-text message as the initial symptom report.
2. Extract the expected and actual behavior from the report.
3. If either is unclear, infer it from the surrounding project behavior where possible.
4. Inspect the project structure, source code, configuration, logs, and relevant dependencies.
5. Search the project autonomously to locate the code and execution path related to the reported problem.
6. Reproduce the problem when possible.
7. Form possible hypotheses based on evidence.
8. Gather evidence to test those hypotheses.
9. Identify the most likely root cause.
10. Implement the smallest appropriate fix.
11. Run relevant tests, builds, linting, startup commands, or runtime checks.
12. Reproduce the original problem again when practical and confirm the expected behavior.
13. Check for obvious regression risks.
14. Report the result.

## Investigation Rules

- Do not guess when evidence can be obtained.
- Do not require the user to specify which file to inspect.
- Do not require the user to identify the relevant code or component.
- Do not require the user to provide information that can be discovered from the project.
- Search the project autonomously based on the reported behavior.
- Start from the reported symptom and trace the relevant execution path.
- Inspect relevant files before modifying them.
- Distinguish facts from assumptions.
- If multiple possible causes exist, investigate them before choosing a fix.
- Reproduce the problem when practical.
- Use error messages, logs, stack traces, tests, configuration, and source code as evidence.
- Do not modify unrelated code.
- Prefer the smallest appropriate fix.
- Avoid unnecessary refactoring.
- Do not make speculative changes merely to see whether they work.

## Fix Rules

- Implement the fix only after sufficient evidence identifies the likely root cause.
- Preserve existing behavior outside the affected area.
- Prefer local, low-risk changes over broad changes.
- Do not upgrade dependencies unless evidence shows the dependency version is the cause.
- Do not make broad configuration changes unless evidence shows they are necessary.
- Do not change unrelated files.
- Follow the existing project's conventions and architecture.
- If a straightforward fix cannot safely be determined, do not make speculative changes.

## Verification Rules

- Verify the fix using the most relevant available method.
- Prefer reproducing the original problem and confirming the expected behavior after the fix.
- Run the project's relevant tests when available.
- Run builds, linting, type-checking, startup commands, or runtime checks when appropriate.
- If a test or verification command fails because of an unrelated pre-existing issue, distinguish that from the reported problem.
- Check for obvious regressions in the affected execution path.
- Do not claim the issue is fixed without evidence.
- If verification cannot be completed, explain what was attempted and why it could not be completed.
- If the fix is only partially verified, explicitly state the remaining limitation.

## Handling Vague Reports

Free-text reports are valid debugging requests.

For example:

- "the app crashes when I start it"
- "login doesn't work"
- "the page is blank"
- "I get an error when I click submit"
- "the tests are failing"
- "it worked before but now it doesn't"
- "when I run the project I got this issue: ..."
- "API is returning 500"
- "the button does nothing"

Do not reject or defer these reports merely because they do not identify a file or provide a complete reproduction.

Instead:

1. Inspect the project.
2. Determine how the application is run.
3. Locate the relevant code path.
4. Use available logs, errors, tests, and source code to narrow the cause.
5. Reproduce the problem when possible.
6. Fix it if sufficient evidence exists.
7. Ask for additional information only when local investigation cannot establish what is happening.

## Output

Provide:

### Problem

Describe the observed problem based on the user's report and investigation.

### Root Cause

Explain the underlying cause.

### Evidence

Explain the evidence that supports the conclusion, including relevant errors, logs, code paths, tests, or runtime behavior.

### Fix

Describe the changes made.

### Verification

Explain how the fix was verified.

Include any remaining limitations, unrelated failures, or verification steps that could not be completed.
