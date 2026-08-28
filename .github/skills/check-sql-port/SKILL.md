---
name: check-sql-port
description: Check whether a SQL database port is reachable, identify connectivity problems, and provide safe troubleshooting steps for database connection issues.
---

# Check SQL Port

Use this skill when the user asks to check, diagnose, or troubleshoot connectivity to a SQL database port.

## Supported Databases

Common database ports include:

- PostgreSQL: 5432
- MySQL: 3306
- MariaDB: 3306
- Microsoft SQL Server: 1433
- Oracle Database: 1521
- Redis: 6379

Do not assume the database type if the user has not provided it.

## Process

### 1. Identify the target

Determine:

- Hostname or IP address
- Port
- Database type, if known
- Operating system
- Whether the database is local or remote

If the host or port is missing, ask the user for it.

### 2. Check basic network connectivity

Use appropriate safe network checks.

Examples:

```bash
nc -vz HOST PORT
