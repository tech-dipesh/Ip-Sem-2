export interface ResumePayload {
  text: string;
}

export interface ReviewResult {
  score: number;
  summary: string;
  keywordsMissing: string[];
}