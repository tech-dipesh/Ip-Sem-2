import express from 'express';
import { handleUpload } from '../controllers/upload';
import { requireAuth } from '@clerk/express';

// Create the router only once
const router = express.Router();

// Set up your routes
router.post('/upload', requireAuth(), handleUpload);

export default router;