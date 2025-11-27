import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./pages/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { NewTask } from "./pages/NewTask";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar globally visible */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/newtasks" element={<NewTask />} />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
