import { eq } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { db, IDb } from "../../config/db/db"
import { ICreateQuizSection, QuizSectionSchema } from "../../config/db/schema/quiz-section.schema"
import { UniqueId } from "../../utils/common.util"
import { ICreateQuizSectionDto, IUpdateQuizSectionDto } from "./dto/quiz-section.dto"

export const QuizSectionService = {
    create: async (body: ICreateQuizSectionDto, dbTx: IDb = db) => {
        const id = UniqueId.createUlid()

        const obj: ICreateQuizSection = {
            id,
            quizId: body.quizId,
            title: body.title,
            description: body.description,
        }
        await dbTx.insert(QuizSectionSchema).values(obj)
    },

    get: async (dbTx: IDb = db) => {
        const sections = await dbTx.query.QuizSectionSchema.findMany({
            with: {
                subSection: true,
                // questions: true,
                // subSection: {
                //     with: { questions: true },
                // },
            },
        })

        return sections
    },

    update: async (id: string, body: IUpdateQuizSectionDto, dbTx: IDb = db) => {
        const updatedData: IUpdateQuizSectionDto = {
            title: body.title,
            description: body.description,
            // quizId: body.quizId
        }
        const [resultInfo] = await dbTx
            .update(QuizSectionSchema)
            .set(updatedData)
            .where(eq(QuizSectionSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        }
    },

    delete: async (id: string, dbTx: IDb = db) => {
        const [resultInfo] = await dbTx.delete(QuizSectionSchema).where(eq(QuizSectionSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Deletion not possible")
        }
    },
}
