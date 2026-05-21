import { auditSchema } from "@/lib/validations/common";
import * as z from "zod";

type AuditProps = z.infer<typeof auditSchema>;

export const assignCreateProps = (userId: string, userDetails?: string): AuditProps => {
    const now = new Date().toISOString();
    return {
        created_at: now,
        updated_at: now,
        created_by: userId,
        updated_by: userDetails || userId,
        is_deleted: false,
    };
};

export const assignUpdateProps = (userId: string, userDetails?: string) => {
    return {
        updated_at: new Date().toISOString(),
        updated_by: userDetails || userId,
    };
};

export const assignDeleteProps = (userId: string, userDetails?: string) => {
    return {
        updated_at: new Date().toISOString(),
        updated_by: userDetails || userId,
        is_deleted: true,
    };
};