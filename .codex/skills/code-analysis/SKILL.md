---
name: code-analysis
description: Analyze source code, code changes, errors, and runtime problems to identify bugs, security issues, code-quality problems, and likely root causes, and provide or implement appropriate fixes when requested.
---

# Code Analysis

Analyze source code and code changes to identify potential bugs, security issues,
quality problems, and runtime issues.

This skill provides common code-analysis and debugging behavior for both
backend and frontend projects.

## Activation

Activate this skill when the user asks to:

- Review code
- Analyze code
- Find bugs
- Find potential problems
- Debug an error
- Investigate unexpected behavior
- Analyze a stack trace
- Understand why code is failing
- Review a Git diff
- Check code quality
- Check for security issues
- Find possible performance problems
- Explain a suspected bug
- Suggest a fix for a code problem

The user's natural-language request is sufficient to activate this skill.

The user does not need to:

- identify the affected file
- identify the relevant function
- provide a stack trace
- explain the root cause
- identify the exact problem
- explicitly mention this skill

When the problem is ambiguous, inspect the available project context before
asking unnecessary questions.

## Scope

This skill covers common code-analysis activities across:

- Backend code
- Frontend code
- Scripts
- Configuration-related code
- Tests
- Git diffs
- Error messages
- Stack traces
- Application logs

Use backend-specific or frontend-specific skills when the investigation
requires framework or platform-specific knowledge.

## 1. Understand the Problem

Before analyzing the code:

1. Understand what the user is trying to achieve.
2. Identify the expected behavior.
3. Identify the actual behavior or reported error.
4. Identify relevant files, functions, components, or changes.
5. Determine whether the request is:
   - Code review
   - Bug investigation
   - Runtime debugging
   - Security analysis
   - Code-quality analysis
   - Git diff review

Do not assume the root cause before examining the available evidence.

## 2. Inspect the Project

When project access is available:

- Inspect the project structure.
- Identify relevant source files.
- Inspect related configuration.
- Inspect relevant dependencies.
- Inspect tests when available.
- Inspect logs or error output when relevant.
- Follow the execution or data flow related to the reported problem.

Do not ask the user to identify files that can reasonably be found by
searching the project.

## 3. Code Review

When reviewing code:

Check for:

- Incorrect logic
- Potential bugs
- Error handling problems
- Security vulnerabilities
- Unsafe input handling
- Null or undefined values
- Incorrect assumptions
- Resource leaks
- Concurrency problems
- Performance problems
- Maintainability issues
- Unnecessary complexity
- Poor separation of responsibilities
- Incorrect API usage
- Missing validation
- Missing tests

Prioritize meaningful issues over minor style preferences.

## 4. Debugging

When the user reports an error or unexpected behavior:

1. Identify the symptom.
2. Locate the relevant code.
3. Trace the execution or data flow.
4. Inspect error messages, logs, or stack traces.
5. Form possible hypotheses.
6. Gather evidence for each hypothesis.
7. Identify the most likely root cause.
8. Suggest or implement the smallest appropriate fix.
9. Verify the result when possible.

Do not make speculative changes simply to see whether they work.

## 5. Security Analysis

Look for common security problems such as:

- SQL injection
- Cross-site scripting (XSS)
- Hardcoded passwords
- Hardcoded API keys
- Exposed tokens
- Unsafe user input
- Missing authorization checks
- Insecure authentication logic
- Sensitive information in logs
- Unsafe file handling
- Insecure deserialization
- Improper access control

Do not expose secrets found during analysis.

Mask sensitive values in the final response.

## 6. Error and Stack Trace Analysis

When the user provides an error or stack trace:

- Identify the error type.
- Identify the relevant file and line when available.
- Explain what the error means.
- Trace the likely execution path.
- Identify the likely root cause.
- Suggest the smallest appropriate fix.

If the available information is insufficient:

- Explain what can be concluded.
- Clearly identify what is unknown.
- Request only the additional information required.

Do not invent missing stack trace information or project behavior.

## 7. Git Diff Analysis

When the user provides a Git diff:

Review:

- Added code
- Removed code
- Changed behavior
- Potential regressions
- Security issues
- Error handling
- Missing validation
- Breaking changes
- Test coverage

Focus primarily on problems introduced by the change.

Example:

```diff
- return repository.findById(id);
+ String sql = "SELECT * FROM users WHERE id = '" + id + "'";
+ return database.execute(sql);
