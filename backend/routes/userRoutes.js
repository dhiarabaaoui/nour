const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Middleware pour vérifier le token d'authentification
const authMiddleware = require("../middleware/authMiddleware");

// Lister tous les utilisateurs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Activer / Désactiver un utilisateur
router.patch("/:id/status", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Modifier un utilisateur
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Supprimer un utilisateur
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Récupérer le profil de l'utilisateur connecté
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclure le mot de passe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier son propre profil
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});
module.exports = router;
