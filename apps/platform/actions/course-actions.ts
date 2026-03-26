'use server';

import {createClient} from '@/lib/supabase/server';
import {Course, courseSchema} from '@/lib/validations/course';
import {revalidatePath} from 'next/cache';

/**
 * Función auxiliar para subir la imagen al Storage de Supabase
 */
async function uploadImage(file: File) {
    const supabase = await createClient();

    // Generar un nombre único para el archivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `course-covers/${fileName}`;

    // Subir el archivo al bucket 'courses'
    const { data, error: uploadError } = await supabase.storage
        .from('courses')
        .upload(filePath, file);

    if (uploadError) {
        throw new Error(`Error al subir imagen: ${uploadError.message}`);
    }

    // Obtener la URL pública
    const { data: { publicUrl } } = supabase.storage
        .from('courses')
        .getPublicUrl(filePath);

    return publicUrl;
}

/**
 * GUARDAR: save
 * Ahora acepta valores que pueden incluir un objeto File para la imagen.
 */
export async function saveCourse(values: any) { // Usamos any para permitir el objeto File inicial
    const supabase = await createClient();

    try {
        let finalImageUrl = values.image_url;

        // 1. Si image_url es un archivo (File), lo subimos primero
        if (values.image_url instanceof File) {
            finalImageUrl = await uploadImage(values.image_url);
        }

        // 2. Validar con Zod (asegúrate que tu esquema acepte el string de la URL)
        const validated = courseSchema.parse({
            ...values,
            image_url: finalImageUrl
        });

        const { data: { user: adminUser } } = await supabase.auth.getUser();
        const { modules, ...courseData } = validated;

        // 3. Insertar el curso base
        const { data: newCourse, error: courseError } = await supabase
            .from('courses')
            .insert([{
                ...courseData,
                image_url: finalImageUrl, // Guardamos la URL pública
                created_by: adminUser?.id || null,
                updated_by: adminUser?.id || null,
                is_deleted: false,
            }])
            .select()
            .single();

        if (courseError) throw courseError;

        // 4. Insertar los módulos del temario
        if (modules && modules.length > 0) {
            const modulesWithRelation = modules.map((module, index) => ({
                ...module,
                course_id: newCourse.id,
                order: module.order || index + 1,
                created_by: adminUser?.id || null,
                updated_by: adminUser?.id || null,
            }));

            const { error: modulesError } = await supabase
                .from('course_modules')
                .insert(modulesWithRelation);

            if (modulesError) throw modulesError;
        }

        revalidatePath('/administration/courses');
        return { success: true, id: newCourse.id };
    } catch (error: any) {
        console.error('SERVER ERROR (save):', error);
        return { success: false, error: error.message };
    }
}

/**
 * ACTUALIZAR: update
 */
export async function updateCourse(courseId: string, values: Partial<Course>) {
    const supabase = await createClient();

    try {
        const validated = courseSchema.partial().parse(values);
        const { modules, ...courseData } = validated;
        const { data: { user: adminUser } } = await supabase.auth.getUser();

        // 1. Actualizar datos principales
        const { error: courseError } = await supabase
            .from('courses')
            .update({
                ...courseData,
                updated_by: adminUser?.id,
            })
            .eq('id', courseId);

        if (courseError) throw courseError;

        // 2. Refrescar Temario (Borrar y Re-insertar)
        if (modules) {
            await supabase.from('course_modules').delete().eq('course_id', courseId);

            const modulesWithRelation = modules.map((module, index) => ({
                ...module,
                course_id: courseId,
                order: index + 1,
                updated_by: adminUser?.id,
            }));

            const { error: modulesError } = await supabase
                .from('course_modules')
                .insert(modulesWithRelation);

            if (modulesError) throw modulesError;
        }

        revalidatePath('/administration/courses');
        return { success: true };
    } catch (error: any) {
        console.error('SERVER ERROR (update):', error);
        return { success: false, error: error.message };
    }
}

/**
 * BORRADO LÓGICO: softDelete
 */
export async function softDeleteCourse(courseId: string) {
    const supabase = await createClient();

    try {
        const { data: { user: adminUser } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('courses')
            .update({
                is_deleted: true,
                updated_by: adminUser?.id,
            })
            .eq('id', courseId);

        if (error) throw error;

        revalidatePath('/administration/courses');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * ESTADO: setStatus
 */
export async function setStatusCourse(courseId: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('courses')
        .update({ status })
        .eq('id', courseId);

    if (!error) revalidatePath('/administration/courses');
    return { error };
}