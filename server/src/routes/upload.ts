// import express from 'express';
// import { handleUpload } from '../controllers/upload';
// import { requireAuth } from '@clerk/express';

// // Create the router only once
// const router = express.Router();

// // Set up your routes
// router.post('/upload', requireAuth(), handleUpload);

// export default router;
// server/src/routes/upload.ts
import express from 'express';
import { handleUpload } from '../controllers/upload';
import { handleTextAnalysis } from '../controllers/analyze-text';
import { requireAuth } from '@clerk/express';

// Create the router only once
const router = express.Router();

// Set up your routes
router.post('/upload', requireAuth(), handleUpload);
router.post('/analyze-text', requireAuth(), handleTextAnalysis);

export default router;