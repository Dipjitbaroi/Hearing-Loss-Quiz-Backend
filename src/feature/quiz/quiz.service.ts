import { eq, isNull } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { db, IDb } from "../../config/db/db"
import { QuizQuestionSchema } from "../../config/db/schema/quiz-question.schema"
import { ICreateQuiz, QuizSchema } from "../../config/db/schema/quiz-schema"
import { ICreateQuizDto, IUpdateQuizDto } from "./dto/quiz.dto"

export const QuizService = {
    create: async (body: ICreateQuizDto, dbTx: IDb = db) => {
        const obj: ICreateQuiz = {
            name: body.name,
        }
        await dbTx.insert(QuizSchema).values(obj)
    },

    get: async (dbTx: IDb = db) => {
        const quizList = await dbTx.query.QuizSchema.findMany()

        return quizList
    },

    getSingle: async (id: number, dbTx: IDb = db) => {
        const quiz = await dbTx.query.QuizSchema.findFirst({
            where: eq(QuizSchema.id, id),
            with: {
                quizSection: {
                    with: {
                        subSection: {
                            with: { questions: true },
                        },
                        questions: {
                            where: isNull(QuizQuestionSchema.subSectionId),
                        },
                    },
                },
            },
        })
        if (!quiz) {
            throw new BadRequestError("Invalid quiz id.")
        }
        return quiz
    },

    update: async (id: number, body: IUpdateQuizDto, dbTx: IDb = db) => {
        const [resultInfo] = await dbTx
            .update(QuizSchema)
            .set({
                name: body.name,
            })
            .where(eq(QuizSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        }
    },

    delete: async (id: number, dbTx: IDb = db) => {
        const [resultInfo] = await dbTx.delete(QuizSchema).where(eq(QuizSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Deletion not possible")
        }
    },
}
