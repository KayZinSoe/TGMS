# API Integration Rules


Frontend consumes APIs only.

Frontend must NOT:

- Create APIs
- Modify backend
- Handle database logic


Use:

services/

Example:

services/userService.ts


All API calls:

- Handle loading
- Handle error
- Handle timeout