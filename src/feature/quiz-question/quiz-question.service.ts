import { eq } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { db, IDb } from "../../config/db/db"
import { ICreateQuizQuestionSchema, QuizQuestionSchema } from "../../config/db/schema/quiz-question.schema"
import { UniqueId } from "../../utils/common.util"
import { ICreateQuizQuestionDto, IUpdateQuizQuestionDto } from "./dto/quiz-question.dto"

export const QuizQuestionService = {
    create: async (body: ICreateQuizQuestionDto, dbTx: IDb = db) => {
        const id = UniqueId.createUlid()

        const obj: ICreateQuizQuestionSchema = {
            id,
            sectionId: body.sectionId,
            subSectionId: body.subSectionId,
            question: body.question,
        }

        await dbTx.insert(QuizQuestionSchema).values(obj)
    },

    get: async (dbTx: IDb = db) => {
        const questions = await dbTx.query.QuizQuestionSchema.findMany()

        return questions
    },

    update: async (id: string, body: IUpdateQuizQuestionDto, dbTx: IDb = db) => {
        const updatedData: IUpdateQuizQuestionDto = {
            question: body.question,
            sectionId: body.sectionId,
        }
        const [resultInfo] = await dbTx
            .update(QuizQuestionSchema)
            .set(updatedData)
            .where(eq(QuizQuestionSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        }
    },

    delete: async (id: string, dbTx: IDb = db) => {
        const [resultInfo] = await dbTx.delete(QuizQuestionSchema).where(eq(QuizQuestionSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Deletion not possible")
        }
    },
}
