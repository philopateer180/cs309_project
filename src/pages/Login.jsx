import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ users, onLogin }) {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const matched = users.find((u) => u.studentId === studentId && u.email === email && u.password === password);
    if (!matched) {
      setError("Invalid Student ID, email, or password.");
      return;
    }
    localStorage.setItem("cf_current_user", JSON.stringify(matched));
    onLogin(matched);
    navigate("/profile");
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <p className="subtitle">Access your course evaluation account</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>University ID</label>
          <input
            type="text"
            placeholder="Enter your university id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <div className="switch-link">
        Need an account? <Link to="/register">Create one</Link>
      </div>
    </div>
  );
}