import { relations, sql } from "drizzle-orm"
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { AnswerSchema } from "./quiz-answer.schema"
import { QuizSectionSchema } from "./quiz-section.schema"
import { QuizSubSectionSchema } from "./quiz-sub-section.schema"

export const QuizQuestionSchema = mysqlTable("quiz_question", {
    id: varchar("id", { length: 50 }).primaryKey(),
    question: varchar("question", { length: 255 }).notNull(),
    sectionId: varchar("section_id", { length: 50 })
        .references(() => QuizSectionSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
    subSectionId: varchar("sub_section_id", { length: 50 }).references(() => QuizSubSectionSchema.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    createdAt: datetime("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export type ICreateQuizQuestionSchema = typeof QuizQuestionSchema.$inferInsert
export type IQuizQuestionSchema = typeof QuizQuestionSchema.$inferSelect

export const QuizQuestionRelation = relations(QuizQuestionSchema, ({ one, many }) => {
    return {
        section: one(QuizSectionSchema, {
            fields: [QuizQuestionSchema.sectionId],
            references: [QuizSectionSchema.id],
        }),
        subSection: one(QuizSubSectionSchema, {
            fields: [QuizQuestionSchema.subSectionId],
            references: [QuizSubSectionSchema.id],
        }),
        userAnswers: many(AnswerSchema),
    }
})
