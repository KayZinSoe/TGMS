# SQL Server Database Rules

## Primary Key

Always:

BIGINT IDENTITY(1,1)

Java:

Long

Never:
UUID


## Table Naming

Format:

<SYSTEM>_<meaningfulName>


Example:

FP_employee


## Column Naming

Suffix rules:

name_m
status_c
createdDate_dt
amount_a


## Constraint Naming

Primary key:

SYS_PK_

Foreign key:

SYS_FK_

Index:

SYS_IX_

Unique:

SYS_UQ_