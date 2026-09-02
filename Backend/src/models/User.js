const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String },
  name: { type: String },
  roles: { type: [String], default: ['user'] },
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetToken: {
    token: String,
    expiresAt: Date,
  },
  refreshTokenHash: { type: String },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);