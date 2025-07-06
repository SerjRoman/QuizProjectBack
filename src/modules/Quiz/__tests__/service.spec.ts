import { QuizRepository } from '../quiz.repository';
import { QuizService } from '../quiz.service';
import {
    createManyQuizzes,
    createManyQuizzesWithQuestions,
    createQuiz,
} from './factories/quiz.factory';

jest.mock('../quiz.repository.ts');

const mockedQuizRepository = QuizRepository as jest.Mocked<
    typeof QuizRepository
>;

describe('QuizService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getAll', () => {
        it('should call QuizRepository and return the result', async () => {
            const mockedQuizzes = createManyQuizzes(5);
            mockedQuizRepository.getAll.mockResolvedValue(mockedQuizzes);
            const result = await QuizService.getAll({}, {});
            expect(result).toBe(mockedQuizzes);
        });
    });
    describe('getAllWithQuestions', () => {
        it('should call QuizRepository and return many quizzes with questions', async () => {
            const mockedQuizzesWithQuestions = createManyQuizzesWithQuestions(
                10,
                5,
            );
            mockedQuizRepository.getAll.mockResolvedValue(
                mockedQuizzesWithQuestions,
            );
            const result = await QuizService.getAll({ questions: true }, {});
            expect(result).toBe(mockedQuizzesWithQuestions);
        });
    });
    describe('getUnique', () => {
        it('should call QuizRepository and return One quiz', async () => {
            const mockedQuiz = createQuiz();
            mockedQuizRepository.getById.mockResolvedValue(mockedQuiz);
            const result = await QuizService.getById(mockedQuiz.id, {}, {});
            expect(result).toBe(mockedQuiz);
        });
    });
});
