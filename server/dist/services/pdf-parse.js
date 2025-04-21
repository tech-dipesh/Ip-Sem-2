"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePDF = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const parsePDF = async (buffer) => {
    const { text, numpages } = await (0, pdf_parse_1.default)(buffer, { max: 3 });
    if (numpages > 3)
        throw new Error('PDF exceeds 3 pages');
    if (text.trim().length < 50)
        throw new Error('PDF appears to be image-based or contains no text');
    return text;
};
exports.parsePDF = parsePDF;
