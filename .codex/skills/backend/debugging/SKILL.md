---
name: debugging
description: Investigate and fix backend errors, API failures, runtime issues, database problems, authentication issues, failed builds, and unexpected server behavior. Automatically inspect the project, identify the root cause, implement the smallest appropriate fix, and verify the result from the user's natural-language problem report.
---

# Backend Debugging

Investigate and fix backend errors, API failures, runtime issues, database problems, authentication issues, failed builds, and unexpected server behavior.

## Activation

Activate this skill whenever the user describes a backend problem in natural language, including:

- Server errors
- API errors
- HTTP 4xx or 5xx responses
- Runtime exceptions
- Application startup failures
- Failed builds
- Database errors
- Database connection failures
- Authentication or authorization problems
- Request or response issues
- Validation errors
- Incorrect API behavior
- Background job or queue failures
- External service or integration failures
- Environment or configuration problems
- Performance or timeout problems
- "The API doesn't work" or similar vague problem reports

The user's message is the bug report.

The user does NOT need to:

- explicitly mention this skill
- use a special command
- identify the affected file
- identify the relevant endpoint
- provide a stack trace
- explain the root cause
- tell the agent what files to inspect
- provide the database query or schema involved

When the reported problem is incomplete or ambiguous, inspect the project first and use available evidence to determine what is happening.

Ask a clarifying question only when the project and available evidence are insufficient to make meaningful progress.

## Process

1. Treat the user's free-text message as the initial symptom report.
2. Extract the expected and actual behavior from the report.
3. If either is unclear, infer it from the surrounding project behavior where possible.
4. Inspect the backend project structure, source code, configuration, logs, environment configuration, and relevant dependencies.
5. Identify the backend framework, application entry point, server startup command, and relevant execution path.
6. Search the project autonomously to locate the code related to the reported problem.
7. Reproduce the problem when possible.
8. Inspect server logs, stack traces, request logs, error responses, and database errors when applicable.
9. Trace the request or execution flow from the entry point to the failing code.
10. Form possible hypotheses based on evidence.
11. Gather evidence to test those hypotheses.
12. Identify the most likely root cause.
13. Implement the smallest appropriate fix.
14. Run relevant tests, builds, linting, type-checking, startup commands, API requests, or runtime checks.
15. Reproduce the original problem again when practical and confirm the expected behavior.
16. Check for obvious regression risks.
17. Report the result.

## Investigation Rules

- Do not guess when evidence can be obtained.
- Do not require the user to specify which file to inspect.
- Do not require the user to identify the relevant endpoint, service, controller, or database code.
- Do not require the user to provide information that can be discovered from the project.
- Search the project autonomously based on the reported behavior.
- Start from the reported symptom and trace the relevant execution path.
- Inspect relevant files before modifying them.
- Distinguish facts from assumptions.
- Use logs, stack traces, HTTP responses, database errors, tests, configuration, and source code as evidence.
- Check both the immediate error and the surrounding execution flow.
- If multiple possible causes exist, investigate them before choosing a fix.
- Reproduce the problem when practical.
- Do not modify unrelated code.
- Prefer the smallest appropriate fix.
- Avoid unnecessary refactoring.
- Do not make speculative changes merely to see whether they work.
- Do not expose secrets, credentials, tokens, API keys, or sensitive environment values in the final report.

## Backend Investigation Areas

When relevant, investigate:

- Server startup and application entry points
- Routes and endpoints
- Controllers and handlers
- Services and business logic
- Middleware
- Request parsing
- Request validation
- Response handling
- Error handling
- Authentication
- Authorization
- Sessions and cookies
- Database connections
- Database queries
- ORM configuration
- Database schemas and migrations
- Transactions
- Caching
- Queues and background jobs
- External APIs and integrations
- File storage
- Environment variables
- Configuration
- Dependencies
- Logging
- Timeouts
- Concurrency and asynchronous operations
- HTTP status codes
- Request and response data flow

