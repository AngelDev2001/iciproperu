'use server';

import { createClient } from '@/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js'; // Importación directa para el cliente admin
import { UserFormValues, userSchema } from '@/lib/validations/user';
import { revalidatePath } from 'next/cache';

/**
 * SHORTCUT: Guardar un nuevo usuario
 * Crea el registro en Auth y luego el perfil detallado.
 */
// actions/user-actions.ts
export async function saveUser(values: UserFormValues) {
  const supabase = await createClient();

  // 2. Cliente ADMIN para CREAR usuarios (permisos elevados)
  // Nota: Usa tus variables de entorno correspondientes
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // 👈 ESTA ES LA CLAVE MÁGICA
  );

  console.log('Capa de servidor: Iniciando registro...'); // Log de control

  try {
    // 1. Validar solo los campos del formulario
    const validated = userSchema.parse(values);

    // 2. Obtener el ID del Admin que está creando al usuario
    const {
      data: { user: adminUser },
    } = await supabase.auth.getUser();

    console.log('Admin que ejecuta:', adminUser?.id);

    // 3. Crear el usuario usando el cliente ADMIN
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: validated.email,
      password: validated.document_number,
      email_confirm: true,
      user_metadata: { role: validated.role },
    });

    if (authError) throw authError;

    // 4. Preparar el objeto final con los datos de AUDITORÍA
    const profileWithAudit = {
      ...validated,
      id: authData.user.id,
      created_by: adminUser?.id || null, // 👈 Inyectamos el ID del creador
      updated_by: adminUser?.id || null,
      is_deleted: false,
      // created_at y updated_at los maneja Supabase automáticamente por defecto
    };

    // 5. Insertar en la tabla 'profiles'
    const { error: profileError } = await supabaseAdmin.from('profiles').insert([profileWithAudit]);

    if (profileError) throw profileError;

    revalidatePath('/administration/users');
    return { success: true };
  } catch (error: any) {
    console.error('ERROR DETECTADO EN SERVIDOR:', error); // Esto es vital
    return { success: false, error: error.message };
  }
}

/**
 * SHORTCUT: Actualizar usuario existente con auditoría
 */
export async function updateUser(userId: string, values: Partial<UserFormValues>) {
  const supabase = await createClient();

  try {
    // 1. Validamos parcialmente los datos
    // Usamos .partial() de Zod para que no exija todos los campos en un update
    const validated = userSchema.partial().parse(values);

    // 2. Obtener el ID del usuario (Admin) que está editando
    const {
      data: { user: adminUser },
    } = await supabase.auth.getUser();

    // 3. Preparar el objeto de actualización con auditoría
    const updateData = {
      ...validated,
      updated_by: adminUser?.id,
      // updated_at: new Date().toISOString(), // Opcional si Supabase ya lo tiene por default
    };

    // 4. Ejecutar el update en la tabla 'profiles'
    const { error } = await supabase.from('profiles').update(updateData).eq('id', userId);

    if (error) throw error;

    revalidatePath('/administration/users');
    return { success: true };
  } catch (error: any) {
    console.error('Update Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * SHORTCUT: Borrado lógico (Soft Delete)
 */
export async function softDeleteUser(userId: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user: adminUser },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .update({
        is_deleted: true,
        status: 'inactive', // Opcionalmente lo desactivamos
        updated_by: adminUser?.id,
      })
      .eq('id', userId);

    if (error) throw error;

    revalidatePath('/administration/users');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * SHORTCUT: Cambiar estado (Activar/Suspender)
 */
export async function setUserStatus(userId: string, status: 'active' | 'inactive' | 'suspended') {
  const supabase = await createClient();

  const { error } = await supabase.from('profiles').update({ status }).eq('id', userId);

  if (!error) revalidatePath('/administration/users');
  return { error };
}
