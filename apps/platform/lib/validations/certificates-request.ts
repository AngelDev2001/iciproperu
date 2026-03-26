import * as z from 'zod';
import {auditSchema} from '@/lib/validations/common';

export const certificateGradeSchema = z.object({
  topic: z.string().min(1),
  score: z.number().min(0).max(20),
});

export const certificateRequestSchema = z
  .object({
    id: z.string().uuid().optional(),
    student_id: z.string().uuid(),
    first_names: z.string(),
    paternal_surname: z.string(),
    maternal_surname: z.string(),
    document_type: z.enum(['DNI', 'CE', 'PASSPORT']),
    document_number: z.string(),
    course_id: z.string().uuid(),
    course_name: z.string(),
    course_hours: z.number().int().positive().optional(),
    grades: z.array(certificateGradeSchema).optional(),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
    certificate_code: z.string().optional().nullable(),
    approved_by: z.string().uuid().optional().nullable(),
    approved_at: z.string().optional().nullable(),
    approval_comment: z.string().optional().nullable(),
    internal_observations: z.string().optional(),
  })

export const userBdSchema = certificateRequestSchema.merge(auditSchema);


export type CertificateRequest = z.infer<typeof certificateRequestSchema>;
