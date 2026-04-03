require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const pipelineRoutes = require('./routes/pipelineRoutes'); // ✅ ADD THIS

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware FIRST
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ✅ Routes SECOND
app.use('/auth', require('./routes/auth'));
app.use('/api', pipelineRoutes); // ✅ ADD THIS

// ✅ Test route
app.get('/', (req, res) => {
  res.send('⚡ InfraFlow API is running! 🚀');
});

// ✅ Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 Successfully connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Server starts LAST
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});