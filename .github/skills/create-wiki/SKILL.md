---
name: create-wiki
description: "Creates or updates GitHub Wiki pages from a user-provided title and documentation requirements. Use when documenting project components, infrastructure, APIs, access procedures, operational processes, troubleshooting guides, or other project knowledge that belongs in the GitHub Wiki. Produces structured, maintainable Markdown and verifies existing pages before making changes."
argument-hint: "Wiki page title, documentation requirements, relevant project context, and source information"
user-invocable: true

---

# Create Wiki

Use this skill when the user wants to create or update documentation in the project's GitHub Wiki.

The Wiki page title must come from the user's request. Never assume or hard-code a specific page title.

The skill is intended to turn project knowledge, user-provided requirements, repository context, and existing documentation into clear and maintainable Wiki content.

## When to Use

Use this skill when the user asks for things like:

"create a wiki page"
"add this to the project wiki"
"document this in the wiki"
"create wiki documentation for this"
"update the wiki page"
"create a wiki page for <topic>"

Typical scenarios:

API or service documentation
infrastructure documentation
access and permission procedures
deployment and configuration guides
operational procedures
troubleshooting guides
development workflows
project-specific technical knowledge
onboarding documentation
Input Principles
The user must provide the Wiki page title or topic.
Use the title supplied by the user.
Preserve the user's intended wording unless minor formatting is required.
Do not hard-code example topics into the skill.
If the user does not provide a title, ask for one.
Use additional requirements supplied by the user to determine the page content.
Use available repository context when it helps produce accurate documentation.
Do not invent project-specific technical details.
Wiki Documentation Principles
Accuracy over completeness - do not fill gaps with assumptions
Project context over generic advice - prefer actual repository behavior and configuration when available
Clarity over verbosity - document what users need to understand or perform the task
Actionable documentation - provide concrete steps when a procedure is involved
Maintainability - structure pages so they can be updated easily
Consistency - follow existing Wiki documentation conventions when available
Traceability - identify relevant references, files, services, or resources when appropriate
Explicit uncertainty - clearly identify information that could not be verified
Wiki Creation Workflow

Follow the phases in order.

### Phase 0: Frame the request

Before creating the page, establish:

Wiki page title
documentation purpose
intended audience
requested scope
available source information
whether the request is for a new page or an update

If the user provides only a title, infer a reasonable documentation structure but do not invent project-specific facts.

If important information is missing, ask the user for clarification.

### Phase 1: Understand the project context

Before generating documentation, inspect available project context when relevant.

Check:

existing documentation
related source files
configuration files
scripts and commands
existing Wiki pages
repository conventions
related skills or documentation resources

Use repository evidence to make the Wiki content specific to the project.

Do not claim that a configuration, command, endpoint, permission, or workflow exists unless there is supporting evidence.

### Phase 2: Check the existing Wiki

Before creating a new page, determine whether a Wiki page with the same or similar title already exists.

If an existing page is found:

do not overwrite it automatically
summarize what already exists
ask whether the user wants to update it

If the user explicitly requested an update, preserve useful existing content and make the requested changes.

### Phase 3: Design the Wiki page

Choose a structure appropriate for the requested topic.

A typical page may contain:

Overview
Prerequisites
Architecture or Context
Configuration
Procedure
Usage
Troubleshooting
Security or Access Considerations
References

Do not add irrelevant sections simply to follow the template.

For procedural documentation, prefer numbered steps.

For configuration or reference information, prefer tables or concise lists when they improve readability.

### Phase 4: Generate the Wiki content

Create valid Markdown using the user's requested title.

The page should:

start with the Wiki page title
explain the purpose and scope
provide verified project-specific information
include actionable procedures where appropriate
document prerequisites and dependencies when relevant
include troubleshooting guidance when applicable
include references when available
clearly identify information that requires confirmation

Do not expose internal reasoning or assumptions as facts.

Do not create placeholder technical values that could be mistaken for real project configuration.

