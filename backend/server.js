const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const adminProfileRoutes = require('./routes/AdminProfileRoute');
// ✅ use consistent lowercase
const pedagogueRoutes = require('./routes/pedagogueuserRoutes');
const healthcareRoutes = require('./routes/healthcareRoutes');
const parentRoutes = require('./routes/parentRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount Routes
app.use('/api/admin', adminRoutes);                      // Admin actions
app.use('/api/admin/profile', adminProfileRoutes);       // Admin profile
app.use('/api/pedagogues', pedagogueRoutes);             // Pedagogue registration/login
app.use('/api/healthcare', healthcareRoutes);            // Healthcare professional
app.use('/api/auth/parent', parentRoutes);               // Parent auth/registration
app.use('/api/users', userRoutes);                       // General user-related
app.use('/api/auth', authRoutes);                        // Global auth (login/register)

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
