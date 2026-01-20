import { firestore } from '../index';
import {
  fetchCollection,
  fetchDocumentOnce,
  setDocument,
  updateDocument,
  type WhereClauses,
} from '../firestore';
import { collection, doc } from '../firestore.ts';

export const usersRef = collection(firestore, 'users');
export const getUserId = (): string => doc(usersRef).id;

export const fetchUsers = async (whereClauses?: WhereClauses<User>[]): Promise<User[]> =>
  fetchCollection<User>(usersRef, whereClauses);

export const fetchUser = async (userId: string): Promise<User | undefined> =>
  fetchDocumentOnce<User>(doc(firestore, 'users', userId));

export const addUser = async (user: User): Promise<void> =>
  setDocument<User>(doc(usersRef, user.id), user);

export const updateUser = async (userId: string, user: Partial<User>): Promise<void> =>
  updateDocument<Partial<User>>(doc(usersRef, userId), user);

export const deleteUser = async (userId: string, user: Partial<User>): Promise<void> =>
  updateDocument<Partial<User>>(doc(usersRef, userId), user);
