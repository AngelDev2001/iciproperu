import type {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QueryConstraint,
  QuerySnapshot,
  WhereFilterOp,
} from 'firebase/firestore';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
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

type ObjectType = { [field: string]: any };

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type WhereClauses<T extends ObjectType> = [NestedKeyOf<T>, WhereFilterOp, unknown];

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

export const fetchCollection = async <T extends DocumentData>(
  baseQuery: Query<T>,
  whereClauses?: WhereClauses<T>[],
): Promise<Array<T & { id: string }>> => {
  const constraints: QueryConstraint[] =
    whereClauses?.map(([field, operation, value]) =>
      where(field as string, operation as any, value),
    ) || [];

  const finalQuery = query(baseQuery, ...constraints);

  const querySnapshot = await getDocs(finalQuery);

  return querySnapshotToArray<T>(querySnapshot);
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
  documentReference: DocumentReference<any>,
) => {
  const documentSnapshot: DocumentSnapshot<T> = await getDoc(documentReference);
  return documentSnapshot.exists() ? documentSnapshot.data() : undefined;
};

/**
 * setDoc por defecto (sobrescribe el doc completo).
 */
export const setDocument = async <T extends DocumentData>(
  docRef: DocumentReference<any>,
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

export {
  doc,
  collection,
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
};
