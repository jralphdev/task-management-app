import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { getPages } from '../lib/pagination';

const PaginationSection = () => {
  const { page, totalPages, setPage } = useTaskStore(
    useShallow((state) => ({
      page: state.page,
      totalPages: state.totalPages,
      setPage: state.setPage,
    })),
  );

  const pages = getPages(page, totalPages);

  return (
    <div className='pagination'>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        <ChevronLeftIcon className='size-5' />
      </button>

      {pages.map((item, index) =>
        item === '...' ? (
          <span key={`ellipsis-${index}`}>
            <EllipsisIcon />
          </span>
        ) : (
          <button
            key={item}
            className={item === page ? 'active' : ''}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ),
      )}

      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        <ChevronRightIcon className='size-5' />
      </button>
    </div>
  );
};
export default PaginationSection;
