import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import { EnvConfig } from "../env.config"

import * as quizAnswer from "./schema/quiz-answer.schema"
import * as quizQuestion from "./schema/quiz-question.schema"
import * as quiz from "./schema/quiz-schema"
import * as quizSection from "./schema/quiz-section.schema"
import * as quizSubSection from "./schema/quiz-sub-section.schema"
import * as userSubmission from "./schema/user-submission.schema"
import * as user from "./schema/user.schema"

export const schemas = {
    ...user,
    ...quizSection,
    ...quizQuestion,
    ...quizAnswer,
    ...quiz,
    ...userSubmission,
    ...quizSubSection,
}

export const dbPool = mysql.createPool({
    uri: EnvConfig.DATABASE_URL,
})

// use only in services
export const db = drizzle(dbPool, {
    schema: schemas,
    logger: false,
    mode: "default",
})

export type IDb = typeof db
