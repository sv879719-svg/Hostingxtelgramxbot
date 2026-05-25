require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const supportRoutes = require('./routes/support');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB error", err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/app', appRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);

app.get('/health', (_req, res) => res.send('OK'));

app.listen(3000, () => console.log("API server running on 3000"));

module.exports = app;
