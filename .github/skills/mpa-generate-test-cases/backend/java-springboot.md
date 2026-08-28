# Java Spring Boot Development Rules

## Technology Stack

- Java 21
- Spring Boot 3.5.3
- Maven 3.9+
- Spring Web MVC
- Spring Data JPA
- Spring Security

## Coding Rules

- Use constructor injection
- Do not use @Autowired
- Use @Slf4j for logging
- Use Lombok:
  - @Getter
  - @Setter
  - @ToString
  - Do not use @Data
  - Do not use @Builder

Avoid:
- @Data on Entity classes
- Field injection
- Static service calls

## Package Convention

controller/
service/
repository/
entity/
mapper/
model/
exception/
config/
util/


