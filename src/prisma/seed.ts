import { Prisma } from '../generated/prisma';
import client from './client';

async function createQuiz(data: Prisma.QuizCreateInput) {
    const quiz = await client.quiz.create({ data: data });
    console.dir(`Created one ${JSON.stringify(quiz)}`);
}
async function findQuiz(where: Prisma.QuizWhereUniqueInput) {
    const quiz = await client.quiz.findUnique({
        where: where,
    });
    console.dir(`Found one ${JSON.stringify(quiz)}`);
}

async function deleteQuiz(where: Prisma.QuizWhereUniqueInput) {
    const quiz = await client.quiz.delete({
        where: where,
    });
    console.dir(`Deleted one ${JSON.stringify(quiz)}`);
}

async function createQuestion(data: Prisma.QuestionCreateInput) {
    const question = await client.question.create({
        data: data,
    });
    console.dir(`Created one ${JSON.stringify(question)}`);
}
async function findQuestion(where: Prisma.QuestionWhereUniqueInput) {
    const question = await client.question.findUnique({
        where: where,
    });
    console.dir(`Found one ${JSON.stringify(question)}`);
}

// createQuestion({
//     type: 'singleChoice',
//     data: {},
//     quiz: { connect: { id: '676c30d7c831d142e7313233' } },
// });
// findQuiz({ id: '676c30d7c831d142e7313233' });
