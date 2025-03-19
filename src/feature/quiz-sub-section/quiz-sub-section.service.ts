import { eq } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { db, IDb } from "../../config/db/db"
import { ICreateQuizSubSection, QuizSubSectionSchema } from "../../config/db/schema/quiz-sub-section.schema"
import { UniqueId } from "../../utils/common.util"
import { ICreateQuizSubSectionDto, IUpdateQuizSubSectionDto } from "./dto/quiz-sub-section.dto"

export const QuizSubSectionService = {
    create: async (body: ICreateQuizSubSectionDto, dbTx: IDb = db) => {
        const obj: ICreateQuizSubSection = {
            id: UniqueId.createUlid(),
            title: body.title,
            sectionId: body.sectionId,
        }
        await dbTx.insert(QuizSubSectionSchema).values(obj)
    },

    get: async (dbTx: IDb = db) => {
        const subSections = await dbTx.query.QuizSubSectionSchema.findMany({ with: { section: true } })

        return subSections
    },

    update: async (id: string, body: IUpdateQuizSubSectionDto, dbTx: IDb = db) => {
        const updatedData: IUpdateQuizSubSectionDto = {
            title: body.title,
        }
        const [resultInfo] = await dbTx
            .update(QuizSubSectionSchema)
            .set(updatedData)
            .where(eq(QuizSubSectionSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        }
    },

    delete: async (id: string, dbTx: IDb = db) => {
        const [resultInfo] = await dbTx.delete(QuizSubSectionSchema).where(eq(QuizSubSectionSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Deletion not possible")
        }
    },
}
