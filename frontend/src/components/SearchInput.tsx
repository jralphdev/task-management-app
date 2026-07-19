import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useDebounce } from '../hooks/useDebounce';

const SearchInput = () => {
  const search = useTaskStore((state) => state.search);
  const setSearch = useTaskStore((state) => state.setSearch);

  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, search, setSearch]);

  return (
    <div className='search-input'>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type='text'
        placeholder='Search...'
      />
    </div>
  );
};

export default SearchInput;
