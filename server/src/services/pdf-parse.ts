import pdfParse from 'pdf-parse';

export const parsePDF = async (buffer: Buffer): Promise<string> => {
  const { text, numpages } = await pdfParse(buffer, { max: 3 });
  
  if (numpages > 3) throw new Error('PDF exceeds 3 pages');
  if (text.trim().length < 50) throw new Error('PDF appears to be image-based or contains no text');
  
  return text;
};