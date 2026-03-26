export const ROLE_LABELS = {
    superadmin: "Super Administrador",
    admin: 'Administrador(a)',
    promoter: 'Promotor(a)',
    teacher: 'Profesor(a)',
    student: 'Estudiante'
} as const;

export type UserRole = keyof typeof ROLE_LABELS;