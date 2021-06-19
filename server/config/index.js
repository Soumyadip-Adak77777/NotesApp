import dotenv from 'dotenv';

dotenv.config();

export const {
    PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET,
    REF_SECRET,
    APP_URL
}=process.env;