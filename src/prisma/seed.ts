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
                userId: '6872a04f13457305e1bbfc16',
            },
            data: {
                createdQuizzes: {
                    create: {
                        title: 'Quiz 2',
                        subject: {
                            create: {
                                name: 'English',
                                slug: 'english',
                            },
                        },
                        tags: {
                            create: {
                                name: 'For adults',
                                slug: 'for-adults',
                            },
                        },
                        languages: {
                            connectOrCreate: [
                                {
                                    where: {
                                        name: 'English',
                                    },
                                    create: {
                                        name: 'English',
                                        slug: 'english',
                                    },
                                },
                                {
                                    create: {
                                        name: 'Spanish',
                                        slug: 'spanish',
                                    },
                                    where: {
                                        name: 'Spanish',
                                    },
                                },
                            ],
                        },
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

