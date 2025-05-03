"use strict";
// import express from 'express';
// import { handleUpload } from '../controllers/upload';
// import { requireAuth } from '@clerk/express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Create the router only once
// const router = express.Router();
// // Set up your routes
// router.post('/upload', requireAuth(), handleUpload);
// export default router;
// server/src/routes/upload.ts
const express_1 = __importDefault(require("express"));
const upload_1 = require("../controllers/upload");
const analyze_text_1 = require("../controllers/analyze-text");
const express_2 = require("@clerk/express");
// Create the router only once
const router = express_1.default.Router();
// Set up your routes
router.post('/upload', (0, express_2.requireAuth)(), upload_1.handleUpload);
router.post('/analyze-text', (0, express_2.requireAuth)(), analyze_text_1.handleTextAnalysis);
exports.default = router;
