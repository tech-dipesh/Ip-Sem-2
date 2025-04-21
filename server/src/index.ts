import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { clerkMiddleware } from '@clerk/express';
import authRoutes from './routes/authroutes';
import uploadRoutes from "./routes/upload"
import dotenv from "dotenv"
dotenv.config(); 

const app = express();
app.use(cors({ origin: 'http://localhost:5173',
  credentials: true
 }));
app.use(express.json());
app.use(fileUpload());
app.use(clerkMiddleware());
app.use(fileUpload({
  limits: { fileSize: 3 * 1024 * 1024 }, 
  // it wil set the limite of the 3 mb
  abortOnLimit: true
}));

app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));