export async function authMiddleware(req: Request & { user?: any }, res: Response, next: Function) {
  const authorizationHeader =
    typeof Headers !== "undefined" && req.headers instanceof Headers
      ? req.headers.get("authorization")
      : "authorization" in req.headers
        ? req.headers.authorization
        : undefined;

  const token = authorizationHeader && typeof authorizationHeader === "string" ? authorizationHeader.replace("Bearer ", "") : undefined;

  if (!token) {
    return next();
  }

  try {
    const user = await verifyToken(token);

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    next();
  }
}
function verifyToken(token: string) {
    throw new Error("Function not implemented.");
}

