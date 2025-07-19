import { PrismaClient } from './client';

async function seed() {
    try {
        const teacher = await PrismaClient.quiz.create({
            data: {
                title: 'quiz 1',
                subjectId: '687b89fba9fecf3b90da849a',
                createdById: '687b95d119cd654c8c816079',
                ownedById: '687b95d119cd654c8c816079',
                tags: { connect: { id: '687b8cf48b8183104da8cd44' } },
            },
        });
        console.log(teacher);
    } catch (error) {
        console.error('Error while deleting users:', error);
    } finally {
        await PrismaClient.$disconnect();
    }
}

seed();
