---
description: MPA standard development instructions for Spring Boot backend projects at the Maritime and Port Authority of Singapore (MPA), covering project structure, coding standards, Maven configuration, and best practices.
applyTo: **
---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Java 21 |
| Framework | Spring Boot 3.5.3 |
| Build Tool | Maven 3.9+ |
| Database | Microsoft SQL Server (via `mssql-jdbc`) |
| ORM | Spring Data JPA + Hibernate |
| Security | Spring Security |
| Validation | Spring Boot Starter Validation (Jakarta Bean Validation) |
| Mapping | MapStruct 1.5.5 |
| Boilerplate Reduction | Lombok 1.18.30 |
| API Documentation | SpringDoc OpenAPI (springdoc-openapi-starter-webmvc-ui 2.5.0) |
| HTTP Client | Spring WebFlux WebClient |
| Resilience | Resilience4j (Circuit Breaker + Retry) |
| Monitoring | Spring Boot Actuator |
| Containerisation | Docker (multi-stage build with Eclipse Temurin 21 JDK) |
| Base Group ID | `sg.gov.mpa` |

---

## Project Structure

The recommended package and folder organisation for all MPA Spring Boot backend projects is as follows:

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── sg/gov/mpa/{service-name}/
│   │   │       ├── {ServiceName}Application.java   # Main entry point
│   │   │       ├── common/
│   │   │       │   ├── constants/                  # Application-wide constants
│   │   │       │   └── enums/                      # Shared enums (e.g., StatusCode)
│   │   │       ├── config/                         # Spring @Configuration classes
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   ├── SwaggerConfig.java
│   │   │       │   └── WebClientConfig.java
│   │   │       ├── controller/                     # REST controllers (versioned)
│   │   │       │   └── {Domain}ControllerV1.java
│   │   │       ├── entity/                         # JPA entities
│   │   │       ├── exception/                      # Custom exceptions and global handler
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── ResourceNotFoundException.java
│   │   │       │   └── UnauthorizedAccessException.java
│   │   │       ├── filter/                         # Servlet filters (e.g., correlation ID)
│   │   │       │   └── CorrelationIdFilter.java
│   │   │       ├── mapper/                         # MapStruct mapper interfaces
│   │   │       ├── model/
│   │   │       │   ├── request/                    # Inbound DTOs (validated)
│   │   │       │   └── response/                   # Outbound DTOs
│   │   │       │       ├── BaseResponse.java
│   │   │       │       ├── ResponseStatus.java
│   │   │       │       └── PagedResponse.java
│   │   │       ├── repository/                     # Spring Data JPA repositories
│   │   │       ├── service/                        # Service interfaces
│   │   │       │   └── impl/                       # Service implementations
│   │   │       └── util/                           # Utility / helper classes
│   │   │           ├── ResponseBuilder.java
│   │   │           └── validation/                 # Custom constraint validators
│   │   └── resources/
│   │       ├── application.yml                     # Base configuration
│   │       ├── application-dev.yml                 # Development profile
│   │       ├── application-test.yml                # Test profile
│   │       ├── application-prod.yml                # Production profile
│   │       └── logback-spring.xml                  # Logback logging configuration
│   └── test/
│       └── java/
│           └── sg/gov/mpa/{service-name}/          # Unit and integration tests
├── scripts/                                        # Database DDL / DML scripts
├── Dockerfile                                      # Multi-stage Docker build
├── docker-compose.yml                              # Local development compose file
└── pom.xml                                         # Maven build descriptor
```

**Notes:**
- The base package is always `sg.gov.mpa.{service-name}` (e.g., `sg.gov.mpa.employee`).
- Controllers are versioned — use the suffix `V1`, `V2`, etc. (e.g., `EmployeeControllerV1`).
- Service interfaces live in `service/`; their implementations live in `service/impl/`.
- Request models represent inbound data; response models represent outbound data. Never reuse JPA entities as DTOs.
- `common/enums/` holds the `StatusCode` enum used by `ResponseBuilder` across the service.
- `util/validation/` holds custom constraint annotation (e.g., `@ValidPhoneNumber`) and its `ConstraintValidator` implementation.
- `model/response/DepartmentResponse.java` (or equivalent downstream response DTOs) lives in `model/response/` alongside other response models.

---

## Maven Configuration (`pom.xml`)

### Key Details

- **Parent**: `spring-boot-starter-parent` 3.5.3
- **Group ID**: `sg.gov.mpa`
- **Java Version**: 21
- **Build Output Directory**: `appl/` (custom `<directory>` in `<build>`)

### Required Dependencies

```xml
<!-- Core -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.30</version>
    <scope>provided</scope>
