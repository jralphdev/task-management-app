import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';
import { useState } from 'react';

const TaskList = () => {
  const [editId, setEditId] = useState<number | null>(null);

  const { tasks, search, filter, isLoading } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      search: state.search,
      filter: state.filter,
      isLoading: state.isLoading,
    })),
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && task.status === 'incomplete') ||
      (filter === 'inactive' && task.status === 'completed');

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return <p className='text-2xl text-white text-center'>Loading...</p>;
  }

  return (
    <section className='task-container'>
      {filteredTasks.map((task) => (
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
