import { useFormContext } from 'react-hook-form';
import * as z from 'zod';

export const useFormHelpers = (name: string, schema?: z.ZodObject<any>) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

  const fieldValue = watch(name);
  const fieldError = name.split('.').reduce((obj, key) => obj?.[key], errors as any);
  const isTouched = name.split('.').reduce((obj, key) => obj?.[key], touchedFields as any);

  const error = fieldError?.message as string | undefined;
  const hasValue = fieldValue !== undefined && fieldValue !== null && fieldValue !== '';

  let isRequired = false;
  if (schema) {
    try {
      const parts = name.split('.');
      let currentPath: any = schema.shape;
      for (const part of parts) {
        if (currentPath[part]) {
          const fieldSchema = currentPath[part];
          isRequired = !fieldSchema.isOptional() && !fieldSchema.isNullable();
          currentPath = fieldSchema._def.shape || {};
        }
      }
    } catch (e) {
      isRequired = false;
    }
  }

  return {
    error,
    success: !!isTouched && !error && hasValue,
    required: isRequired,
  };
};
