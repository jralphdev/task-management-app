const filters = ['All', 'Active', 'Inactive'];

const FilterButton = () => {
  return (
    <div className='toolbar-filters'>
      {filters.map((filter) => (
        <button key={filter} className='filter-btn'>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;
