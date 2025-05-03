"use strict";
// import express from 'express';
// import { reviewText } from '../services/ai';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTextAnalysis = void 0;
const ai_1 = require("../services/ai");
const handleTextAnalysis = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string' || text.trim().length < 50) {
            res.status(400).json({ error: 'Valid resume text is required (minimum 50 characters)' });
            return;
        }
        const aiResponse = await (0, ai_1.reviewText)(text);
        const suggestions = extractSuggestionsFromAIResponse(aiResponse);
        res.status(200).json({ suggestions });
    }
    catch (err) {
        console.error('Text Analysis error:', err);
        const error = err;
        res.status(500).json({
            error: error.message || 'Internal server error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
exports.handleTextAnalysis = handleTextAnalysis;
// Helper function to parse AI response - same as in upload controller
function extractSuggestionsFromAIResponse(aiResponse) {
    // Simple parsing approach - split by line breaks and filter out empty lines
    const lines = aiResponse.split('\n').filter(line => line.trim().length > 0);
    // You may need a more sophisticated parsing approach depending on AI output format
    return lines;
}
