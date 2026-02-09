import { z } from 'zod';

/** Enums */
export const CertificateStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

/** Inputs */
export const CreateCertificateRequestInputSchema = z.object({
  dni: z.string().regex(/^\d{8}$/, 'DNI must have 8 digits'),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\d{9}$/)
    .optional(),
  courseId: z.string().min(1),
});

/** Grades */
export const CertificateGradeSchema = z.object({
  moduleId: z.string(),
  moduleName: z.string(),
  grade: z.number().int().min(17).max(19),
});

/** Entity */
export const CertificateRequestSchema = z.object({
  id: z.string(),
  holder: z.object({
    document: {
      type: z.string(),
      number: z.string(),
    },
    firstName: z.string(),
    paternalSurname: z.string(),
    maternalSurname: z.string(),
    fullName: z.string(),
    email: z.string(),
    phone: {
      prefix: z.string().optional(),
      number: z.string().optional(),
    },
  }),
  courseId: z.string(),
  courseNameSnapshot: z.string(),
  status: CertificateStatusSchema,
  grades: z.array(CertificateGradeSchema),
  average: z.number().min(17).max(19),
  certificateCode: z.string().optional(),
});
