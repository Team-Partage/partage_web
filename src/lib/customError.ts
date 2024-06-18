export class CustomError extends Error {
  response?: {
    code: number;
    status: string;
    message: string;
  };
}
