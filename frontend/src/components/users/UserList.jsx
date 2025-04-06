"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import "./users.css"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        })
        setUsers(response.data)
      } catch (error) {
        setError("Erreur lors de la récupération des utilisateurs")
      }
    }

    fetchUsers()
  }, [])

  const handleToggleStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/users/users/${id}/status`,
        { status: !status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        },
      )
      setUsers(users.map((user) => (user._id === id ? { ...user, status: !status } : user)))
    } catch (error) {
      setError("Erreur lors de la mise à jour du statut")
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      setUsers(users.filter((user) => user._id !== id))
    } catch (error) {
      setError("Erreur lors de la suppression de l'utilisateur")
    }
  }

  return (
    <div className="user-list-container">
      <h2>Liste des utilisateurs</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.nom} {user.prenom}
              </td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>
                <span className={`status-badge ${user.status ? "status-active" : "status-inactive"}`}>
                  {user.status ? "Actif" : "Inactif"}
                </span>
              </td>
              <td>
                <button className="btn-toggle" onClick={() => handleToggleStatus(user._id, user.status)}>
                  <span className="btn-icon">{user.status ? "🔴" : "🟢"}</span>
                  <span>{user.status ? "Désactiver" : "Activer"}</span>
                </button>
                <button className="btn-delete" onClick={() => handleDeleteUser(user._id)}>
                  <span className="btn-icon">🗑️</span>
                  <span>Supprimer</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList

