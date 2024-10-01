import { nanoid } from '@repo/core';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const passkeys = pgTable('passkeys', {
  id: text('id').primaryKey().$defaultFn(nanoid),
  userEmail: text('user_email')
    .notNull()
    .references(() => users.email, { onDelete: 'cascade' }),
  credentialId: text('credential_id').notNull(),
  publicKey: text('public_key').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const passkeysRelations = relations(passkeys, ({ one }) => ({
  user: one(users, {
    fields: [passkeys.userEmail],
    references: [users.id],
  }),
}));

export type PasskeyModel = typeof passkeys.$inferSelect;
export type InsertPasskeyModel = typeof passkeys.$inferInsert;