</dependency>

<!-- MapStruct -->
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>1.5.5.Final</version>
</dependency>
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct-processor</artifactId>
    <version>1.5.5.Final</version>
    <scope>provided</scope>
</dependency>

<!-- API Documentation -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.5.0</version>
</dependency>

<!-- Resilience4j -->
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-circuitbreaker</artifactId>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-reactor</artifactId>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot2</artifactId>
</dependency>
```

### Annotation Processor Configuration

Both Lombok and MapStruct must be declared as annotation processor paths in the `maven-compiler-plugin`:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <source>${java.version}</source>
        <target>${java.version}</target>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.30</version>
            </path>
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>1.5.5.Final</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

### Available Maven Commands

| Command | Purpose |
|---------|---------|
| `mvn clean package` | Build JAR, run tests, output to `appl/` |
| `mvn clean package -DskipTests` | Build JAR, skip tests (CI / Docker builds) |
| `mvn test` | Run all unit and integration tests |
| `mvn spring-boot:run` | Start the application locally via Maven |

---

## Application Configuration

### Profile Strategy

| Profile | File | Purpose |
|---------|------|---------|
| (base) | `application.yml` | Server port, app name, profile activation, Swagger toggle, Resilience4j, Actuator |
| `dev` | `application-dev.yml` | Dev database credentials, JPA `show-sql: true` |
| `test` | `application-test.yml` | Test database configuration |
| `prod` | `application-prod.yml` | Production database credentials, JPA `show-sql: false` |

Activate the profile via the environment variable: `SPRING_PROFILES_ACTIVE=dev`

### Base `application.yml` Structure

```yaml
server:
  port: ${SERVER_PORT:9071}   # Default port; override via env var

spring:
  application:
    name: {service-name}
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}

springdoc:
  api-docs:
    enabled: false            # Enable only in non-production
    path: /v3/api-docs
  swagger-ui:
    enabled: false
    path: /swagger-ui.html
    disable-swagger-default-url: true

resilience4j:
  circuitbreaker:
    instances:
      {downstreamService}:
        registerHealthIndicator: true
        slidingWindowSize: 10
        minimumNumberOfCalls: 5
        failureRateThreshold: 50
        waitDurationInOpenState: 10s
        permittedNumberOfCallsInHalfOpenState: 3
        automaticTransitionFromOpenToHalfOpenEnabled: true
  retry:
    instances:
      {downstreamService}Retry:
        maxAttempts: 3
        waitDuration: 2s
        retryExceptions:
          - java.io.IOException
          - org.springframework.web.reactive.function.client.WebClientRequestException

management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always
  health:
    db:
      enabled: true
```

### Profile `application-dev.yml` Structure

```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL}
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
    hikari:
      connection-timeout: 30000
      maximum-pool-size: 5
  jpa:
    hibernate:
      ddl-auto: none
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    properties:
      hibernate.dialect: org.hibernate.dialect.SQLServerDialect
