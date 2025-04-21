import express from 'express';
import { UploadedFile } from 'express-fileupload';
import { parsePDF } from '../services/pdf-parse';
import { reviewText } from '../services/ai';

export const handleUpload = async (req: express.Request, res: express.Response): Promise<void> => {
  const file = req.files?.file as UploadedFile | undefined;
  if (!file || Array.isArray(file)) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }
  
  const buffer = file.data;
  try {
    const text = await parsePDF(buffer);
    const review = await reviewText(text);
    res.json(review);
  } catch (err) {
    res.status(422).json({ error: (err as Error).message });
  }
};