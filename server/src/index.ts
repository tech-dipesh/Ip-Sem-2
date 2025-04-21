import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { clerkMiddleware } from '@clerk/express';
import authRoutes from './routes/authroutes';
import uploadRoutes from "./routes/upload"

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(fileUpload());
app.use(clerkMiddleware());

app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));