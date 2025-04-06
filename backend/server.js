const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');  // Routes pour utilisateurs
const AdminProfileRoute = require('./routes/AdminProfileRoute');

const parentRoutes = require('./routes/parentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/admin", adminRoutes);
 app.use("/api/users", userRoutes);  // Routes pour utilisateurs
app.use("/api/admin/profile", AdminProfileRoute);

app.use('/api/auth/parent', parentRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