## API Investigation

When debugging an API:

1. Identify the affected endpoint and HTTP method.
2. Check the route registration.
3. Trace middleware execution.
4. Inspect request validation and parsing.
5. Trace the controller or handler.
6. Inspect service and business logic.
7. Inspect database or external service calls when applicable.
8. Check error handling and response construction.
9. Verify the returned HTTP status and response body.
10. Test the endpoint again after the fix.

Do not change an HTTP status code merely to hide an error. Determine why the error occurs and preserve the API's intended contract.

## Database Rules

When the problem involves a database:

- Inspect the existing schema and migrations before changing them.
- Check the database connection and configuration.
- Inspect the relevant query or ORM operation.
- Check parameter values and data types.
- Check transaction behavior when applicable.
- Check whether the required tables, columns, indexes, or constraints exist.
- Do not delete or modify production data as a debugging shortcut.
- Do not reset or drop a database unless the user explicitly requests it and it is safe to do so.
- Do not create speculative migrations.
- Preserve existing data and schema behavior outside the affected issue.

## Configuration and Environment Rules

- Inspect configuration before changing it.
- Do not expose secrets in logs or the final response.
- Do not replace missing secrets with guessed values.
- Do not commit credentials, tokens, API keys, or private configuration.
- Do not make broad environment changes unless evidence shows they are necessary.
- Distinguish between a code problem and an environment-specific problem.
- If the issue cannot be reproduced because required environment variables or external services are unavailable, explain the limitation.

## Authentication and Authorization

When debugging authentication or authorization:

- Trace the complete authentication flow.
- Check token or session creation and validation.
- Check middleware and authorization rules.
- Check user identity and permissions.
- Preserve existing security boundaries.
- Do not weaken authentication or authorization merely to make the request succeed.
- Do not disable security checks as a debugging shortcut.
- Do not expose credentials, tokens, session data, or sensitive user information.

## Fix Rules

- Implement the fix only after sufficient evidence identifies the likely root cause.
- Preserve existing behavior outside the affected area.
- Preserve existing API contracts unless the reported problem requires a contract change.
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
- Test affected API endpoints when applicable.
- Verify expected HTTP status codes and response behavior.
- Verify database operations when applicable.
- Check server logs for new errors.
- Check for obvious regressions in the affected execution path.
- If a test or verification command fails because of an unrelated pre-existing issue, distinguish that from the reported problem.
- Do not claim the issue is fixed without evidence.
- If verification cannot be completed, explain what was attempted and why it could not be completed.
- If the fix is only partially verified, explicitly state the remaining limitation.

## Handling Vague Reports

Free-text reports are valid backend debugging requests.

Examples:

- "the API is returning 500"
- "the server crashes when I start it"
- "login API doesn't work"
- "database connection failed"
- "the endpoint returns the wrong data"
- "POST request doesn't work"
- "the API works locally but not in production"
- "the server keeps timing out"
- "the backend is broken"
- "I get an error when creating a user"

Do not reject or defer these reports merely because they do not identify a file or provide a complete reproduction.

Instead:

1. Inspect the project.
2. Determine how the backend is run.
3. Identify the framework and relevant entry point.
4. Locate the relevant endpoint or execution path.
5. Inspect logs and errors.
6. Trace the request or execution flow.
7. Reproduce the problem when possible.
8. Fix it if sufficient evidence exists.
9. Verify the result.
10. Ask for additional information only when local investigation cannot establish what is happening.

## Output

Provide:

### Problem

Describe the observed backend problem based on the user's report and investigation.

### Root Cause

Explain the underlying cause.

### Evidence

Explain the evidence that supports the conclusion, including relevant logs, stack traces, HTTP responses, database behavior, code paths, or tests.

### Fix

Describe the changes made.

### Verification

Explain how the fix was verified.

Include any remaining limitations, unrelated failures, environment limitations, or verification steps that could not be completed.
