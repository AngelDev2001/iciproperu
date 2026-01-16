import type {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
} from 'firebase/firestore';
import { deleteField, getDoc, getDocs, Timestamp } from 'firebase/firestore';

/**
 * Convierte un QuerySnapshot a array, agregando el id.
 */
export const querySnapshotToArray = <T extends DocumentData>(querySnapshot: QuerySnapshot<T>) => {
  const documents: Array<T & { id: string }> = [];

  querySnapshot.forEach((docSnap) => {
    documents.push({ ...docSnap.data(), id: docSnap.id });
  });

  return documents;
};

/**
 * Trae una colección (Query) una sola vez y retorna un array con id.
 */
export const fetchCollectionOnce = async <T extends DocumentData>(query: Query<T>) => {
  const querySnapshot = await getDocs(query);
  return querySnapshotToArray(querySnapshot);
};

/**
 * Trae un documento una sola vez.
 * Soporta DocumentReference.
 */
export const fetchDocumentOnce = async <T extends DocumentData>(docRef: DocumentReference<T>) => {
  const documentSnapshot: DocumentSnapshot<T> = await getDoc(docRef);
  return documentSnapshot.exists() ? documentSnapshot.data() : undefined;
};

/**
 * Reemplaza campos undefined con deleteField() para usarlos en updateDoc/setDoc merge.
 * (Mutates el objeto por conveniencia, igual que tu versión anterior)
 */
export const firestoreDeleteFields = <T extends Record<string, any>>(document: T) => {
  Object.entries(document).forEach(([key, value]) => {
    if (typeof value === 'undefined') {
      (document as any)[key] = deleteField();
    }
  });

  return document;
};

export const now = () => Timestamp.now();

export const toTimestamp = ({ seconds, nanoseconds }: { seconds: number; nanoseconds: number }) =>
  new Timestamp(seconds, nanoseconds);
