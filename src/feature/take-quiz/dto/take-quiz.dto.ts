import { z } from "zod"
import { ZodSimpleString } from "../../../utils/zod.util"

// create dto
export const CreateAnswerDto = z.object({
    quizId: z.number(),
    additional: z.array(
        z.object({
            question: ZodSimpleString,
            answer: z.array(ZodSimpleString),
        })
    ),
    answers: z.array(
        z.object({
            questionId: ZodSimpleString,
            answer: ZodSimpleString,
        })
    ),
})
export type ICreateAnswerDto = z.infer<typeof CreateAnswerDto>
