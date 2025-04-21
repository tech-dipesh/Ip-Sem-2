declare module 'express' {
  interface Request {
    auth?: {
      userId: string;
      sessionClaims: Record<string, any>;
    };
  }
}