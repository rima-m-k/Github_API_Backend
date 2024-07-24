// Custom type declarations

declare namespace Express {
  // Custom Request with token payload
  interface Request {
    authUser?: {
      username: string;
      role: string;
    };
  }
}
