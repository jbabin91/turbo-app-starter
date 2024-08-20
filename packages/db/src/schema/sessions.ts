import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type', { enum: ['regular', 'impersonation'] })
      .notNull()
      .default('regular'),
    expiresAt: timestamp('expires_at', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
    createdAt: timestamp('created_at', {
      mode: 'string',
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    adminUserId: text('admin_user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => {
    return {
      adminUserIdIndex: index('idx_admin_id').on(table.adminUserId),
    };
  },
);

export type SessionModel = typeof sessions.$inferSelect;
export type InsertSessionModel = typeof sessions.$inferInsert;
