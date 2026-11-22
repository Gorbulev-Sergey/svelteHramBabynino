import * as v from 'valibot';

export const Roles = ['admin', 'editor'] as const;

// Для valibot
export const RoleSchema = v.nullable(v.picklist(Roles));

// Для использования в качестве типа
export type TRole = v.InferOutput<typeof RoleSchema>;
