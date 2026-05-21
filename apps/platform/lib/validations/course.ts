import * as z from 'zod';
import {auditSchema} from '@/lib/validations/common';

export const courseModalityEnum = z.enum(['online', 'in_person', 'hybrid']);

export const courseModuleSchema = z.object({
    id: z.string().uuid().optional(),
    course_id: z.string().uuid().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    order: z.number().int().default(0),
});

export const courseSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    course_code: z.string().min(3),
    image_url: z.any().optional().nullable(),
    modality: courseModalityEnum,
    modules: z.array(z.object({
        title: z.string().min(1, "El título del módulo es obligatorio"),
        order: z.number().optional()
    })).min(1),
    internal_observations: z.string().optional(),
}).merge(auditSchema);

export type Course = z.infer<typeof courseSchema>;
export type CourseModule = z.infer<typeof courseModuleSchema>;