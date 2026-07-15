import { Response } from 'express';
import { flattenError, ZodError } from 'zod';

export const handleError = (
  error: unknown,
  res: Response,
  message = 'Internal server error',
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: flattenError(error).fieldErrors,
    });
  }

  console.error(error);

  return res.status(500).json({ error: message });
};
