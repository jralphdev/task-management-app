import { PlusIcon } from 'lucide-react';
import SearchInput from './components/SearchInput';
import FilterButton from './components/FilterButton';
import Statistics from './components/Statistics';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import { useTaskStore } from './store/useTaskStore';
import { useEffect, useState } from 'react';
import DeleteModal from './components/DeleteModal';
import { useShallow } from 'zustand/shallow';

const App = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const { getTasks, deleteTaskId } = useTaskStore(
    useShallow((state) => ({
      getTasks: state.getTasks,
      deleteTaskId: state.deleteTaskId,
    })),
  );

  useEffect(() => {
    getTasks();
  }, [getTasks]);

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
      </div>

      {isAddTaskModalOpen && <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)} />}

      {deleteTaskId && <DeleteModal />}
    </main>
  );
};

export default App;
