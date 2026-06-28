import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';

const SearchInput = () => {
  const { search, setSearch } = useTaskStore(
    useShallow((state) => ({
      search: state.search,
      setSearch: state.setSearch,
    })),
  );

  return (
    <div className='search-input'>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type='text'
        placeholder='Search...'
      />
    </div>
  );
};
export default SearchInput;
