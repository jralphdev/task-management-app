import { Response } from 'express';
import z from 'zod';

export const handleZodError = (error: unknown, res: Response) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: z.flattenError(error).fieldErrors,
    });
  }

  return null;
};
