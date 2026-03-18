import * as z from 'zod';
import { auditSchema } from '@/lib/validations/common';

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  role: z.enum(['superadmin', 'admin', 'promoter', 'teacher', 'student']),
  status: z.enum(['active', 'inactive', 'suspended']),
  first_names: z.string().min(2),
  paternal_surname: z.string().min(2),
  maternal_surname: z.string().min(2),
  document_type: z.enum(['DNI', 'CE', 'PASSPORT']),
  document_number: z.string().min(8).max(15),
  email: z.string().email(),
  phone: z.string().length(9).regex(/^9/),
  region: z.string(),
  province: z.string(),
  district: z.string(),
  promoter_code: z.string().min(3).optional().or(z.literal('')),
  assigned_zone: z.string().min(3).optional().or(z.literal('')),
  academic_specialty: z.string().min(3).optional().or(z.literal('')),
  academic_degree: z.string().min(2).optional().or(z.literal('')),
  student_code: z.string().min(5).optional().or(z.literal('')),
  modality: z.enum(['presencial', 'virtual']).optional(),
});

export const userBdSchema = userSchema.merge(auditSchema);

export type UserFormValues = z.infer<typeof userSchema>;
