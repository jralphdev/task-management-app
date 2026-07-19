import { useTaskStore } from '../store/useTaskStore';

const Statistics = () => {
  const statistics = useTaskStore((state) => state.statistics);

  const total = statistics.total;
  const incomplete = statistics.statuses.incomplete ?? 0;
  const completed = statistics.statuses.completed ?? 0;

  return (
    <section className='statistics'>
      <div className='stat-card'>
        <h2 className='stat-title'>Total Tasks</h2>
        <p className='stat-value text-green-400'>{total}</p>
      </div>

      <div className='stat-card'>
        <h2 className='stat-title'>Active</h2>
        <p className='stat-value text-blue-400'>{incomplete}</p>
      </div>

      <div className='stat-card'>
        <h2 className='stat-title'>Inactive</h2>
        <p className='stat-value text-gray-200'>{completed}</p>
      </div>
    </section>
  );
};

export default Statistics;
