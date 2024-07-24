// Error responses templates

export default class ErrorResponses extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  // Unauthorized or Invalid Credentials
  static unauthorized(invalidData: string): ErrorResponses {
    return new ErrorResponses(401, invalidData);
  }

  // No user found
  static noUserFound(username: string): ErrorResponses {
    return new ErrorResponses(404, `User not found for ${username}`);
  }

  // Invalid Username / Bad request
  static invalidUsername(message?: string): ErrorResponses {
    return new ErrorResponses(400, message || "Invalid Username");
  }

  // Internal Server Error
  static internalServer(): ErrorResponses {
    return new ErrorResponses(500, "Internal server error");
  }

  // Not found API end points
  static endPointNotFound(url: string): ErrorResponses {
    return new ErrorResponses(404, `Cannot find ${url} on this server.`);
  }

  // Custom Error
  static customError(message: string): ErrorResponses {
    return new ErrorResponses(400, message);
  }
}
