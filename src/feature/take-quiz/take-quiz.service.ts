import { eq } from "drizzle-orm"
import { db, IDb } from "../../config/db/db"
import { AnswerSchema, ICreateAnswer } from "../../config/db/schema/quiz-answer.schema"
import { QuizQuestionSchema } from "../../config/db/schema/quiz-question.schema"
import { QuizSectionSchema } from "../../config/db/schema/quiz-section.schema"
import { ICreateUserSubmission, UserSubmissionSchema } from "../../config/db/schema/user-submission.schema"
import { UniqueId } from "../../utils/common.util"
import { ICreateAnswerDto } from "./dto/take-quiz.dto"

interface Quiz {
    question: string
    answer: string
}
interface GroupedQuiz {
    sectionId: string
    sectionTitle: string
    quiz: Quiz[]
}

export const TakeQuizService = {
    create: async (body: ICreateAnswerDto, userId: string, dbTx: IDb = db) => {
        const userSubmissionId = UniqueId.createUlid()
        const obj: ICreateUserSubmission = {
            id: userSubmissionId,
            userId,
            quizId: body.quizId,
            additional: body.additional,
        }

        const answers: ICreateAnswer[] = []
        for (const item of body.answers) {
            const answer: ICreateAnswer = {
                id: UniqueId.createUlid(),
                userSubmissionId,
                questionId: item.questionId,
                answer: item.answer,
            }
            answers.push(answer)
        }
        await dbTx.transaction(async (tx) => {
            await tx.insert(UserSubmissionSchema).values(obj)
            await tx.insert(AnswerSchema).values(answers)
        })
    },

    getAllReport: async (userId: string, dbTx: IDb = db) => {
        const reports = await dbTx.query.UserSubmissionSchema.findMany({
            where: eq(UserSubmissionSchema.userId, userId),
            columns: {
                id: true,
                userId: true,
                createdAt: true,
            },
            with: {
                quiz: true,
            },
        })

        return reports
    },

    getPartialReport: async (userSubmissionId: string, dbTx: IDb = db) => {
        const report = await dbTx.query.UserSubmissionSchema.findFirst({
            where: eq(UserSubmissionSchema.id, userSubmissionId),
            with: {
                answers: {
                    with: {
                        question: {
                            columns: {
                                question: true,
                                sectionId: true,
                                subSectionId: true,
                            },
                            with: { section: true, subSection: true },
                        },
                    },
                },
            },
        })

        const rr = await dbTx
            .select({
                question: QuizQuestionSchema.question,
                answer: AnswerSchema.answer,
                sectionTitle: QuizSectionSchema.title,
                sectionId: QuizSectionSchema.id,
                // subSectionId: QuizSubSectionSchema.id,
                // subSectionTitle: QuizSubSectionSchema.title,
            })
            .from(UserSubmissionSchema)
            .where(eq(UserSubmissionSchema.id, userSubmissionId))
            .innerJoin(AnswerSchema, eq(UserSubmissionSchema.id, AnswerSchema.userSubmissionId))
            .innerJoin(QuizQuestionSchema, eq(AnswerSchema.questionId, QuizQuestionSchema.id))
            .innerJoin(QuizSectionSchema, eq(QuizQuestionSchema.sectionId, QuizSectionSchema.id))

        // const shortedData = {
        //     ...report,
        //     answers: report?.answers.filter((item) => item.question.sectionId === "01JDJ353GZTEC65RB4MNJGMFWB"), //! will change in the future
        // }

        const grouped = Object.values(
            rr.reduce<Record<string, GroupedQuiz>>((acc, item) => {
                const { sectionId, sectionTitle, question, answer } = item

                if (!acc[sectionId]) {
                    acc[sectionId] = {
                        sectionId,
                        sectionTitle,
                        quiz: [],
                    }
                }

                acc[sectionId].quiz.push({ question, answer })
                return acc
            }, {})
        )

        return {
            rr,
            grouped,
            report,
        }
    },
    getFullReport: async (userSubmissionId: string, dbTx: IDb = db) => {
        const report = await dbTx.query.UserSubmissionSchema.findFirst({
            where: eq(UserSubmissionSchema.id, userSubmissionId),
            with: {
                answers: {
                    with: {
                        question: {
                            columns: {
                                question: true,
                                sectionId: true,
                            },
                        },
                    },
                },
            },
        })

        return report
    },
}
