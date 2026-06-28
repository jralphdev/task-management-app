import { useTaskStore } from '../store/useTaskStore';

const Statistics = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const total = tasks.length;
  const active = tasks.filter((task) => task.status === 'incomplete').length;
  const inactive = total - active;

  return (
    <section className='statistics'>
      <div className='stat-card'>
        <h2 className='stat-title'>Total Tasks</h2>
        <p className='stat-value text-green-400'>{total}</p>
      </div>

      <div className='stat-card'>
        <h2 className='stat-title'>Active</h2>
        <p className='stat-value text-blue-400'>{active}</p>
      </div>

      <div className='stat-card'>
        <h2 className='stat-title'>Inactive</h2>
        <p className='stat-value text-gray-200'>{inactive}</p>
      </div>
    </section>
  );
};

export default Statistics;
