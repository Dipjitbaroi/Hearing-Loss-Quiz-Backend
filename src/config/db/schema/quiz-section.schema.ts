import { relations, sql } from "drizzle-orm"
import { datetime, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core"
import { QuizQuestionSchema } from "./quiz-question.schema"
import { QuizSchema } from "./quiz-schema"
import { QuizSubSectionSchema } from "./quiz-sub-section.schema"

export const QuizSectionSchema = mysqlTable("quiz_section", {
    id: varchar("id", { length: 50 }).primaryKey(),
    quizId: int("quiz_id").references(() => QuizSchema.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    createdAt: datetime("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export type ICreateQuizSection = typeof QuizSectionSchema.$inferInsert
export type IQuizSection = typeof QuizSectionSchema.$inferSelect

export const QuizSectionRelation = relations(QuizSectionSchema, ({ one, many }) => ({
    questions: many(QuizQuestionSchema),
    quiz: one(QuizSchema, {
        fields: [QuizSectionSchema.quizId],
        references: [QuizSchema.id],
    }),
    subSection: many(QuizSubSectionSchema),
}))
