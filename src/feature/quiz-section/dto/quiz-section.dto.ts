import { z } from "zod"
import { ZodMin1UpdateRefine, ZodSimpleNullableString, ZodSimpleString } from "../../../utils/zod.util"

// create dto
export const CreateQuizSectionDto = z.object({
    title: ZodSimpleString,
    description: ZodSimpleNullableString,
    quizId: z.number(),
})
export type ICreateQuizSectionDto = z.infer<typeof CreateQuizSectionDto>

// update dto
export const UpdateQuizSectionDto = CreateQuizSectionDto.omit({
    quizId: true,
})
    .partial()
    .refine(ZodMin1UpdateRefine, {
        message: "update least 1 property",
    })
export type IUpdateQuizSectionDto = z.infer<typeof UpdateQuizSectionDto>
