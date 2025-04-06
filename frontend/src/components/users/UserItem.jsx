import React from 'react';
import axios from 'axios';

const UserItem = ({ user }) => {

  // Activer/Désactiver l'utilisateur
  const handleActivateDeactivate = () => {
    const updatedUser = { ...user, isActive: !user.isActive };
    axios.put(`/api/admin/users/${user._id}`, updatedUser)
      .then(response => {
        alert(`Utilisateur ${updatedUser.isActive ? 'activé' : 'désactivé'}`);
        window.location.reload();
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du statut", error);
      });
  };

  // Supprimer un utilisateur
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`/api/admin/users/${user._id}`)
        .then(() => {
          alert('Utilisateur supprimé');
          window.location.reload();
        })
        .catch(error => {
          console.error("Erreur lors de la suppression", error);
        });
    }
  };

  // Modifier un utilisateur (redirige vers une page de modification)
  const handleEdit = () => {
    window.location.href = `/edit-user/${user._id}`;
  };

  return (
    <tr>
      <td>{user.nom} {user.prenom}</td>
      <td>{user.email}</td>
      <td>{user.userType}</td>
      <td>{user.isActive ? 'Actif' : 'Inactif'}</td>
      <td>
        <button onClick={handleActivateDeactivate}>
          {user.isActive ? 'Désactiver' : 'Activer'}
        </button>
        <button onClick={handleEdit}>
          Modifier
        </button>
        <button onClick={handleDelete}>
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
