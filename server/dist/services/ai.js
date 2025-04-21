"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewText = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const reviewText = async (text) => {
    const response = await (0, node_fetch_1.default)('https://api.generative.googleapis.com/v1beta2/models/text-bison-001:generateMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
            prompt: `You are an HR reviewer. Review this resume text, rate out of 100 as an ATS score, identify missing keywords, and suggest improvements:\n\n${text}`,
        }),
    });
    if (!response.ok)
        throw new Error(`AI API error ${response.status}`);
    return response.json();
};
exports.reviewText = reviewText;
