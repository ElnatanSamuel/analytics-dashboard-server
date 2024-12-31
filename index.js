const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://analytics-dashboard-client.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Basic CORS setup
app.use(cors(corsOptions));

// Additional headers for all responses
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'https://analytics-dashboard-client.vercel.app');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
next();
});



mongoose.connect("mongodb+srv://ktk2real:krosection999@cluster0.abfalpl.mongodb.net/internshiptest?retryWrites=true&w=majority")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));