"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewText = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// dotenv.config({ path: path.resolve(__dirname, '../.env') });
// dotenv.config()
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// console.log("__dirname is", __dirname);
const node_fetch_1 = __importDefault(require("node-fetch"));
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey)
    throw new Error("api Key is not exist");
// server/src/services/ai.ts
const reviewText = async (text) => {
    try {
        const response = await (0, node_fetch_1.default)('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: [{
                        parts: [{
                                text: `Analyze this resume and provide specific, actionable suggestions. Focus on:
              1. ATS optimization (score 0-100)
              2. Missing hard skills
              3. Missing soft skills
              4. Formatting issues
              5. Keyword optimization
              
              Resume: ${text.substring(0, 30000)}` // Limit input size
                            }]
                    }]
            }),
        });
        if (!response.ok) {
            throw new Error(`AI API error: ${response.statusText}`);
        }
        // const data = await response.json();
        const data = await response.json(); // Add type assertion
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available';
    }
    catch (error) {
        console.error('AI Service Error:', error);
        throw new Error('Failed to analyze resume');
    }
};
exports.reviewText = reviewText;
