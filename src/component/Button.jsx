const Button = () => {
    return ( 
        <div>
            <button id="addTaskBtn" className="btn btn-primary w-100">Tambah Task</button>
            <button id="updateTaskBtn" className="btn btn-success w-100 d-none">Update Task</button>
        </div>
     );
}
 
export default Button;