import { desc, eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { tasks } from '../db/schema.js';
import { db } from '../db/index.js';
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from '../validation/task.validation.js';
import { handleError } from '../utils/zodError.js';

export const getTasks = async (_: Request, res: Response) => {
  try {
    const taskList = await db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.status), desc(tasks.createdAt));

    return res.status(200).json(taskList);
  } catch (error) {
    return handleError(error, res, 'Failed to fetch tasks');
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
    return handleError(error, res, 'Failed to create task');
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
    return handleError(error, res, 'Failed to update task');
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
    return handleError(error, res, 'Failed to delete task');
  }
};
