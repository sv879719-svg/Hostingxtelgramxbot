const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true, index: true },
  username: String,
  firstName: String,
  lastName: String,
  panelPassword: { type: String, required: true },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  plan: { type: String, enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
  planExpireAt: Date,
  credits: { type: Number, default: 0, min: 0 },
  totalCreditsUsed: { type: Number, default: 0 },
  hostingTimeRemaining: { type: Number, default: 0 }, // seconds
  hostingTimeExpireAt: Date,
  lastSpinTime: Date,
  spinCount: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  isBlacklisted: { type: Boolean, default: false },
  totalAppsDeployed: { type: Number, default: 0 },
  activeAppsCount: { type: Number, default: 0 },
  sessionToken: String,
  lastActive: Date,
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
