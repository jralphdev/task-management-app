import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';
import { filters } from '../constants';

const FilterButton = () => {
  const { filter, setFilter } = useTaskStore(
    useShallow((state) => ({
      filter: state.filter,
      setFilter: state.setFilter,
    })),
  );

  return (
    <div className='toolbar-filters'>
      {filters.map(({ label, value }) => (
        <button
          key={value}
          className={`filter-btn ${filter === value ? 'active' : ''}`}
          onClick={() => setFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;
