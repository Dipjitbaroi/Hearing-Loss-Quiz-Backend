import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateQuizSectionDto, UpdateQuizSectionDto } from "./dto/quiz-section.dto"
import { QuizSectionController } from "./quiz-section.controller"

const QuizSectionRouter = Router()

/**
 * @description get all quiz section
 * @url {{BASE_URL}}/v1/quiz-section
 */
QuizSectionRouter.get("/", QuizSectionController.getAllQuizSection)

QuizSectionRouter.use(AuthMid.isSuperAdmin)

/**
 * @description create quiz section
 * @url {{BASE_URL}}/v1/quiz-section
 */
QuizSectionRouter.post("/", validateMid({ body: CreateQuizSectionDto }), QuizSectionController.createSection)

/**
 * @description update quiz section
 * @url {{BASE_URL}}/v1/quiz-section/:id
 */
QuizSectionRouter.put(
    "/:id",
    validateMid({ body: UpdateQuizSectionDto, params: IdParamDto }),
    QuizSectionController.updateQuizSection
)

/**
 * @description delete quiz section
 * @url {{BASE_URL}}/v1/quiz-section/:id
 */
QuizSectionRouter.delete("/:id", validateMid({ params: IdParamDto }), QuizSectionController.deleteQuizSection)

export default QuizSectionRouter
