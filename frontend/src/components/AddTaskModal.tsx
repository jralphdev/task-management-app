import { useState } from 'react';
import type { TaskForm } from '../types';
import { useTaskStore } from '../store/useTaskStore';
import { useShallow } from 'zustand/shallow';
import { LoaderCircleIcon } from 'lucide-react';

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<TaskForm>({
    title: '',
    description: '',
  });

  const { createTask, isCreating } = useTaskStore(
    useShallow((state) => ({
      createTask: state.createTask,
      isCreating: state.isCreating,
    })),
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTask(form);

    setForm({
      title: '',
      description: '',
    });

    onClose();
  };

  // helper function for onChange
  const handleChange = (field: keyof TaskForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='create-modal'>
      <div className='modal-wrapper'>
        <div className='modal-content'>
          <h2 className='modal-title'>Add New Task</h2>

          <form onSubmit={handleSubmit} className='task-form'>
            <input
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              type='text'
              placeholder='Title'
              required
            />

            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder='Description (optional)'
              rows={4}
            />

            <div className='form-btns'>
              <button type='submit' className='add-btn' disabled={isCreating}>
                {isCreating ? <LoaderCircleIcon className='loading-icon' /> : 'Add Task'}
              </button>
              <button type='button' onClick={onClose} className='cancel-btn'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
