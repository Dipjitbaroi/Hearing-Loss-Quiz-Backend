import { z } from "zod"
import { ZodMin1UpdateRefine, ZodSimpleNullableString, ZodSimpleString } from "../../../utils/zod.util"

// create dto
export const CreateQuizQuestionDto = z.object({
    question: ZodSimpleString,
    sectionId: ZodSimpleString,
    subSectionId: ZodSimpleNullableString,
})
export type ICreateQuizQuestionDto = z.infer<typeof CreateQuizQuestionDto>

// update dto
export const UpdateQuizQuestionDto = CreateQuizQuestionDto.partial().refine(ZodMin1UpdateRefine, {
    message: "update least 1 property",
})
export type IUpdateQuizQuestionDto = z.infer<typeof UpdateQuizQuestionDto>
