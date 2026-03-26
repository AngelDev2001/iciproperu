import {ROLE_LABELS, UserRole} from '@/constants/roles';
import {STATUS_LABELS, UserStatus} from "@/constants/status";

export const getRoleLabel = (roleKey: UserRole): string => {
    return ROLE_LABELS[roleKey] || 'Rol no definido';
};

export const getStatusLabel = (roleKey: UserStatus) => {
    return STATUS_LABELS[roleKey] || 'Status no definido';
};

export const formatLatamDate = (isoString:string, includeTime = false) => {
    if (!isoString) return "---";

    const date = new Date(isoString);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...(includeTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    };

    return date.toLocaleString('es-PE', options);
};