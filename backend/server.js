const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const AdminProfileRoute = require('./routes/AdminProfileRoute'); // Assurez-vous que ce fichier existe

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Déclaration des routes
app.use("/api/admin", adminRoutes);  // Si vous avez des routes administrateur dans adminRoutes
app.use("/api/admin/profile", AdminProfileRoute);  // Ajout de la route AdminProfileRoute

// Route par défaut pour vérifier si le backend fonctionne
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
