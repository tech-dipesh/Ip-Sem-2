"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_no_1 = require("../controllers/upload(no)");
const analyze_text_no_1 = require("../controllers/analyze-text(no)");
const express_2 = require("@clerk/express");
// Create the router only once
const router = express_1.default.Router();
// Set up your routes
router.post('/upload', (0, express_2.requireAuth)(), upload_no_1.handleUpload);
router.post('/analyze-text', (0, express_2.requireAuth)(), analyze_text_no_1.handleTextAnalysis);
exports.default = router;
