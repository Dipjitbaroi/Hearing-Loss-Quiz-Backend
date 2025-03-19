import express from "express"
import AuthRouter from "../../feature/auth/auth.router"
import HealthCheckRouter from "../../feature/health-check/health-check.router"
import QuizQuestionRouter from "../../feature/quiz-question/quiz-question.router"
import QuizSectionRouter from "../../feature/quiz-section/quiz-section.router"
import QuizSubSectionRouter from "../../feature/quiz-sub-section/quiz-sub-section.router"
import QuizRouter from "../../feature/quiz/quiz.router"
import TakeQuizRouter from "../../feature/take-quiz/take-quiz.router"
import UserRouter from "../../feature/user/user.router"

const v1Router = express.Router()

v1Router.use(`/health`, HealthCheckRouter)
v1Router.use(`/auth`, AuthRouter)
v1Router.use(`/user`, UserRouter)
v1Router.use(`/quiz-section`, QuizSectionRouter)
v1Router.use(`/quiz-sub-section`, QuizSubSectionRouter)
v1Router.use(`/quiz-question`, QuizQuestionRouter)
v1Router.use(`/take-quiz`, TakeQuizRouter)
v1Router.use(`/quiz`, QuizRouter)

export default v1Router
