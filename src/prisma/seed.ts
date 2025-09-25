import { QuizService } from '@modules/Quiz';
import { PrismaClient } from './client';

async function seed() {
    try {
        await QuizService.updateAccess(
            '687b95d119cd654c8c816079',
            '68d03cc67f8bbf9486370013',
            'SecondUser',
            'VIEWER',
        );
    } catch (error) {
        console.error('Error while deleting users:', error);
    } finally {
        await PrismaClient.$disconnect();
    }
}

seed();
