import { useState } from 'react';
import { TASK_ITEM_TEMPDATA } from '../constants';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [editId, setEditId] = useState<number | null>(null);

  return (
    <section className='task-container'>
      {TASK_ITEM_TEMPDATA.map((task) => (
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
