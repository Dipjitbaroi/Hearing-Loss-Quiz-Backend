import { z } from "zod"
import { ZodMin1UpdateRefine, ZodSimpleString } from "../../../utils/zod.util"

// sub section
export const CreateQuizSubSectionDto = z.object({
    sectionId: ZodSimpleString,
    title: ZodSimpleString,
})
export type ICreateQuizSubSectionDto = z.infer<typeof CreateQuizSubSectionDto>

export const UpdateQuizSubSectionDto = CreateQuizSubSectionDto.partial().refine(ZodMin1UpdateRefine, {
    message: "update least 1 property",
})
export type IUpdateQuizSubSectionDto = z.infer<typeof UpdateQuizSubSectionDto>
