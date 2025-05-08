import express from 'express';
import { requireAuth } from '@clerk/express';

//types of clerk
type ClerkRequest = express.Request & {
  auth: {
    userId: string;
    sessionClaims: {
      email: string;
      firstName: string;
      lastName: string;
    }
  }
};

// clerkk authentication and authorization,
export const authMiddleware = requireAuth();
export const getProfileHandler = (req: express.Request, res: express.Response): void => {
  const clerkReq = req as ClerkRequest;
  
  if (!clerkReq.auth) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  
  // details that we collect from clerk and store on clerk
  res.json({
    userId: clerkReq.auth.userId,
    email: clerkReq.auth.sessionClaims.email,
    firstName: clerkReq.auth.sessionClaims.firstName,
    lastName: clerkReq.auth.sessionClaims.lastName,
  });
};
export const getProfile = [authMiddleware, getProfileHandler];