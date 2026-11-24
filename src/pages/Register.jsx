import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ users, onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    department: "",
    role: "Student",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "studentId") {
      // Allow only digits and cap length at 7 characters
      const digitsOnly = value.replace(/\D/g, "").slice(0, 7);
      setForm({ ...form, studentId: digitsOnly });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.studentId && form.studentId.length > 7) {
      setError("University ID must be at most 7 digits.");
      return;
    }
    if (users.some((u) => u.email === form.email)) {
      setError("An account with this email already exists.");
      return;
    }
    onRegister(form);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <p className="subtitle">Course Feedback &amp; Evaluation System</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>University ID (Max 7 digits)</label>
          <input
            name="studentId"
            type="text"
            inputMode="numeric"
            maxLength={7}
            pattern="\d{1,7}"
            placeholder="e.g., 242****"
            value={form.studentId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            name="email"
            type="email"
            placeholder="you@university.edu"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            name="department"
            placeholder="e.g., Computer Science"
            value={form.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Coordinator">Course Coordinator</option>
          </select>
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn">
          Register
        </button>
      </form>

      <div className="switch-link">
        Already registered? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}