import { Request, Response } from 'express';
import { parsePDF } from '../services/pdf';
import { reviewText } from '../services/ai';

export const handleUpload = async (req: Request, res: Response) => {
  const file = req.files?.file;
  if (!file || Array.isArray(file)) return res.status(400).json({ error: 'No file provided' });
  const buffer = file.data;
  try {
    const text = await parsePDF(buffer);
    const review = await reviewText(text);
    res.json(review);
  } catch (err) {
    res.status(422).json({ error: (err as Error).message });
  }
};