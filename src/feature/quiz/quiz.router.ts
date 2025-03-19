import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateQuizDto, UpdateQuizDto } from "./dto/quiz.dto"
import { QuizController } from "./quiz.controller"

const QuizRouter = Router()

/**
 * @description get all quiz
 * @url {{BASE_URL}}/v1/quiz
 */
QuizRouter.get("/", QuizController.getAllQuiz)

/**
 * @description get single quiz
 * @url {{BASE_URL}}/v1/quiz
 */
QuizRouter.get("/:id", validateMid({ params: IdParamDto }), QuizController.getSingleQuiz)

QuizRouter.use(AuthMid.isSuperAdmin)

/**
 * @description create quiz
 * @url {{BASE_URL}}/v1/quiz
 */
QuizRouter.post("/", validateMid({ body: CreateQuizDto }), QuizController.create)

/**
 * @description update quiz
 * @url {{BASE_URL}}/v1/quiz
 */
QuizRouter.put("/:id", validateMid({ params: IdParamDto, body: UpdateQuizDto }), QuizController.updateQuiz)

/**
 * @description delete quiz
 * @url {{BASE_URL}}/v1/quiz
 */
QuizRouter.delete("/:id", validateMid({ params: IdParamDto }), QuizController.deleteQuiz)

export default QuizRouter
