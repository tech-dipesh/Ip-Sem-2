import { Request, Response } from 'express';
import { requireAuth } from '@clerk/express';

export const getProfile = [
  requireAuth(),
  (req: Request, res: Response) => {
    res.json({
      userId: req.auth.userId,
      email: req.auth.sessionClaims.email,
      firstName: req.auth.sessionClaims.firstName,
      lastName: req.auth.sessionClaims.lastName,
    });
  },
];