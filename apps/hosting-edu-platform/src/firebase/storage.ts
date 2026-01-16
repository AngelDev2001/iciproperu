import { type FirebaseStorage } from 'firebase/storage';
import { storage as defaultStorage } from './index';

/**
 * Tipos opcionales (si luego los necesitas)
 */
export type BucketType = 'default';

/**
 * Buckets de Firebase Storage
 * (equivalente a firebase.app().storage(bucket))
 */
export const buckets: Record<BucketType, FirebaseStorage> = {
  default: defaultStorage,
  // documents: getStorage(app, currentConfig.buckets.documents),
};

/**
 * Tamaños de imágenes permitidos
 */
export const imageResizes = ['423x304', '313x370'] as const;