```

### Environment Variables

All sensitive configuration must be supplied via environment variables — **never hardcode passwords or URLs**:

| Variable | Description |
|----------|-------------|
| `SERVER_PORT` | Application port (default `9071`) |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile (`dev`, `test`, `prod`) |
| `SPRING_DATASOURCE_URL` | JDBC connection string for SQL Server |
| `SPRING_DATASOURCE_USERNAME` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Database password |

---

## Coding Standards

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Classes | PascalCase | `EmployeeServiceImpl` |
| Methods | camelCase | `getEmployeeById()` |
| Variables / Fields | camelCase | `employeeRepository` |
| Constants | SCREAMING_SNAKE_CASE | `CORRELATION_ID` |
| Packages | lowercase | `sg.gov.mpa.employee.service` |
| REST request mappings | kebab-case | `/employee-details` |
| Controller versioning | Suffix `V{n}` | `EmployeeControllerV1` |

### Database Naming Conventions

All table, column, and constraint names must follow MPA naming standards:

#### Table Names
- Format: `<systemAbbr>_<meaningfulName>` — e.g., `BSMS_user`
- For microservices: `<systemAbbr>_<serviceAbbr>_<meaningfulName>` — e.g., `FP_AM_accountInfo`
- Use **camelCase** for `<meaningfulName>`, singular noun — e.g., `User` not `Users`

#### Column Suffixes
Every column name must end with a type suffix:

| Suffix | Type | Example |
|--------|------|---------|
| `_a` | Amount (money) | `charges_a` |
| `_c` | Code (alphanumeric) | `port_c` |
| `_d` | Date | `vesselArrival_d` |
| `_dt` | DateTime | `operationStart_dt` |
| `_i` | Indicator (flag/boolean) | `accountSuspension_i` |
| `_m` | Name (alphanumeric) | `company_m` |
| `_n` | Number (alphanumeric) | `account_n` |
| `_p` | Percent | `discount_p` |
| `_q` | Quantity (count, non-money) | `supplied_q` |
| `_t` | Time | `berthingSlot_t` |
| `_x` | Text (descriptive) | `remarks_x` |

#### Constraint Names
Prefix constraints with the system abbreviation:

| Prefix | Type | Example |
|--------|------|---------|
| `<sysAbbr>_PK_` | Primary Key | `FP_PK_customer_id` |
| `<sysAbbr>_FK_` | Foreign Key | `FP_FK_order_customer_id` |
| `<sysAbbr>_IX_` | Index | `FP_IX_customer_email` |
| `<sysAbbr>_UQ_` | Unique Constraint | `FP_UQ_customer_email` |

#### Database Query Best Practices
- Use parameterised queries / prepared statements — JPA handles this automatically via `@Query` and repository methods.
- Tune queries for performance — add indexes for frequently filtered/joined columns.
- Use `@Transactional` when multiple queries must succeed or fail together.
- Keep business logic in application code — **not** in stored procedures, functions, or triggers.
- Avoid `SELECT *` — always project specific columns via JPQL or response DTOs.

### Controller Layer

- Annotate controllers with `@RestController`, `@RequestMapping`, and `@Slf4j`.
- Use constructor injection — never field injection (`@Autowired`).
- Always wrap responses in `BaseResponse` using `ResponseBuilder`.
- Validate request bodies with `@Valid`.
- Use `ResponseEntity<BaseResponse>` as the return type for all endpoints.
- Catch exceptions explicitly and return appropriate HTTP status codes.

```java
@Slf4j
@RestController
@RequestMapping("/employee/external/v1")
public class EmployeeControllerV1 {

    private final EmployeeService employeeService;

