require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const pipelineRoutes = require('./routes/pipelineRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED CORS (ALLOW FRONTEND + LOCALHOST)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://infraflow-frontend.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/api', pipelineRoutes);

// ✅ TEST ROUTE
app.get('/', (req, res) => {
  res.send('⚡ InfraFlow API is running! 🚀');
});

// ✅ MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});