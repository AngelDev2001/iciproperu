import {CircleCheck, CircleMinus, CircleX} from "lucide-react";

export const STATUS_LABELS = {
    active: {
        label: 'Activado',
        icon: CircleCheck,
        color: 'text-success',
    },
    inactive: {
        label: 'Inactivo',
        icon: CircleMinus,
        color: 'text-slate-400',
    },
    suspended: {
        label: 'Suspendido',
        icon: CircleX,
        color: 'text-rose-500',
    },
} as const;

export type UserStatus = keyof typeof STATUS_LABELS;