    public EmployeeControllerV1(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<BaseResponse> createEmployee(@Valid @RequestBody EmployeeRequest request) {
        log.info("Creating employee: {}", request);
        try {
            EmployeeResponse response = employeeService.createEmployee(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(ResponseBuilder.success(response));
        } catch (Exception e) {
            log.error("Error creating employee", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseBuilder.error("Failed to create employee"));
        }
    }
}
```

### Service Layer

- Define a service interface in `service/`; place the implementation in `service/impl/`.
- Declare all public methods in the interface first; only the `impl` class contains business logic.
- Annotate implementations with `@Service` and `@Transactional`.
- Use constructor injection exclusively — declare all dependencies `final` and provide a single all-args constructor.
- Apply `@CircuitBreaker` and `@Retry` from Resilience4j on methods that call downstream services.
- Always provide a `fallbackMethod` for `@CircuitBreaker`. The fallback must have the same return type and the same parameters plus a trailing `Throwable` argument.
- Use `@Slf4j` (Lombok) for logging; also keep `LoggerFactory.getLogger()` for any inner classes that cannot use the Lombok annotation.
- Throw `ResourceNotFoundException` (or other custom exceptions) rather than returning null when an entity is not found.

```java
// Service interface
public interface EmployeeService {
    EmployeeResponse createEmployee(EmployeeRequest request);
    EmployeeResponse updateEmployee(Long empId, EmployeeRequest request);
    EmployeeResponse getEmployeeById(Long empId);
    List<EmployeeResponse> getAllEmployees();
    PagedResponse<EmployeeResponse> getAllEmployeeDetails(int page, int size, String sortBy, String sortDir);
    void deleteEmployee(Long empId);
    EmployeeResponse getEmployeeWithDepartment(Long deptId);
}
```

```java
// Service implementation
@Slf4j
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final WebClient departmentWebClient;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                                EmployeeMapper employeeMapper,
                                WebClient departmentWebClient) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.departmentWebClient = departmentWebClient;
    }

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {
        logger.debug("Calling createEmployee method...");
        Employee employee = employeeMapper.toEntity(request);
        return employeeMapper.toResponse(employeeRepository.save(employee));
    }

    @Override
    public EmployeeResponse updateEmployee(Long empId, EmployeeRequest request) {
        logger.debug("Calling updateEmployee method...");
        Employee existing = employeeRepository.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + empId));
        employeeMapper.updateEntityFromRequest(request, existing);
        return employeeMapper.toResponse(employeeRepository.save(existing));
    }

    // Downstream call with Circuit Breaker + Retry + fallback
    @CircuitBreaker(name = "departmentService", fallbackMethod = "fallbackDepartment")
    @Retry(name = "departmentServiceRetry")
    @Override
    public EmployeeResponse getEmployeeWithDepartment(Long deptId) {
        Employee employee = employeeRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + deptId));
        EmployeeResponse employeeResponse = employeeMapper.toResponse(employee);

        DepartmentResponse departmentResponse = departmentWebClient.get()
                .uri("/department/external/{id}", employeeResponse.getDeptId())
                .retrieve()
                .bodyToMono(DepartmentResponse.class)
                .block();

        employeeResponse.setDepartmentResponse(departmentResponse);
        return employeeResponse;
    }

    // Fallback: same return type, same params + Throwable
    public EmployeeResponse fallbackDepartment(Long deptId, Throwable ex) {
        log.error("Department service call failed: {}", ex.getMessage());
        Employee employee = employeeRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + deptId));
        EmployeeResponse fallbackResponse = employeeMapper.toResponse(employee);
        fallbackResponse.setDepartmentResponse(
                new DepartmentResponse("Department service unavailable", "N/A"));
        return fallbackResponse;
    }
}
```

### Repository Layer

- Extend `JpaRepository<Entity, ID>` — no extra annotations needed.
- Add custom query methods using Spring Data derived query names or `@Query` with JPQL.
- Never write raw SQL in repository methods; use named queries or `@Query` with `nativeQuery = true` only when necessary.

```java
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDeptId(Long deptId);
}
```

### Entity Layer

- Annotate entities with `@Entity`, `@Table(name = "...")`, `@Getter`, `@Setter`, and `@ToString` (Lombok).
- Always map the primary key with `@Id` and `@GeneratedValue(strategy = GenerationType.IDENTITY)`.
- Map each column explicitly with `@Column(name = "...")` to decouple field names from column names.
- Use `@Column(nullable = false)` to enforce non-null constraints at the JPA layer.
- Do **not** use `@Data` — it generates `equals`/`hashCode` based on all fields, which can cause issues with JPA proxies.

```java
@Entity
@Table(name = "emp")
@Getter
@Setter
@ToString
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "empId")
    private Long empId;

    @Column(name = "name", nullable = false)
    private String name;
}
```

### DTO / Model Layer

- Use separate classes for request (inbound) and response (outbound) DTOs.
- Annotate request DTOs with `@Getter`, `@Setter`, and `@ToString` (Lombok). Do **not** use `@Data`.
- Annotate request models with Jakarta Bean Validation constraints (`@NotBlank`, `@NotNull`, `@Positive`, `@Size`, `@Email`, etc.).
- Use custom constraint annotations (e.g., `@ValidPhoneNumber`) for domain-specific validation.
- Annotate response DTOs with `@JsonInclude(JsonInclude.Include.NON_NULL)` to suppress null fields in the serialised output.
- Never expose JPA entities directly in API responses.

```java
// Request DTO
@Getter
@Setter
@ToString
public class EmployeeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    @ValidPhoneNumber(message = "Phone number is invalid")
    @NotBlank(message = "Phone is required")
    private String phone;

    @NotNull(message = "Department ID is required")
    @Positive(message = "Department ID must be a positive number")
    private Long deptId;
}
```

```java
// Response DTO
@Getter
@Setter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeeResponse {

    private Long empId;
    private String name;
    private String address;
    private String phone;
    private Long deptId;
    private DepartmentResponse departmentResponse; // downstream enrichment, nullable
}
```

### Mapper Layer (MapStruct)

- Declare mapper interfaces with `@Mapper(componentModel = "spring")` so they are managed as Spring beans.
- Use `@Mapping(target = "...", ignore = true)` to exclude fields that should not be mapped (e.g., the primary key on updates).
- Use `@MappingTarget` for update methods that modify an existing entity in place.
- The mapper does **not** map enrichment fields (e.g., `departmentResponse`) — those are populated separately in the service after downstream calls.

```java
@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    // Maps request → entity (empId is excluded — it is auto-generated)
    Employee toEntity(EmployeeRequest request);

    // Maps entity → response
    EmployeeResponse toResponse(Employee employee);

    // In-place update: ignores empId so the primary key is never overwritten
    @Mapping(target = "empId", ignore = true)
    void updateEntityFromRequest(EmployeeRequest request, @MappingTarget Employee employee);
}
```

### Custom Constraint Validators

For domain-specific validation rules, create a custom constraint annotation in `util/validation/` paired with a `ConstraintValidator` implementation:

```java
// 1. Annotation
@Documented
@Constraint(validatedBy = PhoneNumberValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPhoneNumber {
    String message() default "Invalid phone number";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// 2. Validator implementation
@Slf4j
public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    // Expects format: (+65)XXXXXXXX
    private static final String PHONE_NUMBER_PATTERN = "^\\(\\+65\\)[0-9]{8}$";

    @Override
    public boolean isValid(String phoneField, ConstraintValidatorContext context) {
        log.info("Validating phone number...");
        if (phoneField == null || phoneField.isEmpty()) {
            return true; // defer null/blank check to @NotBlank
        }
        return phoneField.matches(PHONE_NUMBER_PATTERN);
    }
}
```

### Common Enums — `StatusCode`

The `StatusCode` enum in `common/enums/` defines the application-level status codes used by `ResponseBuilder`. Use these codes — **do not hardcode HTTP status strings**:

```java
public enum StatusCode {
    OK("0000", "OK"),
    SYSTEM_ERROR("0001", "System error"),
    INVALID_PARAMETER("0004", "Invalid parameter"),
    ACCESS_DENIED("0005", "Access denied"),
    INVALID_OPERATION("0006", "Invalid operation");

    private final String code;
    private final String message;

    StatusCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() { return code; }
    public String getMessage() { return message; }
}
```

### Standard Response Envelope

All API responses must use the `BaseResponse` envelope populated via `ResponseBuilder`.
`ResponseBuilder.error()` uses `StatusCode.ERROR.getCode()` for the code and the caller-supplied message as the message:

```java
// Success
return ResponseEntity.ok(ResponseBuilder.success(payload));

// Created
return ResponseEntity.status(HttpStatus.CREATED).body(ResponseBuilder.success(payload));

// Error
return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ResponseBuilder.error("Descriptive error message"));
```

`BaseResponse` structure (success):
```json
{
  "status": {
    "code": "0000",
    "message": "OK"
  },
  "data": { ... }
}
```

`BaseResponse` structure (error):
```json
{
  "status": {
    "code": "0001",
    "message": "System error"
  },
  "data": null
}
```

### Exception Handling

- Throw custom exceptions (`ResourceNotFoundException`, `UnauthorizedAccessException`) from the service layer.
- Catch all custom and generic exceptions centrally in `GlobalExceptionHandler` using `@ControllerAdvice` + `@ExceptionHandler`.
- Map each exception type to the correct HTTP status code.

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<String> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
```

