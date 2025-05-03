"use strict";
// import dotenv from 'dotenv';
// import path from "path"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewText = void 0;
// // dotenv.config({ path: path.resolve(__dirname, '../.env') });
// // dotenv.config()
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// // console.log("__dirname is", __dirname);
// import fetch from 'node-fetch';
// const apiKey="AAIzaSyA77IdQ0IOvUqhrzjgz3SrrpPQ1EkWfOSw";
// if(!apiKey) throw new Error ("api Key is not exist")
// // server/src/services/ai.ts
// export const reviewText = async (text: string): Promise<string> => {
//   try {
//     const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-goog-api-key': apiKey,
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: `Analyze this resume and provide specific, actionable suggestions. Focus on:
//             1. ATS optimization (score 0-100)
//             2. Missing hard skills
//             3. Missing soft skills
//             4. Formatting issues
//             5. Keyword optimization
//             Resume: ${text.substring(0, 30000)}` // Limit input size
//           }]
//         }]
//       }),
//     });
//     if (!response.ok) {
//       throw new Error(`AI API error: ${response.statusText}`);
//     }
//     // const data = await response.json();
//     const data = await response.json() as any; // Add type assertion
//     return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available';
//   } catch (error) {
//     console.error('AI Service Error:', error);
//     throw new Error('Failed to analyze resume');
//   }
// };
// server/src/services/ai.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const apiKey = process.env.GEMINI_API_KEY;
const reviewText = async (text) => {
    try {
        // Validate API key first
        if (!apiKey || apiKey.length < 30) {
            throw new Error('Invalid API key configuration');
        }
        const response = await (0, node_fetch_1.default)('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: [{
                        parts: [{
                                text: `Analyze this resume and provide specific suggestions in bullet points. Focus on:
                1. ATS optimization score (0-100)
                2. Missing hard/soft skills
                3. Formatting issues
                4. Keyword optimization
                Resume: ${text.substring(0, 30000)}`
                            }]
                    }]
            }),
        });
        // Check response status before processing
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Gemini API Error:', {
                status: response.status,
                statusText: response.statusText,
                errorBody
            });
            throw new Error(`AI API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available';
    }
    catch (error) {
        console.error('AI Service Error:', error);
        throw new Error('Failed to analyze resume. Please try again later.');
    }
};
exports.reviewText = reviewText;
