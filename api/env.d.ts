declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        API_URL: string;
        SUPER_SECRET_KEY: string;
    }
}