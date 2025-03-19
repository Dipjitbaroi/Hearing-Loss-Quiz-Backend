import { relations } from "drizzle-orm"
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core"
import { QuizQuestionSchema } from "./quiz-question.schema"
import { UserSubmissionSchema } from "./user-submission.schema"

export const AnswerSchema = mysqlTable("answer", {
    id: varchar("id", { length: 50 }).primaryKey(),
    userSubmissionId: varchar("submission_id", { length: 50 })
        .references(() => UserSubmissionSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
    questionId: varchar("question_id", { length: 50 })
        .references(() => QuizQuestionSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
    answer: text("answer").notNull(),
})
export type IAnswerSchema = typeof AnswerSchema.$inferSelect
export type ICreateAnswer = typeof AnswerSchema.$inferInsert

export const AnswersRelation = relations(AnswerSchema, ({ one }) => ({
    session: one(UserSubmissionSchema, {
        fields: [AnswerSchema.userSubmissionId],
        references: [UserSubmissionSchema.id],
    }),
    question: one(QuizQuestionSchema, {
        fields: [AnswerSchema.questionId],
        references: [QuizQuestionSchema.id],
    }),
}))
