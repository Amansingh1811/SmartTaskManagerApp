import { useState } from "react";
import client from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.post("/users/create", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
  <div className="custom-card bg-white">
    <h3 className="text-center mb-4">Create Your Account 🚀</h3>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Name</label>
        <input
          className="form-control form-control-lg"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input
          type="email"
          className="form-control form-control-lg"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          type="password"
          className="form-control form-control-lg"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button className="btn btn-success btn-lg w-100">Register</button>
    </form>
  </div>
</div>

  );
}
