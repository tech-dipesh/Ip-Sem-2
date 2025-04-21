import { Router } from 'express';
import { authMiddleware, getProfileHandler } from '../controllers/auth';
import { requireAuth } from '@clerk/express';

const router = Router();

//i'm using function directly
router.get('/me', authMiddleware, getProfileHandler);

router.post('/logout', requireAuth(), (_req, res) => {
  res.json({ success: true });
});

export default router;