import { cleanEnv, host, port, str } from 'envalid';
import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

export const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    SECRET_KEY: str(),
    PORT: port({ default: 3000 }),
    HOST: host({ default: '0.0.0.0' }),
    NODE_ENV: str({
        choices: ['development', 'production'],
        default: 'development',
    }),
});
