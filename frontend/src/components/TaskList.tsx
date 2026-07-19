import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';
import { LoaderCircleIcon } from 'lucide-react';
import { useEffect } from 'react';

const TaskList = () => {
  const { getTasks, page, tasks, search, filter, isLoading } = useTaskStore(
    useShallow((state) => ({
      getTasks: state.getTasks,
      page: state.page,
      tasks: state.tasks,
      search: state.search,
      filter: state.filter,
      isLoading: state.isLoading,
    })),
  );

  // fetch tasks when page changes
  useEffect(() => {
    getTasks(page);
  }, [page, search, filter, getTasks]);

  return (
    <section className='task-container'>
      {isLoading ? (
        <div className='loader'>
          <LoaderCircleIcon />
        </div>
      ) : tasks.length === 0 ? (
        <section className='no-tasks'>
          <p>No tasks found.</p>
        </section>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </section>
  );
};

export default TaskList;
