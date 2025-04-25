"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_2 = require("@clerk/express");
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const upload_1 = __importDefault(require("./routes/upload"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// console.log("__dirname is", __dirname);
// console.log("index clerk key is", !!process.env.CLERK_SECRET_KEY);
// console.log("index gemini key is:", !!process.env.GEMINI_API_KEY);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)());
// app.use(fileUpload());
// app.use(fileUpload({
//   limits: { fileSize: 3 * 1024 * 1024 }, 
//   // it wil set the limite of the 3 mb
//   abortOnLimit: true
// }));
// server/src/index.ts
// Remove duplicate fileUpload middleware and configure once:
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 3 * 1024 * 1024 },
    abortOnLimit: true
}));
app.use('/api/auth', authroutes_1.default);
app.use('/api', upload_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
