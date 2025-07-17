import { PrismaClient } from './client';

async function seed() {
    try {
        const quiz = await PrismaClient.quiz.update({
            where: {
                id: '6872a04f13457305e1bbfc19'
            },
            data: {
                copiedBy: {
                    connect: {
                        id: "6873d5137f36cf60cff4d7b1"
                    }
                }
            }
        });
        console.log(quiz)
    } catch (error) {
        console.error('Error while deleting users:', error);
    } finally {
        await PrismaClient.$disconnect();
    }
}

seed();
