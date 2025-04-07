import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/")
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo">Admin Panel</div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="users">
                <span>👥</span> Users
              </Link>
            </li>
            <li>
              <a href="#"><span>📊</span> Statistics</a>
            </li>
            <li>
              <a href="#"><span>⚙️</span> Settings</a>
            </li>
            <li>
              <a href="#"><span>📝</span> Reports</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div
            className="user-profile"
            onClick={() => setShowMenu(!showMenu)}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <span>Admin</span>
            <span className="avatar">👤</span>

            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>
                  <span style={{ marginRight: "8px" }}>🚪</span> Log Out
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
