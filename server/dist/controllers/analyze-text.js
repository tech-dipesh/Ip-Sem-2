"use strict";
// import express from 'express';
// import { reviewText } from '../services/ai';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTextAnalysis = void 0;
const ai_1 = require("../services/ai");
const handleTextAnalysis = async (req, res) => {
    try {
        const { text } = req.body;
        // Enhanced validation
        if (typeof text !== 'string') {
            res.status(400).json({
                error: 'Invalid text format - must be string',
                received_type: typeof text
            });
            return;
        }
        if (!text || text.trim().length < 50) {
            res.status(400).json({
                error: 'Resume text must be at least 50 characters',
                received_length: text.length
            });
            return;
        }
        const aiResponse = await (0, ai_1.reviewText)(text);
        const suggestions = aiResponse.split('\n').filter(line => line.trim().length > 0);
        res.status(200).json({ suggestions });
    }
    catch (err) {
        console.error('Text Analysis Error:', {
            error: err,
            requestBody: req.body,
            textLength: req.body.text?.length
        });
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({
            error: errorMessage,
            ...(process.env.NODE_ENV === 'development' && { stack: err instanceof Error ? err.stack : undefined })
        });
    }
};
exports.handleTextAnalysis = handleTextAnalysis;
