import { CheckIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import type { TaskItemProps } from '../types';
import EditTaskForm from './EditTaskForm';
import { useTaskStore } from '../store/useTaskStore';
import { useShallow } from 'zustand/shallow';

const TaskItem = ({ task }: TaskItemProps) => {
  const { editTaskId, setEditTaskId, setDeleteTaskId, toggleTaskStatus } = useTaskStore(
    useShallow((state) => ({
      editTaskId: state.editTaskId,
      setEditTaskId: state.setEditTaskId,
      setDeleteTaskId: state.setDeleteTaskId,
      toggleTaskStatus: state.toggleTaskStatus,
    })),
  );

  const isEditing = editTaskId === task.id;

  return (
    <article className='task-card'>
      {!isEditing ? (
        <div className={`task-wrapper ${task.status === 'completed' ? 'completed' : ''}`}>
          <div className='item-left'>
            <button
              className={`check-btn ${task.status === 'completed' ? 'checked' : ''}`}
              onClick={() => toggleTaskStatus(task)}
            >
              {task.status === 'completed' && <CheckIcon />}
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
            <button
              className='hover:text-blue-400 hover:bg-blue-500/10'
              onClick={() => setEditTaskId(task.id)}
            >
              <Edit2Icon />
            </button>
            <button
              onClick={() => setDeleteTaskId(task.id)}
              className='hover:text-red-400 hover:bg-red-500/10'
            >
              <Trash2Icon />
            </button>
          </div>
        </div>
      ) : (
        <EditTaskForm task={task} />
      )}
    </article>
  );
};

export default TaskItem;
