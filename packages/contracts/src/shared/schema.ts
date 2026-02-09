import { z } from 'zod';

export const ISODateStringSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid ISO date string');

export const DefaultFirestorePropsSchema = z.object({
  createdAt: ISODateStringSchema,
  updatedAt: ISODateStringSchema.optional(),
  deletedAt: ISODateStringSchema.optional(),
  isDeleted: z.boolean(),
});
