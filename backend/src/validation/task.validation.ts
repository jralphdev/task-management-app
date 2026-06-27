import z from 'zod';

export const taskIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const getTasksQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: z
    .enum(['completed', 'incomplete'], "Status must be 'completed' or 'incomplete'")
    .optional(),
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
