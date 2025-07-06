declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            HOST: string;
            DATABASE_URL: string;
            NODE_ENV: 'development' | 'production';
            SECRET_KEY: string;
            REFRESH_SECRET_KEY: string;
            JWT_EXPIRES_IN: StringValue;
            REFRESH_JWT_EXPIRES_IN: StringValue;
        }
    }
}

export { };
