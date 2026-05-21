'use server';

import {createClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {type Certificate, certificateSchema} from '@/lib/validations/certificate';
import {assignCreateProps, assignDeleteProps, assignUpdateProps} from '@/lib/utils/audit';

export async function saveCertificate(values: Certificate) {
    const supabase = await createClient();

    try {
        const validated = certificateSchema.parse(values);

        const { data: courseData } = await supabase
            .from('courses')
            .select('title')
            .eq('id', validated.course_id)
            .single();

        const course_name = courseData?.title || 'Curso no encontrado';

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Sesión no válida o expirada");

        const userDetails = `${user.user_metadata?.firstName || ''} ${user.user_metadata?.paternalSurname || ''}|${user.email}`;
        const auditData = assignCreateProps(user.id, userDetails);

        const { data: newEntry, error: insertError } = await supabase
            .from('certificates')
            .insert([{
                ...validated,
                course_name,
                ...auditData,
                status: validated.status || 'pending'
            }])
            .select()
            .single();

        if (insertError) throw insertError;

        revalidatePath('/certificate-requests');
        return { success: true, id: newEntry.id };

    } catch (error: any) {
        console.error('SERVER ERROR (save):', error);

        if (error.name === "ZodError") {
            return { success: false, error: "Error de validación: " + error.errors[0].message };
        }
        return { success: false, error: error.message };
    }
}

export async function getCertificateById(id: string) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('id', id)
            .eq('is_deleted', false)
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        console.error('SERVER ERROR (getCertificateById):', error);
        return { success: false, error: error.message };
    }
}

export async function getCertificates() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

    if (error) return { success: false, error: error.message };
    return { success: true, data };
}

export async function updateCertificate(id: string, updates: Partial<Certificate>) {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No autorizado");

        const userDetails = `${user.user_metadata?.firstName || ''}|${user.email}`;
        const auditUpdate = assignUpdateProps(user.id, userDetails);

        const { error } = await supabase
            .from('certificates')
            .update({
                ...updates,
                ...auditUpdate
            })
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/certificate-requests');

        return { success: true };
    } catch (error: any) {
        console.error('SERVER ERROR (updateCertificate):', error);
        return { success: false, error: error.message };
    }
}

export async function deleteCertificate(id: string) {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No autorizado");

        const userDetails = `${user.user_metadata?.firstName || ''}|${user.email}`;

        const auditDelete = assignDeleteProps(user.id, userDetails);

        const { error } = await supabase
            .from('certificates')
            .update({
                ...auditDelete
            })
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/certificate-requests');

        return { success: true };
    } catch (error: any) {
        console.error('SERVER ERROR (deleteCertificate):', error);
        return { success: false, error: error.message };
    }
}

export async function getNextCertificateCode() {
    const supabase = await createClient();

    const { count, error } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })
        .not('certificate_code', 'is', null);

    if (error) throw error;

    return `SRL${((count || 0) + 1).toString().padStart(6, '0')}`;
}