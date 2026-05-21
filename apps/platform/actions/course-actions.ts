'use server';

import {createClient} from '@/lib/supabase/server';
import {Course, courseSchema} from '@/lib/validations/course';
import {revalidatePath} from 'next/cache';
import {assignCreateProps, assignDeleteProps, assignUpdateProps} from '@/lib/utils/audit';


async function uploadImage(file: File) {
    const supabase = await createClient();

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `course-covers/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
        .from('courses')
        .upload(filePath, file);

    if (uploadError) {
        throw new Error(`Error al subir imagen: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('courses')
        .getPublicUrl(filePath);

    return publicUrl;
}

export async function saveCourse(values: any) {
    const supabase = await createClient();

    try {
        const { image_url, modules, ...rest } = values;
        let finalImageUrl = image_url;

        const isFile = image_url && typeof image_url === 'object' && ('name' in image_url || image_url instanceof File);

        if (isFile) {
            finalImageUrl = await uploadImage(image_url);
        }

        const validated = courseSchema.parse({
            ...rest,
            modules,
            image_url: finalImageUrl
        });

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No autorizado");

        const userDetails = `${user.user_metadata?.firstName || ''} ${user.user_metadata?.paternalSurname || ''}|${user.email}`;
        const auditData = assignCreateProps(user.id, userDetails);

        const { data: newCourse, error: courseError } = await supabase
            .from('courses')
            .insert([{
                ...rest,
                image_url: finalImageUrl,
                ...auditData
            }])
            .select()
            .single();

        if (courseError) throw courseError;

        if (modules && modules.length > 0) {
            const modulesWithRelation = modules.map((module: any, index: number) => ({
                title: module.title,
                course_id: newCourse.id,
                order: index + 1,
                ...auditData
            }));

            const { error: modulesError } = await supabase
                .from('course_modules')
                .insert(modulesWithRelation);

            if (modulesError) {
                await supabase.from('courses').delete().eq('id', newCourse.id);
                throw modulesError;
            }
        }

        revalidatePath('/administration/courses');
        return { success: true, id: newCourse.id };

    } catch (error: any) {
        console.error('SERVER ERROR (saveCourse):', error);
        return { success: false, error: error.message || "Error desconocido" };
    }
}

export async function updateCourse(courseId: string, values: Partial<Course>) {
    const supabase = await createClient();

    try {
        const validated = courseSchema.partial().parse(values);
        const { modules, ...courseData } = validated;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No autorizado");

        const userDetails = `${user.user_metadata?.firstName || ''}|${user.email}`;
        const auditUpdate = assignUpdateProps(user.id, userDetails);

        const { error: courseError } = await supabase
            .from('courses')
            .update({
                ...courseData,
                ...auditUpdate
            })
            .eq('id', courseId);

        if (courseError) throw courseError;

        if (modules) {
            await supabase.from('course_modules').delete().eq('course_id', courseId);

            const modulesWithRelation = modules.map((module, index) => ({
                ...module,
                course_id: courseId,
                order: index + 1,
                ...auditUpdate
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

export async function softDeleteCourse(courseId: string) {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No autorizado");

        const auditDelete = assignDeleteProps(user.id);

        const { error } = await supabase
            .from('courses')
            .update({
                ...auditDelete
            })
            .eq('id', courseId);

        if (error) throw error;

        revalidatePath('/administration/courses');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function setStatusCourse(courseId: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('courses')
        .update({ status })
        .eq('id', courseId);

    if (!error) revalidatePath('/administration/courses');
    return { error };
}

export async function getActiveCourses() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .eq('is_deleted', false)
        .order('title', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
}

export async function getCourseModules(courseId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('course_modules')
        .select('title, order')
        .eq('course_id', courseId)
        .order('order', { ascending: true });

    if (error) {
        console.error("Error fetching modules:", error);
        throw new Error(error.message);
    }

    return data;
}