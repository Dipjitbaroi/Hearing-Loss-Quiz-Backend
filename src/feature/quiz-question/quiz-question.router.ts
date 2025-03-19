import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateQuizQuestionDto, UpdateQuizQuestionDto } from "./dto/quiz-question.dto"
import { QuizQuestionController } from "./quiz-question.controller"

const QuizQuestionRouter = Router()

/**
 * @description get quiz question
 * @url {{BASE_URL}}/v1/quiz-question
 */
QuizQuestionRouter.get("/", QuizQuestionController.getAllQuestion)

QuizQuestionRouter.use(AuthMid.isSuperAdmin)

/**
 * @description create quiz question
 * @url {{BASE_URL}}/v1/quiz-question
 */
QuizQuestionRouter.post("/", validateMid({ body: CreateQuizQuestionDto }), QuizQuestionController.createQuestion)

/**
 * @description update quiz category
 * @url {{BASE_URL}}/v1/quiz-question/:id
 */
QuizQuestionRouter.put(
    "/:id",
    validateMid({ body: UpdateQuizQuestionDto, params: IdParamDto }),
    QuizQuestionController.updateQuestion
)

/**
 * @description delete quiz category
 * @url {{BASE_URL}}/v1/quiz-question/:id
 */
QuizQuestionRouter.delete("/:id", validateMid({ params: IdParamDto }), QuizQuestionController.deleteQuestion)

export default QuizQuestionRouter
