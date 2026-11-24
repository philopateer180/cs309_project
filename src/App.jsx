import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("cf_users");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("cf_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleRegister = (newUser) => {
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem("cf_users", JSON.stringify(updated));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("cf_current_user");
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-brand">CourseEval</div>
        <div className="nav-links">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
          {currentUser && (
            <button onClick={handleLogout} className="nav-logout">
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register users={users} onRegister={handleRegister} />} />
        <Route path="/login" element={<Login users={users} onLogin={setCurrentUser} />} />
        <Route path="/profile" element={<Profile user={currentUser} onLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  );
}