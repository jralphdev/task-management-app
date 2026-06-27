import express, { Request, Response } from 'express';
import { ENV } from './config/env.js';
import cors from 'cors';

import taskRoutes from './routes/task.route.js';

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
  }),
);

app.get('/', (_: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Task Management API - Powered by Drizzle ORM and PostgreSQL',
    endpoints: {
      tasks: '/api/tasks',
    },
  });
});

// routes
app.use('/api/tasks', taskRoutes);

// for local dev
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// for vercel deploy
export default app;
