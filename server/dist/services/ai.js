"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewText = void 0;
console.log(process.env.GEMINI_API_KEY);
const node_fetch_1 = __importDefault(require("node-fetch"));
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey)
    throw new Error("api Key is not exist");
const reviewText = async (text) => {
    const response = await (0, node_fetch_1.default)('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
            contents: [{
                    parts: [{
                            text: `Analyze this resume for ATS compatibility. Provide:\n
          1. ATS score (0-100)\n
          2. Missing keywords\n
          3. Improvement suggestions\n\n
          Resume: ${text}`
                        }]
                }]
        }),
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis failed';
};
exports.reviewText = reviewText;
