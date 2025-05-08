"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = void 0;
const pdf_parse_1 = require("../services/pdf-parse");
const ai_1 = require("../services/ai");
// server/src/controllers/upload.ts
const handleUpload = async (req, res) => {
    try {
        const file = req.files?.file;
        if (!file || Array.isArray(file)) {
            res.status(400).json({ error: 'No file provided' });
            return;
        }
        // Add file validation
        if (file.mimetype !== 'application/pdf') {
            res.status(400).json({ error: 'Only PDF files are allowed' });
            return;
        }
        const buffer = file.data;
        const text = await (0, pdf_parse_1.parsePDF)(buffer);
        const aiResponse = await (0, ai_1.reviewText)(text);
        const suggestions = extractSuggestionsFromAIResponse(aiResponse);
        res.status(200).json({ suggestions });
    }
    catch (err) {
        console.error('Upload error:', err);
        const error = err;
        res.status(500).json({
            error: error.message || 'Internal server error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
exports.handleUpload = handleUpload;
// Helper function to parse AI response
function extractSuggestionsFromAIResponse(aiResponse) {
    // Simple parsing approach - split by line breaks and filter out empty lines
    const lines = aiResponse.split('\n').filter(line => line.trim().length > 0);
    // You may need a more sophisticated parsing approach depending on AI output format
    return lines;
}
