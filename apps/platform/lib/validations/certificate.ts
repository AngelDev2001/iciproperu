import * as z from 'zod';
import {auditSchema} from '@/lib/validations/common';

export const certificateGradeSchema = z.object({
    topic: z.string().min(1, "El nombre del tema es requerido"),
    score: z.number().min(0).max(20, "La nota debe estar entre 0 y 20"),
});

export const certificateSchema = z.object({
    id: z.string().uuid().optional(),
    first_names: z.string().min(1, "Nombres requeridos"),
    paternal_surname: z.string().min(1, "Apellido paterno requerido"),
    maternal_surname: z.string().min(1, "Apellido materno requerido"),
    document_type: z.enum(['DNI', 'CE', 'PASSPORT']),
    document_number: z.string().min(8, "Número de documento no válido"),
    email: z.string().email("Correo electrónico no válido").min(1, "El correo es requerido"),
    phone_prefix: z.string().default("+51"),
    phone_number: z.string().min(9, "Número de celular no válido"),
    course_id: z.string().uuid("Debes seleccionar un curso válido"),
    course_name: z.string().min(1, "El nombre del curso es requerido"),
    course_hours: z.number().int().positive().default(40),
    grades_snapshot: z.array(certificateGradeSchema).min(1, "El temario no puede estar vacío"),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
    certificate_code: z.string().optional().nullable(),
    approved_by: z.string().uuid().optional().nullable(),
    approved_at: z.string().optional().nullable(),
    approval_comment: z.string().optional().nullable(),
    internal_observations: z.string().optional().or(z.literal('')),
});

export const certificateBdSchema = certificateSchema.merge(auditSchema);

export type Certificate = z.infer<typeof certificateSchema>;
export type CertificateGrade = z.infer<typeof certificateGradeSchema>;