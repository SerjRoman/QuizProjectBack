import { Prisma, Quiz as QuizPrisma } from '@prisma/client';
import { Question } from '../Question/question.types';

export type Quiz = QuizPrisma;

export type QuizWithQuestions = Quiz & { questions: Question[] };

export type QuizCreateInput = Prisma.QuizCreateInput 