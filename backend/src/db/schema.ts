import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export type TaskStatus = 'completed' | 'incomplete';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  status: text('status').$type<TaskStatus>().default('incomplete').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