---

## Cross-Cutting Concerns

### Correlation ID Filter

Every service must include a `CorrelationIdFilter` extending `OncePerRequestFilter` to:
1. Read the `X-Correlation-ID` header from the incoming request.
2. Generate a new UUID if the header is absent.
3. Store the correlation ID in the SLF4J MDC under the key `correlationId` for structured logging.
4. Set the correlation ID as a request attribute so downstream handlers can access it.
5. Always remove the MDC entry in a `finally` block after the filter chain completes to prevent thread-local leaks.

```java
@Component
public class CorrelationIdFilter extends OncePerRequestFilter {

    private static final String CORRELATION_ID = "X-Correlation-ID";
    private static final String CORRELATIONID_KEY = "correlationId";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String correlationId = request.getHeader(CORRELATION_ID);
        if (correlationId == null || correlationId.isEmpty()) {
            correlationId = UUID.randomUUID().toString();
        }
        MDC.put(CORRELATIONID_KEY, correlationId);
        try {
            request.setAttribute(CORRELATIONID_KEY, correlationId);
            filterChain.doFilter(request, response);
        } finally {
            MDC.remove(CORRELATIONID_KEY); // prevent thread-local leak
        }
    }
}
```

### Logging

#### Logging Framework
- Use SLF4J with Logback (`logback-spring.xml`).
- Add `@Slf4j` (Lombok) to service/controller classes and `LoggerFactory.getLogger()` for inner classes.

