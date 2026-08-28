# Backend Testing Rules


Unit:

JUnit 5
Mockito


Service tests:

- Success case
- Validation failure
- Not found


Controller tests:

@SpringBootTest
@AutoConfigureMockMvc


Coverage:

Happy path
Error path
Security cases