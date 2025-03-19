import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { QuizSectionService } from "./quiz-section.service"

export const QuizSectionController = {
    createSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await QuizSectionService.create(req.body)

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },

    getAllQuizSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await QuizSectionService.get()

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", list))
        } catch (error) {
            return next(error)
        }
    },
    updateQuizSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await QuizSectionService.update(id, req.body)

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
    deleteQuizSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto

            await QuizSectionService.delete(id)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