#### Log Levels (MPA Standard — IM8 Clause 9.1/G2)

| Level | When to use |
|-------|-------------|
| `DEBUG` | Detailed diagnostic info — method entry, intermediate values. Off in production. |
| `INFO` | Normal application behaviour — user actions, service started/stopped, request received. |
| `WARN` | Unusual situations that may become errors — retry attempts, slow DB queries, degraded state. |
| `ERROR` | Serious failures — dropped DB connection, failed API call; application continues but action failed. |
| `FATAL` | Critical — application is about to terminate. Trigger immediate alert. |

#### Log Format
All log entries must follow this format (configured in `logback-spring.xml`):

```
[datetime with ms, SG timezone] [thread] [level] [logger] [correlationId] message
```

Example output:
```
2025-06-09T13:55:36.123+08:00 [http-nio-8080-exec-1] [INFO ] [sg.gov.mpa.employee.service.EmployeeServiceImpl] [abc-123-def-456] User profile updated successfully
```

#### Log File Naming and Rotation
- File name format: `<system_name>_<microservice_name>_<YYYY-MM-DD>.log`
  - e.g., `finance_portal_payment_gateway_2024-12-25.log`
- Rotate logs **daily**; also rollover when file size reaches **10 MB**.
- Store past logs in compressed format.
- Retain logs for a **minimum of 1 year** (IM8 Clause 7.2/S6).

#### Log Forging Prevention
- Strip `\r`, `\n`, and `\t` from all log messages to prevent log injection.
- Configure this in the `logback-spring.xml` log pattern.

#### What to Log
- Application startup and shutdown.
- Every incoming request (at least method + path) and every outgoing request.
- Every database transaction.
- Exceptions: log once with full stack trace; do **not** log the same exception multiple times up the call stack.
- Correlation ID (from MDC key `correlationId`) must appear in every log entry.

#### Centralised Logging
- In addition to log files, log to **Azure Application Insights** and **Dynatrace** (MPA-mandated centralised logging).

#### What NOT to Log
- Passwords, tokens, credit card numbers, or any **PII**.
- Full exception stack traces to end-users (API responses) — only to log files.
- Generic `System.out.println` statements.

### Security

Configure Spring Security via `SecurityConfig`:
- Permit public paths (`/external/**`, Swagger, Actuator) without authentication.
- Require authentication for all other requests.
- Disable CSRF for stateless REST APIs.

```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/{service}/external/**",
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/actuator/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable());
        return http.build();
    }
}
```

### WebClient (Downstream Service Calls)

- Configure a `WebClient` bean in `WebClientConfig` using `WebClient.Builder`.
- Apply `@CircuitBreaker` and `@Retry` from Resilience4j on service methods that call downstream APIs.
- Define downstream base URLs in `application.yml` and inject via `@Value`.

```java
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient departmentWebClient(@Value("${department.service.url}") String baseUrl) {
        return WebClient.builder().baseUrl(baseUrl).build();
    }
}
```

---

## API Documentation (SpringDoc / Swagger)

- SpringDoc is enabled in `dev` / `test` profiles and disabled in `prod`.
- Access Swagger UI at `http://localhost:{port}/swagger-ui.html`.
- Annotate controllers with `@Tag`, `@Operation`, and `@ApiResponse` from `io.swagger.v3.oas.annotations` for accurate documentation.
- Configure a custom `OpenAPI` bean in `SwaggerConfig` to set the API title, version, and description.

```java
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Employee Service API")
                        .version("v1")
                        .description("MPA Employee Service REST API"));
    }
}
```

---

## Pagination

Use Spring Data's `Pageable` with `PageRequest` for paginated endpoints. Return results wrapped in a custom `PagedResponse<T>`.

`PagedResponse<T>` carries the full pagination metadata: `content`, `page`, `size`, `totalElements`, `totalPages`, `first`, `last`, `sortBy`, and `sortDirection`. Construct it using the no-args constructor and setters:

