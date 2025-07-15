import { PrismaClient } from '@prisma';
import app from '.';
import { env } from '../config/env.config';

async function startServer() {
    try {
        app.listen(env.PORT, env.HOST, () => {
            console.log(`Server started http://${env.HOST}:${env.PORT}`);
        });
        await PrismaClient.$connect();
    } catch (error) {
        await PrismaClient.$disconnect();
        console.log(`Server stopped with error ${error}`);
        process.exit(1);
    }
}

startServer();
