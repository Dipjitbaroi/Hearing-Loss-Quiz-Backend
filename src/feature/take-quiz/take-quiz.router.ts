import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateAnswerDto } from "./dto/take-quiz.dto"
import { TakeQuizController } from "./take-quiz.controller"

const TakeQuizRouter = Router()

TakeQuizRouter.use(AuthMid.isLoggedInMid)
/**
 * @description create take quiz
 * @url {{BASE_URL}}/v1/take-quiz
 */
TakeQuizRouter.post("/", validateMid({ body: CreateAnswerDto }), TakeQuizController.takeQuiz)

/**
 * @description get all report
 * @url {{BASE_URL}}/v1/take-quiz/all-report
 */
TakeQuizRouter.get("/all-report", TakeQuizController.getAllReport)

/**
 * @description create take quiz
 * @url {{BASE_URL}}/v1/take-quiz/partial/:id
 */
TakeQuizRouter.get("/partial/:id", validateMid({ params: IdParamDto }), TakeQuizController.getPartialReport)

export default TakeQuizRouter
