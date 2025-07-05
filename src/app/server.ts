import app from '.';
import { env } from '../config/env.config';
import client from '../prisma/client';

async function startServer() {
    try {
        app.listen(env.PORT, env.HOST, () => {
            console.log(`Server started http://${env.HOST}:${env.PORT}`);
        });
        await client.$connect();
    } catch (error) {
        await client.$disconnect();
        console.log(`Server stopped with error ${error}`);
        process.exit(1);
    }
}

startServer();
