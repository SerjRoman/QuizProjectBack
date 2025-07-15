import { PrismaClient } from './client';

async function seed() {
    try {
        // const quiz = await client.quiz.create({
        //     data: {
        //         title: 'Quiz 1',
        //         subject: {
        //             create: {
        //                 slug: 'maths',
        //                 name: 'Mathematics'
        //             }
        //         },
        //     }
        // });
        const user = await PrismaClient.user.findUnique({
            where: {
                id: '',
            },
        });
        console.log(user);
        // console.log(quiz);
    } catch (error) {
        console.error('Error while deleting users:', error);
    } finally {
        await PrismaClient.$disconnect();
    }
}

seed();