### Phase 5: Create or update the Wiki page

Write the generated Markdown to the project's GitHub Wiki.

The Wiki page is separate from the repository's skill files.

Do not create generated Wiki documentation under:

.github/skills/


The following file:

.github/skills/create-wiki/SKILL.md


contains the instructions for this skill only.

The requested documentation belongs in the GitHub Wiki.

### Phase 6: Verify the result

After creating or updating the Wiki page, verify:

the page exists
the Wiki page title is correct
the content was written successfully
Markdown structure is valid
existing content was preserved when updating
links and references are valid when they can be verified

Report the result clearly to the user.

Wiki Page Structure

Use this structure as guidance rather than a mandatory template:

# <Wiki Page Title>

## Overview

Explain the purpose and scope of the topic.

## Prerequisites

List required access, permissions, tools, or knowledge when applicable.

## Architecture / Context

Explain relevant project architecture or context when applicable.

## Configuration

Document configuration details when applicable.

## Procedure

Provide step-by-step instructions when the topic involves an operational process.

## Usage

Explain how the documented component, service, or process should be used.

## Troubleshooting

Document common problems and verified solutions when applicable.

## Security / Access Considerations

Document security, permissions, or access considerations when relevant.

## References

Include relevant project files, documentation, or external references when available.

Title Handling

The title must always come from the user's request.

For example:

User:

Create wiki page: API Gateway

Use:

API Gateway


as the Wiki page title.

User:

Create wiki page: VM Access & User Details

Use:

VM Access & User Details


as the Wiki page title.

Do not create titles such as:

Wiki - API Gateway
Documentation - API Gateway
Project Wiki - API Gateway


unless the user explicitly requests that naming convention.

Update Behavior

When updating an existing Wiki page:

preserve existing useful information
make only the requested or necessary changes
avoid deleting unrelated documentation
maintain the existing page structure when practical
clearly identify substantial changes
do not overwrite content without user authorization

If the user asks to replace the entire page, follow the user's explicit instruction.

Content Quality Rules
Do
use concise technical language
use headings to organize information
use examples when they clarify the procedure
use code blocks for commands and configuration
link to relevant resources when available
distinguish verified facts from assumptions
follow existing project documentation conventions
Do Not
invent infrastructure details
invent URLs, commands, credentials, permissions, or configuration values
expose secrets or sensitive credentials
duplicate large amounts of repository documentation unnecessarily
overwrite an existing Wiki page without confirmation
create Wiki pages inside .github/skills/
assume a page title that was not provided by the user
Common Request Patterns
Create a new page

User:

Create wiki page: <title>

Action:

Extract the title.
Determine the documentation scope.
Check whether the page already exists.
Generate appropriate Markdown.
Create the Wiki page.
Verify the result.
Create a page with requirements

User:

Create wiki page: <title>. Include prerequisites, setup steps, and troubleshooting.

Action:

Follow the requested structure and include the specified sections.

Update an existing page

User:

Update the <title> wiki page with the new configuration.

Action:

Find the existing page.
Review its current content.
Apply the requested change.
Preserve unrelated content.
Verify the updated page.
Missing title

User:

Create a wiki page.

Action:

Ask:

What should the Wiki page be called?

Do not create a page until the title is provided.

Output Expectations

After successfully creating a Wiki page, provide:

the Wiki page title
a short summary of what was documented
the Wiki page location
any important information that could not be verified

If the user asks for the generated content before creating the page, provide the Markdown for review instead of immediately writing it.

If the Wiki page already exists and user confirmation is required, do not modify it until the user confirms.

Definition of Done

This skill is complete when:

the Wiki page title comes from the user's request
the documentation scope is understood
existing Wiki content has been checked when applicable
the generated content is structured and maintainable
project-specific information is supported by available evidence
missing information is not invented
the Wiki page is created or updated successfully
the resulting page is verified
the user receives a clear summary and Wiki page location