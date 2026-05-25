const mongoose = require('mongoose');

const hostedAppSchema = new mongoose.Schema({
  appId: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appName: { type: String, required: true },
  runtime: { type: String, enum: ['python', 'nodejs', 'website'], required: true },
  entryFile: String,
  fileKey: String,
  uploadedFileName: String,
  uploadedAt: Date,
  deploymentPath: String,
  backupPath: String,
  envVariables: { type: Map, of: String, default: new Map() },
  status: { type: String, enum: ['pending', 'deploying', 'running', 'stopped', 'error', 'suspended'], default: 'pending' },
  containerStatus: String,
  containerId: String,
  containerPort: Number,
  publicUrl: String,
  internalUrl: String,
  allocatedRam: { type: Number, default: 512 }, // MB
  allocatedCpu: { type: Number, default: 0.5 },
  appPassword: { type: String, required: true },
  isPrivate: { type: Boolean, default: true },
  autoRestart: { type: Boolean, default: false },
  autoSleep: { type: Boolean, default: false },
  uptime: { type: Number, default: 0 },
  totalRestarts: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
  lastError: String,
  lastErrorTime: Date,
  consoleLogs: [{
    timestamp: Date,
    message: String,
    type: { type: String, enum: ['info', 'error', 'warning', 'debug'], default: 'info' }
  }],
  deploymentLogs: [{ timestamp: Date, message: String }],
  totalRequests: { type: Number, default: 0 },
  totalBandwidthUsed: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  suspendedAt: Date,
  suspendReason: String,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: Date,
  deletedAt: Date
});

module.exports = mongoose.model('HostedApp', hostedAppSchema);
