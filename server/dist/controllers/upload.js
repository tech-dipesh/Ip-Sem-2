"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = void 0;
const pdf_parse_1 = require("../services/pdf-parse");
const ai_1 = require("../services/ai");
const handleUpload = async (req, res) => {
    const file = req.files?.file;
    if (!file || Array.isArray(file)) {
        res.status(400).json({ error: 'No file provided' });
        return;
    }
    const buffer = file.data;
    try {
        const text = await (0, pdf_parse_1.parsePDF)(buffer);
        const review = await (0, ai_1.reviewText)(text);
        res.json(review);
    }
    catch (err) {
        res.status(422).json({ error: err.message });
    }
};
exports.handleUpload = handleUpload;
