declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            HOST: string;
            DATABASE_URL: string;
            NODE_ENV: 'development' | 'production';
            SECRET_KEY: string;
        }
    }
}

export { };
