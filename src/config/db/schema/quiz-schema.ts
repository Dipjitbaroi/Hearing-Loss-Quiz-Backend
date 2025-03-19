import { relations, sql } from "drizzle-orm"
import { datetime, int, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { QuizSectionSchema } from "./quiz-section.schema"

export const QuizSchema = mysqlTable("quiz", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: datetime("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

export type ICreateQuiz = typeof QuizSchema.$inferInsert
export type IQuiz = typeof QuizSchema.$inferSelect

export const QuizRelation = relations(QuizSchema, ({ many }) => ({
    quizSection: many(QuizSectionSchema),
}))
