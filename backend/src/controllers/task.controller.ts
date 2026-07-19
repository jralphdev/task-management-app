import { and, count, desc, eq, ilike } from 'drizzle-orm';
import { Request, Response } from 'express';
import { tasks } from '../db/schema.js';
import { db } from '../db/index.js';
import {
  createTaskSchema,
  taskIdSchema,
  taskQuerySchema,
  updateTaskSchema,
} from '../validation/task.validation.js';
import { handleError } from '../utils/zodError.js';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { page, filter, search } = taskQuerySchema.parse(req.query);
    const limit = 7;

    const filters = [];

    if (search) {
      filters.push(ilike(tasks.title, `%${search}%`));
    }

    if (filter !== 'all') {
      filters.push(eq(tasks.status, filter));
    }

    const query = filters.length ? and(...filters) : undefined;

    const [taskList, [{ total }], statusCount] = await Promise.all([
      // paginated tasks
      db
        .select()
        .from(tasks)
        .where(query)
        .orderBy(desc(tasks.status), desc(tasks.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),

      // total tasks ( for pagination )
      db.select({ total: count() }).from(tasks).where(query),

      // status count ( for statistics )
      db
        .select({
          status: tasks.status,
          count: count(),
        })
        .from(tasks)
        .groupBy(tasks.status),
    ]);

    return res.status(200).json({
      tasks: taskList,
      page,
      totalPages: Math.ceil(total / limit),
      statistics: {
        total: statusCount.reduce((sum, { count }) => sum + count, 0),
        statuses: Object.fromEntries(statusCount.map(({ status, count }) => [status, count])),
      },
    });
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
