---
name: mpa-get-stories
description: Retrieve the list of user stories from Azure DevOps and create markdown files for each story.
argument-hint: Provide the Azure DevOps project name, team name, sprint number, ID of the user story or assigned name.
agent: agent
---

This agent performs the following tasks:

1. Connects to Azure DevOps to retrieve the list of work items for a specified project and team.
2. Creates a folder named `docs/stories` in the current workspace if it does not already exist.
3. For each work item retrieved, generates a markdown file inside the `docs/stories/` folder. If the file exists, update the content in the file. Each file contains:
   - The ID of the work item.
   - The title of the work item.
   - The description of the work item (retrieved from the `System.Description` field).
   - The acceptance criteria of the work item (retrieved from the `Microsoft.VSTS.Common.AcceptanceCriteria` field).

### Inputs
- **Project Name** (optional): The name of the Azure DevOps project.
- **Team Name** (optional): The name of the team within the project.
- **Sprint Number** (optional): The sprint number to filter the work items. 
- **Assigned Name** (optional): The name of the user to whom the work items are assigned.
- **Work Item ID** (optional): The specific ID of the work item to retrieve.

### Outputs
- A `stories` folder containing markdown files for each work item. The file name is in the format of `{ID}-{Title}-WorkItem.md`, where `{ID}` is the ID of the work item and `{Title}` is the title of the work item.

### Example Usage
Provide the project name, team name, sprint number, and assigned name to retrieve and generate work item files.