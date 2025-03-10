const EditTask = ({ title, status, setTitle, setStatus }) => {
    return ( 

    <div className="card p-3 mt-4">
        <div className="mb-3">
            <label for="taskTitle" className="form-label">Judul Task</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="taskTitle" className="form-control" placeholder="Masukkan judul tugas" />
        </div>
        <div className="mb-3">
            <label for="taskStatus" className="form-label">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} id="taskStatus" className="form-control">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    </div>

     );
}
 
export default EditTask;