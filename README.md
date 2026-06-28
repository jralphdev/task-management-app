# Task Management App

A full-stack task management application where users can create, update, complete, and delete tasks. It also includes search, filtering, and task statistics to make organizing tasks easier.

The project was built using React and Vite for the frontend, and Express, Drizzle ORM, and PostgreSQL (Neon) for the backend.

## Features

- Create, edit, and delete task
- Mark tasks as complete or incomplete
- Search and filter tasks by status or title
- View task statistics
- Responsive user interface

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Zustand
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon)
- Zod

## Setup

### 1. Install dependencies

Install the backend dependencies:

```bash
cd backend
npm install
```

Install the frontend dependencies:

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create environment files from the examples:

Backend:

```bash
cd backend
copy .env.example .env
```

Frontend:

```bash
cd frontend
copy .env.example .env
```

Update the values in the `.env` files:

Backend `.env`:

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL=your_postgres_neon_connection_string
```

Frontend `.env`:

```env
VITE_BASE_URL=http://localhost:3001
```

### 3. Push the database schema

From the backend folder:

```bash
npm run db:push
```

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The API will run at:

- http://localhost:3001

### Start the frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run at:

- http://localhost:5173

## API Overview

- `GET /api/tasks`
- `POST /api/tasks/create`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
