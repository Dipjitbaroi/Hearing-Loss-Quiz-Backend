import { z } from "zod"
import { ZodMin1UpdateRefine, ZodSimpleString } from "../../../utils/zod.util"

export const CreateQuizDto = z.object({
    name: ZodSimpleString,
})
export type ICreateQuizDto = z.infer<typeof CreateQuizDto>

export const UpdateQuizDto = CreateQuizDto.partial().refine(ZodMin1UpdateRefine, {
    message: "update least 1 property",
})
export type IUpdateQuizDto = z.infer<typeof UpdateQuizDto>
