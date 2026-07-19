import z from 'zod';

export const taskIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  search: z.string().trim().default(''),
  filter: z.enum(['all', 'completed', 'incomplete']).default('all'),
});

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(255, 'Title must not exceed 255 characters'),
  description: z
    .string()
    .trim()
    .max(255, 'Description must not exceed 255 characters')
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(255, 'Title must not exceed 255 characters')
    .optional(),
  description: z
    .string()
    .trim()
    .max(255, 'Description must not exceed 255 characters')
    .optional(),
  status: z
    .enum(['completed', 'incomplete'], "Status must be 'completed' or 'incomplete'")
    .optional(),
});
