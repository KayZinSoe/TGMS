---
name: check-sql-port
description: Check whether a SQL database host and port are reachable, identify common connectivity problems, and provide safe troubleshooting steps.
---

# Check SQL Port

Use this skill when the user asks to check, diagnose, or troubleshoot connectivity to a SQL database port.

## 1. Identify the Target

Determine:

- Hostname or IP address
- Port
- Database type, if known
- Operating system, if relevant
- Whether the database is local or remote

If the host or port is missing, ask the user for the required information.

Do not guess the host or port.

## 2. Common Database Ports

Common database ports include:

- PostgreSQL: 5432
- MySQL: 3306
- MariaDB: 3306
- Microsoft SQL Server: 1433
- Oracle Database: 1521
- Redis: 6379

Do not assume the database type if the user has not provided it.

## 3. Check Network Connectivity

Use a safe TCP connectivity check.

Example:

```bash
nc -vz HOST PORT
