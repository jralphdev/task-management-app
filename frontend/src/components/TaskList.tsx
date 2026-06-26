import { TASK_ITEM_TEMPDATA } from '../constants';
import TaskItem from './TaskItem';

const TaskList = () => {
  return (
    <section className='task-container'>
      {TASK_ITEM_TEMPDATA.map((item) => (
        <TaskItem key={item.id} task={item} />
      ))}
    </section>
  );
};

export default TaskList;
