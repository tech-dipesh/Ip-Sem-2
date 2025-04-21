import { Router } from 'express';
import { handleUpload } from '../controllers/upload';
import { requireAuth } from '@clerk/express';

const router = Router();
router.post('/upload', requireAuth(), handleUpload);
export default router;