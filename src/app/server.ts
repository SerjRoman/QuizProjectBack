import app from '.';
import { HOST, PORT } from '../config/config';
import client from '../prisma/client';

async function startServer() {
    try {
        app.listen(PORT, HOST, () => {
            console.log(`Server started http://localhost:3000`);
        });
        await client.$connect();
    } catch (error) {
        await client.$disconnect();
        console.log(`Server stopped with error ${error}`);
        process.exit(1);
    }
}

startServer();
