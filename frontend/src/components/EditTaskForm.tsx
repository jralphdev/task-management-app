import { CheckIcon, XIcon } from 'lucide-react';

const EditTaskForm = () => {
  return (
    <form className='edit-form'>
      <input type='text' placeholder='Title' required />
      <textarea placeholder='Description' rows={4} />

      <div className='form-btns'>
        <button type='submit' className='save-btn'>
          <CheckIcon className='size-4' />
          Save
        </button>
        <button type='button' className='cancel-btn'>
          <XIcon className='size-4' />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
