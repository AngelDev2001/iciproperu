export interface AuditBase {
  created_at: string; // Timestamptz
  updated_at: string; // Timestamptz
  created_by?: string; // UUID del usuario que creó
  updated_by?: string; // UUID del usuario que modificó
  is_deleted: boolean; // Para "Soft Delete" (borrado lógico)
}
