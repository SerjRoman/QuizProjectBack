import { faker } from '@faker-js/faker';
import {
    Question,
    QuestionEnum,
    QuestionJsonValue,
} from '../../question.types';

const createFakeQuestionData = (type: QuestionEnum): QuestionJsonValue => {
    switch (type) {
        case 'multiChoice':
            return {
                questionText: faker.lorem.sentence() + '?',
                options: [
                    faker.lorem.word(),
                    faker.lorem.word(),
                    faker.lorem.word(),
                    faker.lorem.word(),
                ],
                correctAnswerIndex: faker.number.int({ min: 0, max: 3 }),
            };
        case 'singleChoice':
            return {
                questionText: faker.lorem.sentence() + '?',
                options: [
                    faker.lorem.word(),
                    faker.lorem.word(),
                    faker.lorem.word(),
                    faker.lorem.word(),
                ],
                correctAnswerIndex: faker.number.int({ min: 0, max: 3 }),
            };
        default:
            return {
                info: 'Default data for unknown question type',
            };
    }
};

export const createFakeQuestion = (
    overrides: Partial<Question> = {},
): Question => {
    const defaultType = faker.helpers.arrayElement([
        'multiChoice',
        'singleChoice',
    ]);
    const defaultData = createFakeQuestionData(overrides.type || defaultType);

    return {
        id: faker.string.uuid(),
        type: defaultType,
        data: defaultData,
        createdAt: new Date(),
        quizId: faker.string.uuid(),
        ...overrides,
    };
};

export const createManyFakeQuestions = (
    count: number,
    defaultOverrides: Partial<Question> = {},
): Question[] => {
    return Array.from({ length: count }, () => {
        return createFakeQuestion(defaultOverrides);
    });
};
