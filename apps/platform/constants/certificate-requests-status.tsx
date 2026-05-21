import { Clock, CheckCircle2, XCircle } from "lucide-react";

export const CERTIFICATE_STATUS_LABELS = {
    pending: {
        label: 'Pendiente',
        icon: Clock,
        color: 'text-warning', // oklch(0.78 0.15 75)
    },
    approved: {
        label: 'Aprobado',
        icon: CheckCircle2,
        color: 'text-success', // oklch(0.62 0.17 145)
    },
    rejected: {
        label: 'Rechazado',
        icon: XCircle,
        color: 'text-rose-500', // oklch(0.55 0.18 25)
    },
} as const;

export type CertificateStatus = keyof typeof CERTIFICATE_STATUS_LABELS;