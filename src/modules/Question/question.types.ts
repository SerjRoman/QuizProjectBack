import { $Enums, Question as QuestionPrisma } from "@src/generated/prisma";
import { JsonValue } from "@src/generated/prisma/runtime/library";




export type Question = QuestionPrisma

export type QuestionEnum = $Enums.QuestionType

export type QuestionJsonValue = JsonValue