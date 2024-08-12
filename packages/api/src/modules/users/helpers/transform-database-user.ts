import { type UserModel } from '@repo/db';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function transformDatabaseUser({
  hashedPassword: _hashedPassword,
  ...user
}: PartialBy<UserModel, 'hashedPassword'>) {
  return {
    ...user,
  };
}
