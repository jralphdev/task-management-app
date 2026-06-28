import { CheckIcon, LoaderCircleIcon, XIcon } from 'lucide-react';
import type { EditTaskFormProps, TaskForm } from '../types';
import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useShallow } from 'zustand/shallow';

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const [form, setForm] = useState<TaskForm>({
    title: task.title,
    description: task.description,
  });

  const { updateTask, setEditTaskId, isUpdating } = useTaskStore(
    useShallow((state) => ({
      updateTask: state.updateTask,
      setEditTaskId: state.setEditTaskId,
      isUpdating: state.isUpdating,
    })),
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateTask(task.id, form);

    setEditTaskId(null);
  };

  const handleChange = (field: keyof TaskForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className='edit-form'>
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
        placeholder='Description'
        rows={4}
      />

      <div className='form-btns'>
        <button type='submit' className='save-btn' disabled={isUpdating}>
          {isUpdating ? (
            <span className='loading-icon'>
              <LoaderCircleIcon />
            </span>
          ) : (
            <>
              <CheckIcon className='size-4' />
              Save
            </>
          )}
        </button>
        <button
          type='button'
          onClick={() => setEditTaskId(null)}
          className='cancel-btn'
          disabled={isUpdating}
        >
          <XIcon className='size-4' />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
