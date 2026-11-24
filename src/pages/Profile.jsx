import { Link, useNavigate } from "react-router-dom";

export default function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="auth-container">
        <h2>No Active Session</h2>
        <p className="subtitle">Please sign in to view your profile details.</p>
        <Link to="/login" className="btn">
          Go to Login
        </Link>
      </div>
    );
  }

  const initials = user.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="profile-header">
        <div className="avatar">{initials}</div>
        <div>
          <h2>{user.fullName}</h2>
          <span className="badge">{user.role}</span>
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-row">
          <span className="profile-label">University ID</span>
          <span className="profile-value">{user.studentId || "—"}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{user.email}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Department</span>
          <span className="profile-value">{user.department || "General"}</span>
        </div>
      </div>

      <button onClick={handleSignOut} className="btn btn-danger">
        Sign Out
      </button>
    </div>
  );
}