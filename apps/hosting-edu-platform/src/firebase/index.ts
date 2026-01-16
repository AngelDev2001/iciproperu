import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { common, contactData, currentConfig, currentEnvironment } from '../config';

const app = getApps().length > 0 ? getApp() : initializeApp(currentConfig.firebaseApp);

const auth = getAuth(app);

const firestore = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

enableIndexedDbPersistence(firestore).catch(() => {});

const storage = getStorage(app);

const { version, apiUrl } = currentConfig;

console.log(currentEnvironment, ':', version);

export { currentConfig, app, version, common, contactData, auth, firestore, storage, apiUrl };
