import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { QuizQuestionService } from "./quiz-question.service"

export const QuizQuestionController = {
    createQuestion: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await QuizQuestionService.create(req.body)

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },

    getAllQuestion: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await QuizQuestionService.get()

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", list))
        } catch (error) {
            return next(error)
        }
    },

    updateQuestion: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await QuizQuestionService.update(id, req.body)

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
    deleteQuestion: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto

            await QuizQuestionService.delete(id)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