```java
// Service
@Override
public PagedResponse<EmployeeResponse> getAllEmployeeDetails(int page, int size, String sortBy, String sortDir) {
    logger.debug("Calling getAllEmployeeDetails pagination method...");
    Sort sort = sortDir.equalsIgnoreCase("desc")
            ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();
    Pageable pageable = PageRequest.of(page, size, sort);
    Page<Employee> employeePage = employeeRepository.findAll(pageable);

    List<EmployeeResponse> content = employeePage.getContent().stream()
            .map(employeeMapper::toResponse)
            .toList();

    PagedResponse<EmployeeResponse> response = new PagedResponse<>();
    response.setContent(content);
    response.setPage(employeePage.getNumber());
    response.setSize(employeePage.getSize());
    response.setTotalElements(employeePage.getTotalElements());
    response.setTotalPages(employeePage.getTotalPages());
    response.setFirst(employeePage.isFirst());
    response.setLast(employeePage.isLast());
    response.setSortBy(sortBy);
    response.setSortDirection(sortDir);
    return response;
}
```

In the controller, validate that the requested page does not exceed the total pages before returning:

```java
var pagedResponse = employeeService.getAllEmployeeDetails(page, size, sortBy, sortDir);
if (page >= pagedResponse.getTotalPages()) {
    return ResponseEntity.badRequest()
            .body(ResponseBuilder.error("Requested page " + page + " is out of range. Total pages: " + pagedResponse.getTotalPages()));
}
return ResponseEntity.ok(ResponseBuilder.success(pagedResponse.getContent()));
```

---

## Docker

The standard multi-stage `Dockerfile` follows this pattern:

1. **Stage 1 – Builder**: Use `maven:3.9.6-eclipse-temurin-21` to compile and package the JAR.
2. **Stage 2 – Runtime**: Use `eclipse-temurin:21-jdk`; create a non-root OS user (`mpauser`); copy only the JAR; set timezone to `Asia/Singapore`; expose the application port.

```dockerfile
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk
ENV TZ=Asia/Singapore
RUN groupadd -g 1001 mpa && useradd -u 1001 -g mpa -m -s /bin/bash mpauser
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/appl/{service}-0.0.1-SNAPSHOT.jar /app/app.jar
RUN chown mpauser:mpa /app/app.jar
USER mpauser
EXPOSE {port}
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Security requirements:**
- Always run as a non-root user in the container.
- Install `curl` only for health checks.
- Use `--no-install-recommends` and clean up package lists after installation.

---

## Testing

### Unit Testing
- Use **JUnit 5** + **Mockito** for unit tests.
- Use `spring-security-test` for security layer tests.
- Place test classes under `src/test/java` mirroring the main source package structure.
- Annotate service unit tests with `@ExtendWith(MockitoExtension.class)`.
- Annotate integration tests with `@SpringBootTest`.

```java
@ExtendWith(MockitoExtension.class)
class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @Test
    void createEmployee_shouldReturnResponse() {
        // given / when / then
    }
}
```

### What to Test
- All service implementation methods, including edge cases and exception paths.
- Custom constraint validators (e.g., `PhoneNumberValidator`).
- `GlobalExceptionHandler` responses.
- Repository query methods with `@DataJpaTest`.

---

## Security Best Practices

### Secure Coding
- Follow [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/) and the Singapore Government Developer Portal guidelines.
- Never log sensitive data (passwords, tokens, PII). Mask user IDs when logging per-request.
- Never hardcode credentials — use environment variables exclusively.
- Validate all user inputs and external data sources thoroughly.
- Do **not** catch generic `Exception` — catch the most specific exception class available.
- Never expose stack traces in API responses — log them server-side only.
- Set `ddl-auto: none` in all profiles; manage schema via versioned SQL scripts in `scripts/`.
- Disable Swagger UI in production (`springdoc.swagger-ui.enabled: false`).
- Run as a non-root user in Docker containers.

### Static Application Security Testing (SAST)
- Use **Checkmarx** for SAST, which includes two components:
  - **SCR (Source Code Review)**: scans for code-level vulnerabilities.
  - **OSA (Open Source Analysis)**: scans third-party libraries for known CVEs.
- Integrate Checkmarx into the CI/CD pipeline so SCR + OSA run automatically on every commit.
- All Checkmarx findings must be **resolved before raising a pull request**.
- Address all `HIGH` / `CRITICAL` dependency vulnerabilities before merging.

### Vulnerability Assessments (IM8 Clause C/ADS/4.1/S1)

| Activity | CII/SII + Internet-facing | Other Systems |
|----------|---------------------------|---------------|
| VA | Every 3 months | Risk-assessment-determined frequency |
| PT | Every 12 months | Risk-assessment-determined frequency |

---

## Development Process

### Running Locally

```bash
# Build (skip tests for speed during development)
mvn clean package -DskipTests

