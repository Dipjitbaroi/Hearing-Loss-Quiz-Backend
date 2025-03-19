import { relations, sql } from "drizzle-orm"
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { QuizQuestionSchema } from "./quiz-question.schema"
import { QuizSectionSchema } from "./quiz-section.schema"

export const QuizSubSectionSchema = mysqlTable("quiz_sub_section", {
    id: varchar("id", { length: 50 }).primaryKey(),
    sectionId: varchar("section_id", { length: 50 }).references(() => QuizSectionSchema.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    createdAt: datetime("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export type ICreateQuizSubSection = typeof QuizSubSectionSchema.$inferInsert
export type IQuizSubSection = typeof QuizSubSectionSchema.$inferSelect

export const QuizSubSectionRelation = relations(QuizSubSectionSchema, ({ one, many }) => ({
    questions: many(QuizQuestionSchema),
    section: one(QuizSectionSchema, {
        fields: [QuizSubSectionSchema.sectionId],
        references: [QuizSectionSchema.id],
    }),
}))
