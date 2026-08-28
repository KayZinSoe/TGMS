# REST API Design Guidelines

This document defines the standard REST API design conventions for all backend services.

These guidelines are mandatory for all REST APIs unless explicitly overridden by approved project requirements.

---

# 1. URL Convention

## External APIs

```
/{service}/external/v1/{resource}
```

## Internal APIs (if applicable)

```
/{service}/internal/v1/{resource}
```

### Rules

- Use nouns instead of verbs.
- Use lowercase URLs.
- Use kebab-case for multi-word resources if required by project standards.
- Include the API version in the URL.
- Do not expose database table names.
- Use path variables for resource identifiers.
- Use query parameters for filtering, sorting and pagination.

### Examples

```
GET    /account/external/v1/users
GET    /account/external/v1/users/{id}
POST   /account/external/v1/users
PUT    /account/external/v1/users/{id}
DELETE /account/external/v1/users/{id}
```

---

# 2. Standard Response Format

All APIs must return the standard `BaseResponse`.

```json
{
  "status": {
    "code": "",
    "message": ""
  },
  "data": {}
}
```

## Success Response

```json
{
  "status": {
    "code": "0000",
    "message": "Success"
  },
  "data": {
    ...
  }
}
```

## Error Response

```json
{
  "status": {
    "code": "0004",
    "message": "Invalid parameter"
  },
  "data": null
}
```

Rules

- Every response must contain `status` and `data`.
- Successful responses return business data inside `data`.
- Error responses return `data = null`.
- Use the common `ResponseBuilder` utility to construct responses.
- Do not return raw entities or custom response structures.

---

# 3. Standard Status Codes

| Code | Name | Description |
|------|------|-------------|
|0000|SUCCESS|Request completed successfully|
|0001|SYSTEM_ERROR|Unexpected system error|
|0004|INVALID_PARAMETER|Request validation failed|
|0005|ACCESS_DENIED|User is not authorized|

Rules

- Reuse existing status codes whenever possible.
- Do not introduce new status codes without approval.
- Business-specific error messages may vary, but status codes must remain consistent.

---

# 4. HTTP Status Mapping

| HTTP Status | Status Code | Usage |
|-------------|-------------|-------|
|200 OK|0000|Successful GET, PUT, DELETE|
|201 Created|0000|Successful POST|
|400 Bad Request|0004|Validation failure|
|401 Unauthorized|0005|Authentication required|
|403 Forbidden|0005|Access denied|
|404 Not Found|0001|Requested resource not found|
|500 Internal Server Error|0001|Unhandled system error|

---

# 5. Controller Guidelines

Controllers are responsible for:

- Defining REST endpoints.
- Mapping requests.
- Validating incoming requests using Jakarta Bean Validation.
- Calling the service layer.
- Returning `BaseResponse`.
- Declaring Swagger/OpenAPI annotations.

Controllers must NOT:

- Implement business logic.
- Access repositories directly.
- Access EntityManager.
- Perform database operations.
- Implement transaction logic.

---

# 6. Service Guidelines

Services are responsible for:

- Business logic.
- Transaction management.
- Repository coordination.
- Calling downstream services.
- Throwing business exceptions.
- Mapping entities to DTOs where appropriate.

Services must NOT:

- Return `ResponseEntity`.
- Construct HTTP responses.
- Depend on servlet APIs.
- Perform controller responsibilities.

---

# 7. Repository Guidelines

Repositories are responsible for persistence only.

Rules

- Extend `JpaRepository`.
- Use derived query methods where possible.
- Use JPQL or native SQL only when necessary.
- Keep repositories free of business logic.

---

# 8. Request Validation

Use Jakarta Bean Validation annotations.

Examples

- `@NotNull`
- `@NotBlank`
- `@Positive`
- `@PositiveOrZero`
- `@Email`
- `@Pattern`
- Custom validators where necessary

Validation should occur at the controller boundary using `@Valid`.

---

# 9. Exception Handling

All exceptions must be handled by `GlobalExceptionHandler`.

Rules

- Business exceptions should be mapped to the standard response format.
- Validation failures should return HTTP 400 with status code `0004`.
- Unauthorized requests should return status code `0005`.
- Unexpected exceptions should return status code `0001`.
- Controllers should not catch generic exceptions unless absolutely necessary.

---

# 10. Logging

Controller

- INFO for incoming requests.
- ERROR for unexpected failures.

Service

- DEBUG for method entry.
- WARN for recoverable situations.
- ERROR for exceptions.

Rules

- Include Correlation ID in logs.
- Never log passwords.
- Never log tokens.
- Never log secrets.
- Never log sensitive personal information.

---

# 11. API Documentation

All endpoints must be documented using SpringDoc OpenAPI.

Include:

- `@Tag`
- `@Operation`
- `@ApiResponses`
- Request examples where appropriate.
- Response examples where appropriate.

---

# 12. Security

- Follow the project `SecurityConfig`.
- Public APIs should follow the `/external/**` convention.
- Secure APIs should require authentication.
- Never expose internal implementation details.
- Never return stack traces to clients.

---

# 13. General Development Standards

- Use constructor injection only.
- Do not use field injection.
- Do not use `@Autowired` on fields.
- Return DTOs instead of entities.
- Follow package naming conventions.
- Keep controllers thin.
- Keep services cohesive.
- Keep repositories persistence-focused.

---

# 14. Usage by Other Skills

This document is the authoritative API standard for all backend skills.

The following skills should reference this document instead of redefining API conventions:

- `generate-plan.md`
- `generate-code.md`
- `review.md`
- `api-review.md`
- Any future backend planning or code generation skills

Feature-specific implementation documents should only describe requirements unique to that feature and must not duplicate the standards defined here.