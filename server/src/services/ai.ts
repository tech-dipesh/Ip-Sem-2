import fetch from 'node-fetch';

export const reviewText = async (text: string): Promise<any> => {
  const response = await fetch('https://api.generative.googleapis.com/v1beta2/models/text-bison-001:generateMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `You are an HR reviewer. Review this resume text, rate out of 100 as an ATS score, identify missing keywords, and suggest improvements:\n\n${text}`,
    }),
  });
  if (!response.ok) throw new Error(`AI API error ${response.status}`);
  return response.json();
};