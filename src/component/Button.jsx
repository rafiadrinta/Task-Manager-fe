const Button = ({ editingTask, addTask, updateTask }) => {
  return (
    <div>
      {editingTask ? (
        <button onClick={updateTask} id="updateTaskBtn" className="btn btn-success w-100">
          Update Task
        </button>
      ) : (
        <button onClick={addTask} id="addTaskBtn" className="btn btn-primary w-100">
          Tambah Task
        </button>
      )}
    </div>
  );
};

export default Button;
