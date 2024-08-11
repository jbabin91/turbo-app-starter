import { config, nanoid } from '@repo/core';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const roleEnum = config.rolesByType.systemRoles;
const supportedLanguagesEnum = config.supportedLanguages;

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  hashedPassword: text('hashed_password').notNull(),
  language: text('language', { enum: supportedLanguagesEnum })
    .notNull()
    .default('en'),
  role: text('role', { enum: roleEnum }).notNull().default('USER'),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const userSchema = createSelectSchema(users).omit({
  hashedPassword: true,
});
export const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = createInsertSchema(users)
  .pick({
    email: true,
    firstName: true,
    lastName: true,
    language: true,
    role: true,
  })
  .partial();

export type UserModel = typeof users.$inferSelect;
export type InsertUserModel = typeof users.$inferInsert;
