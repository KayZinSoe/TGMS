# Backend Implementation Plan

## Overview
A simple Spring Boot backend that provides REST APIs for TGMS. This document lists minimal scope for an initial implementation.

## Tech Stack
- Java 21
- Spring Boot 3.5
- Spring Data JPA (MS SQL Server)
- MapStruct, Lombok

## API Surface (initial)
- GET /health — service health
- GET /api/items — list items
- POST /api/items — create item

## Data
- Simple `Item` entity: id, name, description, createdAt

## Deliverables
- Maven project skeleton under `backend/`
- Dockerfile for container image
- `application-dev.yml` + README with run instructions

## Checklist
- [ ] Create project skeleton
- [ ] Implement `Item` entity + repository
- [ ] Implement REST controller
- [ ] Add tests (unit + integration)
- [ ] Add CI pipeline

## Notes
Keep configuration via environment variables. Use `scripts/` for schema setup and avoid hardcoding credentials.