import { QuizRepository } from '@modules/Quiz';
import { QuizAccessServiceContract } from './types';
import { QuizAccessRepository } from './quiz-access.repository';
import { UserRepository } from '@modules/User';
import { NotFoundError } from '@errors';
import { QUIZ_ACCESS_WITH_USER_INLCUDE } from './constants';

export const QuizAccessService: QuizAccessServiceContract = {
    async canEditAccessById({ id, teacherId }) {
        const access = await QuizAccessRepository.get({
            where: {
                id,
                profileId: teacherId,
            },
        });
        return access.accessType === 'OWNER';
    },
    async canEditAccessByQuizId({ quizId, teacherId }) {
        const { ownedById } = await QuizRepository.get({
            where: { id: quizId },
            select: { ownedById: true },
        });
        return ownedById === teacherId;
    },
    delete({ id }) {
        return QuizAccessRepository.delete({ id });
    },
    updateAccessType({ id, accessType }) {
        return QuizAccessRepository.update(
            {
                id,
            },
            {
                accessType,
            },
        );
    },
    async create({ quizId, teacherUsername, accessType }) {
        const teacherToGiveAccess = await UserRepository.get({
            where: {
                username: teacherUsername,
            },
            select: {
                teacherProfile: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!teacherToGiveAccess.teacherProfile) {
            throw new NotFoundError('Teacher');
        }
        return QuizAccessRepository.create({
            quizId,
            profileId: teacherToGiveAccess.teacherProfile.id,
            accessType,
        });
    },
    getAllByQuizId({ quizId }) {
        return QuizAccessRepository.getAll({
            where: { quizId },
            include: QUIZ_ACCESS_WITH_USER_INLCUDE,
        });
    },
};
