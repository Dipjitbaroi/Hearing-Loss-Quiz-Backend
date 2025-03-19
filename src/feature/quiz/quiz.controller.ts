import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { QuizService } from "./quiz.service"

export const QuizController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await QuizService.create(req.body)

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },

    getAllQuiz: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await QuizService.get()

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", list))
        } catch (error) {
            return next(error)
        }
    },
    getSingleQuiz: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            const quiz = await QuizService.getSingle(Number(id))

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", quiz))
        } catch (error) {
            return next(error)
        }
    },

    updateQuiz: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await QuizService.update(Number(id), req.body)

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },

    deleteQuiz: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto

            await QuizService.delete(Number(id))
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
