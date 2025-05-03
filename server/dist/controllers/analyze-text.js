"use strict";
// import express from 'express';
// import { reviewText } from '../services/ai';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTextAnalysis = void 0;
const ai_1 = require("../services/ai");
const handleTextAnalysis = async (req, res) => {
    try {
        console.log('Received text analysis request');
        const { text } = req.body;
        // Log the request structure (without the full text content)
        console.log('Request body structure:', {
            hasText: !!text,
            textType: typeof text,
            textLength: text ? text.length : 0
        });
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
        console.log(`Processing resume text of length: ${text.length}`);
        const aiResponse = await (0, ai_1.reviewText)(text);
        console.log('AI response received successfully');
        const suggestions = aiResponse.split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => line.trim());
        res.status(200).json({ suggestions });
    }
    catch (err) {
        console.error('Text Analysis Error:', {
            error: err,
            message: err instanceof Error ? err.message : 'Unknown error',
            stack: err instanceof Error ? err.stack : undefined
        });
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({
            error: `Resume analysis failed: ${errorMessage}`,
            ...(process.env.NODE_ENV === 'development' && { stack: err instanceof Error ? err.stack : undefined })
        });
    }
};
exports.handleTextAnalysis = handleTextAnalysis;
