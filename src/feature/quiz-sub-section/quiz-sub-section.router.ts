import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateQuizSubSectionDto, UpdateQuizSubSectionDto } from "./dto/quiz-sub-section.dto"
import { QuizSubSectionController } from "./quiz-sub-section.controller"

const QuizSubSectionRouter = Router()

/**
 * @description get all quiz sub section
 * @url {{BASE_URL}}/v1/quiz-sub-section
 */
QuizSubSectionRouter.get("/", QuizSubSectionController.getAllSubSection)

QuizSubSectionRouter.use(AuthMid.isSuperAdmin)

/**
 * @description create quiz sub section
 * @url {{BASE_URL}}/v1/quiz-sub-section
 */
QuizSubSectionRouter.post(
    "/",
    validateMid({ body: CreateQuizSubSectionDto }),
    QuizSubSectionController.createSubSection
)

/**
 * @description update quiz sub section
 * @url {{BASE_URL}}/v1/quiz-sub-section/:id
 */
QuizSubSectionRouter.put(
    "/:id",
    validateMid({ body: UpdateQuizSubSectionDto, params: IdParamDto }),
    QuizSubSectionController.updateSubSection
)

/**
 * @description delete quiz sub section
 * @url {{BASE_URL}}/v1/quiz-sub-section/:id
 */
QuizSubSectionRouter.delete(
    "/:id",
    validateMid({ params: IdParamDto }),
    QuizSubSectionController.deleteQuizSubSection
)

export default QuizSubSectionRouter
