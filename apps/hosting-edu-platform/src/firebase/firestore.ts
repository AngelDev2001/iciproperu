import type {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
} from 'firebase/firestore';
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  deleteField,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

export const firestoreTimestamp = Timestamp;

/**
 * Reemplazo de FieldValue (modular):
 * - ya no es un objeto, son funciones.
 * - expongo un "wrapper" para que tu código sea más parecido al anterior.
 */
export const firestoreFieldValue = {
  delete: deleteField,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
};

export const DATE_FORMAT_TO_FIRESTORE = 'DD/MM/YYYY HH:mm';

/**
 * Convierte QuerySnapshot a array agregando id.
 */
export const querySnapshotToArray = <T extends DocumentData>(querySnapshot: QuerySnapshot<T>) => {
  const documents: Array<T & { id: string }> = [];

  querySnapshot.forEach((docSnap) => {
    documents.push({ ...docSnap.data(), id: docSnap.id });
  });

  return documents;
};

/**
 * Trae una colección (Query) una sola vez.
 */
export const fetchCollectionOnce = async <T extends DocumentData>(query: Query<T>) => {
  const querySnapshot = await getDocs(query);
  return querySnapshotToArray(querySnapshot);
};

/**
 * Trae un documento (DocumentReference) una sola vez.
 */
export const fetchDocumentOnce = async <T extends DocumentData>(
  documentReference: DocumentReference<T>,
) => {
  const documentSnapshot: DocumentSnapshot<T> = await getDoc(documentReference);
  return documentSnapshot.exists() ? documentSnapshot.data() : undefined;
};

/**
 * setDoc por defecto (sobrescribe el doc completo).
 */
export const setDocument = async <T extends DocumentData>(
  docRef: DocumentReference<T>,
  document: T,
) => setDoc(docRef, document);

/**
 * updateDoc (solo actualiza campos enviados).
 */
export const updateDocument = async <T extends DocumentData>(
  docRef: DocumentReference<T>,
  document: Partial<T>,
) => updateDoc(docRef, document as any);

/**
 * mergeDocument (equivalente a set(..., { merge: true }))
 */
export const mergeDocument = async <T extends DocumentData>(
  docRef: DocumentReference<T>,
  document: Partial<T>,
) => setDoc(docRef, document as T, { merge: true });

/**
 * deleteDoc
 */
export const deleteDocument = async <T extends DocumentData>(docRef: DocumentReference<T>) =>
  deleteDoc(docRef);
