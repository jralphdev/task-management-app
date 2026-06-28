import { CheckIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import type { TaskItemProps } from '../types';
import EditTaskForm from './EditTaskForm';
import { useTaskStore } from '../store/useTaskStore';

const TaskItem = ({ task, isEditing, onEdit }: TaskItemProps) => {
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);

  return (
    <article className='task-card'>
      {!isEditing ? (
        <div className={`task-wrapper ${task.status === 'completed' ? 'completed' : ''}`}>
          <div className='item-left'>
            <button
              className={`check-btn ${task.status === 'completed' ? 'checked' : ''}`}
              onClick={() => toggleTaskStatus(task)}
            >
              {task.status === 'completed' && <CheckIcon className='size-5' />}
            </button>

            <div className='task-info'>
              <h3 className={task.status === 'completed' ? 'line-through' : ''}>
                {task.title}
              </h3>
              <p>{task.description}</p>
            </div>
          </div>

          <div
            className={`action-btn ${task.status === 'completed' ? 'pointer-events-none' : ''}`}
          >
            <button className='hover:text-blue-400 hover:bg-blue-500/10' onClick={onEdit}>
              <Edit2Icon className='size-5' />
            </button>
            <button className='hover:text-red-400 hover:bg-red-500/10'>
              <Trash2Icon className='size-5' />
            </button>
          </div>
        </div>
      ) : (
        <EditTaskForm />
      )}
    </article>
  );
};

export default TaskItem;
