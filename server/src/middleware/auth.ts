
import { requireAuth } from '@clerk/express';
import { ClerkExpressRequireAuth } from '@clerk/express';

const requireAuth = ClerkExpressRequireAuth();

export default requireAuth;
