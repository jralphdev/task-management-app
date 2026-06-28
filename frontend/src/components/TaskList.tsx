import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';
import { useState } from 'react';

const TaskList = () => {
  const [editId, setEditId] = useState<number | null>(null);

  const { tasks, isLoading } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      isLoading: state.isLoading,
    })),
  );

  if (isLoading) {
    return <p className='text-2xl text-white text-center'>Loading...</p>;
  }

  return (
    <section className='task-container'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editId === task.id}
          onEdit={() => setEditId(task.id)}
        />
      ))}
    </section>
  );
};

export default TaskList;
