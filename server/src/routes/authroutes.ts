import { Router } from 'express';
import { getProfile } from '../controllers/auth';
import { requireAuth } from '@clerk/express';

const router = Router();
router.get('/me', getProfile);
router.post('/logout', requireAuth(), (_req, res) => {
  res.json({ success: true });
});
export default router;