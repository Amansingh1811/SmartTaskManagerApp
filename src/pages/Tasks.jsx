import { useEffect, useState, useContext } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const { user } = useContext(AuthContext);

  const userId = user?.userId || localStorage.getItem("userId")

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate()
  


  const loadTasks = async () => {
    if (!userId) {
      console.warn("⚠ User not loaded yet");
      return;
    }

    try {
      const res = await client.get(`/tasks/user/${userId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    console.log("Use effect ", userId);
    loadTasks();
  }, []);

  // Toggle complete
  const toggleComplete = async (task) => {
    await client.put(`/tasks/user/${task.id}`, {
      ...task,
      complete: !task.complete,
    });
    loadTasks();
  };

  return (
    <div className="container mt-5">
      <h2>Your Tasks</h2>
      <button className="btn btn-primary"  onClick={() => navigate("/newtasks")}> Add New Task</button>

      {/* Task List */}
      {tasks.length == 0 ? (
        <p>No Task Found</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="card task-card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-1">{task.title}</h5>
              {task.complete ? (
                <span className="badge bg-success">Completed</span>
              ) : (
                <span className="badge bg-warning text-dark">Pending</span>
              )}
            </div>

            <p className="text-muted">{task.description}</p>

            <button
              className={`btn btn-sm ${task.complete ? "btn-warning" : "btn-primary"}`}
              onClick={() => toggleComplete(task)}
            >
              {task.complete ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </div>
        )))}
        
    </div>
  );
}
