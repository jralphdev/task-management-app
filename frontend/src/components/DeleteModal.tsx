import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';

const DeleteModal = () => {
  const { deleteTaskId, setDeleteTaskId, deleteTask, isDeleting } = useTaskStore(
    useShallow((state) => ({
      deleteTaskId: state.deleteTaskId,
      setDeleteTaskId: state.setDeleteTaskId,
      deleteTask: state.deleteTask,
      isDeleting: state.isDeleting,
    })),
  );

  if (!deleteTaskId) return null;

  const handleDelete = async () => {
    await deleteTask(deleteTaskId);
    setDeleteTaskId(null);
  };

  return (
    <div className='delete-modal'>
      <div className='modal-wrapper'>
        <div className='modal-content'>
          <h2>Are you sure you want to delete this task?</h2>
          <p>This action cannot be undone.</p>

          <div className='modal-btns'>
            <button onClick={handleDelete} className='delete' disabled={isDeleting}>
              Delete
            </button>
            <button
              onClick={() => setDeleteTaskId(null)}
              className='cancel'
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
