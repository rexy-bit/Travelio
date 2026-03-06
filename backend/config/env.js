import {config} from "dotenv"


config({path : `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT,
    NODE_ENV,
    ACCESS_TOKEN_SECRET,
    DATABASE_URL,
REFRESH_TOKEN_SECRET,
ACCESS_TOKEN_EXPIRATION,
REFRESH_TOKEN_EXPIRATION,
} = process.env;