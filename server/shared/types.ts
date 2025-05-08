// All of the typescript types add here
declare module 'express' {
  interface Request {
    auth?: {
      userId: string;
      sessionClaims: Record<string, any>;
    };
    files?: {
      [fieldname: string]: {
        data: Buffer;
        name: string;
        size: number;
        encoding: string;
        tempFilePath: string;
        truncated: boolean;
        mimetype: string;
        md5: string;
        mv: Function;
      } | {
        data: Buffer;
        name: string;
        size: number;
        encoding: string;
        tempFilePath: string;
        truncated: boolean;
        mimetype: string;
        md5: string;
        mv: Function;
      }[];
    };
  }
}