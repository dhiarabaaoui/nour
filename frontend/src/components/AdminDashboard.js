import UserList from "../components/users/UserList"
import "./AdminDashboard.css"

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-sidebar">
        {/* Contenu de la sidebar */}
        <div className="dashboard-logo">Admin Panel</div>
        <nav className="dashboard-nav">
          <ul>
            <li className="active">
              <a href="#">
                <span>👥</span> Utilisateurs
              </a>
            </li>
            <li>
              <a href="#">
                <span>📊</span> Statistiques
              </a>
            </li>
            <li>
              <a href="#">
                <span>⚙️</span> Paramètres
              </a>
            </li>
            <li>
              <a href="#">
                <span>📝</span> Rapports
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>Tableau de bord</h1>
          <div className="user-profile">
            <span>Admin</span>
            <span className="avatar">👤</span>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Intégration de la liste des utilisateurs */}
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

