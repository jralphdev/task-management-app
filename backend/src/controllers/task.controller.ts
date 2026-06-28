import { and, desc, eq, ilike, SQL } from 'drizzle-orm';
import { Request, Response } from 'express';
import { tasks } from '../db/schema.js';
import { db } from '../db/index.js';
import {
  createTaskSchema,
  getTasksQuerySchema,
  taskIdSchema,
  updateTaskSchema,
} from '../validation/task.validation.js';
import { handleZodError } from '../utils/zodError.js';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { search, status } = getTasksQuerySchema.parse(req.query);

    const filters: SQL[] = [];

    if (search) {
      filters.push(ilike(tasks.title, `%${search}%`));
    }

    if (status) {
      filters.push(eq(tasks.status, status));
    }

    const taskList = await db
      .select()
      .from(tasks)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(tasks.status), desc(tasks.createdAt));

    return res.status(200).json(taskList);
  } catch (error) {
    const zodError = handleZodError(error, res);
    if (zodError) return zodError;

    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const data = createTaskSchema.parse(req.body);

    const [newTask] = await db
      .insert(tasks)
      .values({
        ...data,
        status: 'incomplete',
      })
      .returning();

    return res.status(201).json(newTask);
  } catch (error) {
    const zodError = handleZodError(error, res);
    if (zodError) return zodError;

    return res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = taskIdSchema.parse(req.params);
    const data = updateTaskSchema.parse(req.body);

    const [updatedTask] = await db.update(tasks).set(data).where(eq(tasks.id, id)).returning();

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    const zodError = handleZodError(error, res);
    if (zodError) return zodError;

    return res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = taskIdSchema.parse(req.params);

    const [deletedTask] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    const zodError = handleZodError(error, res);
    if (zodError) return zodError;

    return res.status(500).json({
      error: 'Failed to delete task',
    });
  }
};
