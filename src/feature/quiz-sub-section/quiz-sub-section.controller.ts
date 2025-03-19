import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { QuizSubSectionService } from "./quiz-sub-section.service"

export const QuizSubSectionController = {
    createSubSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await QuizSubSectionService.create(req.body)

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },

    getAllSubSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await QuizSubSectionService.get()

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", list))
        } catch (error) {
            return next(error)
        }
    },
    updateSubSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await QuizSubSectionService.update(id, req.body)

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
    deleteQuizSubSection: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto

            await QuizSubSectionService.delete(id)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
