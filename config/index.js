import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
