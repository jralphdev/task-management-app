import { PlusIcon } from 'lucide-react';
import SearchInput from './components/SearchInput';
import FilterButton from './components/FilterButton';
import Statistics from './components/Statistics';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import { useTaskStore } from './store/useTaskStore';
import { useState } from 'react';
import DeleteModal from './components/DeleteModal';
import { useShallow } from 'zustand/shallow';
import PaginationSection from './components/PaginationSection';

const App = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const { deleteTaskId } = useTaskStore(
    useShallow((state) => ({
      deleteTaskId: state.deleteTaskId,
    })),
  );

  return (
    <main className='home'>
      <div className='home-container'>
        <header className='header'>
          <h1 className='title'>Task Management App</h1>
          <p className='description'>
            Manage your tasks with ease. Keep track of your tasks and stay organized.
          </p>
        </header>

        {/* STATISTICS SECTION */}
        <Statistics />

        {/* TOOLBAR SECTION */}
        <section className='toolbar'>
          <div className='toolbar-top'>
            <SearchInput />

            <button onClick={() => setIsAddTaskModalOpen(true)} className='add-btn'>
              <PlusIcon className='size-4 mr-2' />
              Add New Task
            </button>
          </div>

          <FilterButton />
        </section>

        {/* TASK LIST SECTION */}
        <TaskList />

        {/* PAGIANTION NUMBER */}
        <PaginationSection />
      </div>

      {isAddTaskModalOpen && <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)} />}

      {deleteTaskId && <DeleteModal />}
    </main>
  );
};

export default App;
