import { relations, sql } from "drizzle-orm"
import { datetime, int, json, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { AnswerSchema } from "./quiz-answer.schema"
import { QuizSchema } from "./quiz-schema"
import { UserSchema } from "./user.schema"

export const UserSubmissionSchema = mysqlTable("user_submissions", {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 50 })
        .references(() => UserSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
    quizId: int("quiz_id")
        .references(() => QuizSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
    additional: json("additional").$type<{ question: string; answer: string[] }[]>().notNull(),
    createdAt: datetime("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})
export type IUserSubmission = typeof UserSubmissionSchema.$inferSelect
export type ICreateUserSubmission = typeof UserSubmissionSchema.$inferInsert

export const UserSubmissionRelation = relations(UserSubmissionSchema, ({ one, many }) => ({
    answers: many(AnswerSchema),
    user: one(UserSchema, {
        fields: [UserSubmissionSchema.userId],
        references: [UserSchema.id],
    }),
    quiz: one(QuizSchema, {
        fields: [UserSubmissionSchema.quizId],
        references: [QuizSchema.id],
    }),
}))
