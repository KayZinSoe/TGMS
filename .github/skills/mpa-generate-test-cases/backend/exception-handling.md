# Exception Handling


Use:

GlobalExceptionHandler


Exceptions:

ResourceNotFoundException
UnauthorizedAccessException
InvalidRequestException


Never:

try/catch every controller method


Prefer:

throw exception

handled centrally.