# Run with dev profile
SPRING_PROFILES_ACTIVE=dev \
SPRING_DATASOURCE_URL=jdbc:sqlserver://localhost:1433;databaseName=mydb \
SPRING_DATASOURCE_USERNAME=sa \
SPRING_DATASOURCE_PASSWORD=YourPassword \
mvn spring-boot:run

# Run via Docker Compose
docker-compose up --build
```

### Package Management
- Use Maven as the build and dependency management tool.
- Always commit `pom.xml` changes to version control.
- Run `mvn dependency:tree` to audit transitive dependencies.
- Pin explicit versions for all non-BOM-managed dependencies.
- Maintain a list of all third-party libraries and their end-of-life / end-of-support dates; proactively upgrade before EOL.

---

## Version Control

### Branching Strategy (Feature Branching)

All MPA projects follow the **Feature Branching** strategy in **Azure Repos (Git)**:

| Branch | Purpose |
|--------|---------|
| `main` | Production code |
| `uat` | UAT environment |
| `feature/<description>_<YYYYMMDD>` | New feature work |
| `bug/<description>_<YYYYMMDD>` | Bug fixes |

Examples:
```
feature/add-location-field_20250303
bug/location-field-not-displayed_20250202
```

### Commit Strategy
- Pull the latest code from the remote branch **at least once a day** to avoid conflicts.
- Commit **at least once a day** — only complete and well-tested code.
- Every commit must have a meaningful message following this format:

```
[Feature/Fix/Docs/Refactor/Test] <Title that accurately summarises the commit>

<Describe the commit in detail. Check spelling and formatting.>
```

Examples:
```
[Feature] Add employee search by department endpoint
[Fix] Resolve null pointer in EmployeeMapper when deptId is null
[Docs] Update Swagger annotations for EmployeeControllerV1
```

### Merging Strategy (Pull Requests)
Before merging to `main` or `uat`, a **pull request (PR)** must be raised and reviewed by a team lead.

**Before raising a PR, the developer must verify:**
- Code compiles without errors or warnings (`mvn clean package`)
- Unit tests written and passing (`mvn test`)
- Documentation updated in Azure DevOps Project Wiki
- Checkmarx SCR + OSA completed with no outstanding vulnerabilities

**PR Template:**
```markdown
## Description
<Describe the feature or bug fix. Include user story ID or defect ID.>

## PR Checklist
- [ ] Documentation updated in Azure DevOps Wiki
- [ ] Tests added for all changes, including edge cases
- [ ] All new and existing tests pass
- [ ] Code follows project style and naming conventions
- [ ] Lint checks pass with no new errors or warnings
- [ ] Checkmarx SCR + OSA completed with no outstanding findings
- [ ] All acceptance criteria met (for features)

## Does This Introduce a Breaking Change?
- [ ] Yes
- [ ] No

## Testing
<Describe test scenarios and test data used. For APIs, include sample requests.>
```

### Release Strategy (Semantic Versioning)
- Version format: `major.minor.patch`
  - **Major**: Breaking changes
  - **Minor**: New backwards-compatible functionality
  - **Patch**: Backwards-compatible bug fixes
- Tag each release: `v<version>_<YYYYMMDD>` — e.g., `v1.0.1_20240814`
- Maintain a **Changelog** in the Azure DevOps Wiki in reverse chronological order.

---

## Definition of Done

Every user story or task is considered **Done** only when ALL of the following are true:

- [ ] Unit tests written and passing
- [ ] Code review (pull request) complete and approved
- [ ] Documentation updated in Azure DevOps Project Wiki
- [ ] Checkmarx SCR + OSA complete with **no outstanding vulnerabilities**
- [ ] All acceptance criteria verified
- [ ] `mvn clean package -DskipTests` succeeds
- [ ] `mvn test` — all tests pass
