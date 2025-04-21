"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = require("../controllers/upload");
const express_2 = require("@clerk/express");
// Create the router only once
const router = express_1.default.Router();
// Set up your routes
router.post('/upload', (0, express_2.requireAuth)(), upload_1.handleUpload);
exports.default = router;
