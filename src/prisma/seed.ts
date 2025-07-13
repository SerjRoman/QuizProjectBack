import client from './client';

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
        const user = await client.teacherProfile.update({
            where: {
                userId: '6873d3d88641dc3e69f11939',
            },
            data: {
                createdQuizzes: {
                    create: {
                        title: 'Quiz 3',
                        subjectId: '6872a04f13457305e1bbfc18',
                        tagsIds: [
                            '6872b492759dde443f58194d',
                            '6872b74244243c35c544c498',
                        ],
                    },
                },
            },
        });
        console.log(user);
        // console.log(quiz);
    } catch (error) {
        console.error('Error while deleting users:', error);
    } finally {
        await client.$disconnect();
    }
}

seed();
