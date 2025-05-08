
import express from 'express';
import { handleUpload } from '../controllers/upload(no)';

import { handleTextAnalysis } from '../controllers/analyze-text(no)';
import { requireAuth } from '@clerk/express';

// Create the router only once
const router = express.Router();

// Set up your routes
router.post('/upload', requireAuth(), handleUpload);
router.post('/analyze-text', requireAuth(), handleTextAnalysis);

export default router;