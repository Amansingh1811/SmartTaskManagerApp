import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/axiosClient";

export function NewTask() {

    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const navigate = useNavigate()

      // Add task
  const addTask = async (e) => {
    e.preventDefault()
    await client.post("/tasks/user/create/tasks", {
      ...newTask,
    });

    setNewTask({ title: "", description: "" });
    navigate("/tasks")
  };

    return (
        //   {/* Add Task */}
        <div className="card card-body mt-3">
            <h5>Add New Task</h5>

            <form onSubmit={addTask}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={newTask.description}
                        onChange={(e) =>
                            setNewTask({ ...newTask, description: e.target.value })
                        }
                    ></textarea>
                </div>

                <button className="btn btn-primary">Add Task</button>
            </form>
        </div>
    )
}