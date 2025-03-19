import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { TakeQuizService } from "./take-quiz.service"

export const TakeQuizController = {
    takeQuiz: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await TakeQuizService.create(req.body, req.user.id)

            return res.status(StatusCode.CREATED).json(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
    getAllReport: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reports = await TakeQuizService.getAllReport(req.user.id)

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", reports))
        } catch (error) {
            return next(error)
        }
    },

    getPartialReport: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            const report = await TakeQuizService.getPartialReport(id)

            return res.status(StatusCode.OK).json(MyResponse("Operation successful", report))
        } catch (error) {
            return next(error)
        }
    },
}
