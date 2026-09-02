name: create-wiki
description: Create or update a GitHub Wiki page based on a title and requirements provided by the user.
Create Wiki Page

Use this skill when the user asks to create or update a page in the project's GitHub Wiki.

Input

The user must provide the Wiki page title/topic in the request.

Examples:

Create wiki page: API Gateway
Create wiki page: VM Access & User Details
Create wiki page: Deployment Guide

Do not assume or hard-code a Wiki page title.

If the user does not provide a title or topic, ask:

What should the Wiki page be called?

Workflow
1. Get the page title

Use the title provided by the user.

Preserve the user's intended wording unless it needs minor formatting for a Wiki page title.

2. Understand the requested content

Determine what the user wants documented.

If only a title is provided, create a useful documentation structure based on the title, but do not invent project-specific technical details.

If important information is missing, ask the user for it.

3. Check for an existing Wiki page

Before creating a page, check whether a page with the same or similar title already exists.

If an existing page is found:

Do not overwrite it automatically.
Tell the user that the page already exists.
Ask whether they want to update it.
4. Generate the Wiki content

Create clear Markdown documentation.

Use an appropriate structure for the topic.

A general structure can be:

<Wiki Page Title>
Overview

Explain the purpose and scope of the topic.

Prerequisites

List required access, permissions, tools, or knowledge when applicable.

Configuration

Document configuration when applicable.

Procedure

Provide step-by-step instructions when applicable.

Usage

Explain how the documented system, service, or process should be used.

Troubleshooting

Document common problems and solutions when applicable.

References

Include relevant links or related documentation when available.

Do not include sections that are irrelevant to the topic.

5. Create or update the Wiki page

Write the generated Markdown to the project's GitHub Wiki.

Do not create the Wiki page under:

.github/skills/

The .github/skills/create-wiki/SKILL.md file contains the skill instructions only.

6. Verify

After creating or updating the page:

Verify that the Wiki page was created or updated successfully.
Verify the page title.
Verify that the Markdown content is valid.
Report the Wiki page title and location to the user.
Rules
Never hard-code a specific Wiki page title.
Always use the title supplied by the user.
Do not invent project-specific technical information.
Ask for clarification when required information is missing.
Do not overwrite an existing Wiki page without confirmation.
Keep Wiki documentation clear and maintainable.
Do not put generated Wiki pages inside the repository's .github/skills/ directory.
Example

User:

Create wiki page: API Gateway

The skill should use:

API Gateway

as the Wiki page title.

User:

Create wiki page: VM Access & User Details

The skill should use:

VM Access & User Details

as the Wiki page title.