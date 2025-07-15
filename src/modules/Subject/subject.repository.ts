import type { ISubjectRepository, SubjectSelect } from './subject.types';
import { PrismaClient } from '@prisma';

export const SubjectRepository: ISubjectRepository = {
    getAll: async function <S extends SubjectSelect = object>(select?: S) {
        try {
            return await PrismaClient.subject.findMany({
                select,
                orderBy: {
                    name: 'desc',
                },
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
