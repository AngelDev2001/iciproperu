import {
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from 'firebase/auth';

export const authPersistence = {
  LOCAL: browserLocalPersistence,
  SESSION: browserSessionPersistence,
  NONE: inMemoryPersistence,
};
