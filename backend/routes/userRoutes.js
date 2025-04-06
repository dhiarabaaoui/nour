const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Middleware pour vérifier le token d'authentification
const authMiddleware = require("../middleware/authMiddleware");

// Lister tous les utilisateurs
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Activer / Désactiver un utilisateur
router.patch("/users/:id/status", authMiddleware, async (req, res) => {
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
router.put("/users/:id", authMiddleware, async (req, res) => {
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
router.delete("/users/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
