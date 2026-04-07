const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/income');
const budgetRoutes = require('./routes/budget');

const app = express();

// ✅ CORS (allow frontend to connect)
app.use(cors({
  origin: '*', // change to your Netlify URL later
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/budget', budgetRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.json({ message: 'BudgetBuddy API is running!' });
});

// ✅ Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// ✅ Start server (IMPORTANT for deployment)
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;