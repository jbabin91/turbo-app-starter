import { config, nanoid } from '@repo/core';
import {
  foreignKey,
  index,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const roleEnum = config.rolesByType.systemRoles;
const supportedLanguagesEnum = config.supportedLanguages;

export const users = pgTable(
  'users',
  {
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
    lastSeenAt: timestamp('last_seen_at', {
      mode: 'string',
      withTimezone: true,
    }), // last time any GET request has been made
    lastVisitAt: timestamp('last_visit_at'), // last time GET me
    lastSignInAt: timestamp('last_sign_in_at'), // last time user went through authentication flow
    createdAt: timestamp('created_at', {
      mode: 'string',
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    modifiedAt: timestamp('modified_at'),
    modifiedBy: text('modified_by'),
  },
  (table) => {
    return {
      nameIndex: index('users_name_index').on(table.name.desc()),
      emailIndex: index('users_email_index').on(table.email.desc()),
      createdAtIndex: index('users_created_at_index').on(
        table.createdAt.desc(),
      ),
      modifiedByReference: foreignKey({
        columns: [table.modifiedBy],
        foreignColumns: [table.id],
      }),
    };
  },
);

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
