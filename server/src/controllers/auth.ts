import express from 'express';
import { requireAuth } from '@clerk/express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

type ClerkRequest = express.Request & ClerkExpressRequireAuth;

export const getProfile = [
  requireAuth(),
  (req: ClerkRequest, res: express.Response) => {
    res.json({
      userId: req.auth.userId,
      email: req.auth.sessionClaims.email,
      firstName: req.auth.sessionClaims.firstName,
      lastName: req.auth.sessionClaims.lastName,
    });
  },
];