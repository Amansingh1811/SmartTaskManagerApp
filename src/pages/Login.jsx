import { useState, useContext } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await client.post("/auth/login", { email, password });
      console.log(res.data);

      login(res.data.token, {
        userId: res.data.userId,
        email: res.data.email,
        role: res.data.role,
        name: res.data.name
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="custom-card bg-white">
        <h3 className="text-center mb-4">Welcome Back 👋</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-lg w-100 mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="fw-bold">Register</a>
        </p>
      </div>
    </div>

  );
}
