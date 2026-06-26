import { CheckIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import type { Task } from '../types';

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <article className='task-card'>
      <div className='item-left'>
        <button className='check-btn'>
          <CheckIcon className='size-5' />
        </button>

        <div className='task-info'>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      </div>

      <div className='action-btn'>
        <button className='hover:text-blue-400 hover:bg-blue-500/10'>
          <Edit2Icon className='size-5' />
        </button>
        <button className='hover:text-red-400 hover:bg-red-500/10'>
          <Trash2Icon className='size-5' />
        </button>
      </div>
    </article>
  );
};

export default TaskItem;
