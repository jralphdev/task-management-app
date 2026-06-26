const AddTaskModal = () => {
  return (
    <div className='modal'>
      <div className='modal-wrapper'>
        <div className='modal-content'>
          <h2 className='modal-title'>Add New Task</h2>

          <form className='task-form'>
            <input type='text' placeholder='Title' required />

            <textarea placeholder='Description (optional)' rows={4} />

            <div className='form-btns'>
              <button type='submit' className='add-btn'>
                Add Task
              </button>
              <button type='button' className='cancel-btn'>
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
