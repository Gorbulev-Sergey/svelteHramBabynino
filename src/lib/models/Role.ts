import * as v from 'valibot';

// Для valibot
export const RoleSchema = v.nullable(v.picklist(['admin', 'editor'] as const));

// Для использования в качестве типа
export type TRole = v.InferOutput<typeof RoleSchema>;
