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

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { clerkMiddleware } from '@clerk/express';
import authRoutes from './routes/authroutes';
import uploadRoutes from "./routes/upload";
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '3mb' })); // Increased JSON size limit for text analysis
app.use(clerkMiddleware());

app.use(fileUpload({
  limits: { fileSize: 3 * 1024 * 1024 },
  abortOnLimit: true
}));

app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));