"use strict";
// import express from 'express';
// import cors from 'cors';
// import fileUpload from 'express-fileupload';
// import { clerkMiddleware } from '@clerk/express';
// import authRoutes from './routes/authroutes';
// import uploadRoutes from "./routes/upload"
// import dotenv from "dotenv"
// import path from 'path';
// dotenv.config(); 
//   dotenv.config({ path: path.resolve(__dirname, '../../.env') });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//   // console.log("__dirname is", __dirname);
// // console.log("index clerk key is", !!process.env.CLERK_SECRET_KEY);
// // console.log("index gemini key is:", !!process.env.GEMINI_API_KEY);
// const app = express();
// app.use(cors({ origin: 'http://localhost:5173',
//   credentials: true
//  }));
// app.use(express.json());
// app.use(clerkMiddleware());
// // app.use(fileUpload());
// // app.use(fileUpload({
// //   limits: { fileSize: 3 * 1024 * 1024 }, 
// //   // it wil set the limite of the 3 mb
// //   abortOnLimit: true
// // }));
// // server/src/index.ts
// // Remove duplicate fileUpload middleware and configure once:
// app.use(fileUpload ({
//   limits: { fileSize: 3 * 1024 * 1024 },
//   abortOnLimit: true
// }));
// app.use('/api/auth', authRoutes);
// app.use('/api', uploadRoutes);
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_2 = require("@clerk/express");
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const upload_1 = __importDefault(require("./routes/upload"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json({ limit: '3mb' })); // Increased JSON size limit for text analysis
app.use((0, express_2.clerkMiddleware)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 3 * 1024 * 1024 },
    abortOnLimit: true
}));
app.use('/api/auth', authroutes_1.default);
app.use('/api', upload_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
