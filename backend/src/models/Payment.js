const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  currencyName: { type: String, default: 'CR' },
  planType: { type: String, enum: ['credits', 'plan', 'addon'] },
  planName: String,
  planDuration: String,
  paymentMethod: { type: String, enum: ['upi', 'qr_code', 'manual_verification', 'stripe'], default: 'qr_code' },
  upiId: String,
  qrCodeUrl: String,
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'awaiting_verification'], default: 'pending' },
  verificationRequired: { type: Boolean, default: true },
  verifiedByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  verificationNotes: String,
  verificationScreenshot: String,
  verifiedAt: Date,
  isRefunded: { type: Boolean, default: false },
  refundedAmount: Number,
  refundReason: String,
  refundedAt: Date,
  couponCode: String,
  discountAmount: Number,
  discountPercentage: Number,
  orderId: String,
  transactionId: String,
  paymentGatewayResponse: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, index: true },
  completedAt: Date
});

module.exports = mongoose.model('Payment', paymentSchema);
