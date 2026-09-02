const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailService = require('./mail.service');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TTL = process.env.REFRESH_TTL || 7 * 24 * 60 * 60 * 1000; // 7 days in ms

async function signup({ email, password, name }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already in use');

  const passwordHash = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(24).toString('hex');

  const user = await User.create({ email, passwordHash, name, verificationToken });

  // send verification email (async)
  mailService.sendEmail(
    email,
    'Verify your email',
    `Please verify: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify?token=${verificationToken}`,
  );

  const accessToken = generateAccessToken({ id: user._id, email: user.email, roles: user.roles });
  const refreshToken = await createRefreshToken(user);

  return { user: { id: user._id, email: user.email, name: user.name }, tokens: { accessToken, refreshToken } };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const ok = await bcrypt.compare(password, user.passwordHash || '');
  if (!ok) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken({ id: user._id, email: user.email, roles: user.roles });
  const refreshToken = await createRefreshToken(user);

  return { user: { id: user._id, email: user.email, name: user.name, roles: user.roles }, tokens: { accessToken, refreshToken } };
}

function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function createRefreshToken(user) {
  const token = crypto.randomBytes(48).toString('hex');
  const hash = await bcrypt.hash(token, 10);
  user.refreshTokenHash = hash;
  await user.save();
  return token;
}

async function refreshToken(oldToken) {
  if (!oldToken) throw new Error('No token');
  const users = await User.find({ refreshTokenHash: { $exists: true } });
  for (const u of users) {
    const ok = await bcrypt.compare(oldToken, u.refreshTokenHash || '');
    if (ok) {
      // rotate
      const newToken = await createRefreshToken(u);
      const accessToken = generateAccessToken({ id: u._id, email: u.email, roles: u.roles });
      return { user: { id: u._id, email: u.email, name: u.name, roles: u.roles }, tokens: { accessToken, refreshToken: newToken } };
    }
  }
  throw new Error('Invalid token');
}

async function revokeRefreshToken(token) {
  if (!token) return;
  const users = await User.find({ refreshTokenHash: { $exists: true } });
  for (const u of users) {
    const ok = await bcrypt.compare(token, u.refreshTokenHash || '');
    if (ok) {
      u.refreshTokenHash = undefined;
      await u.save();
      return true;
    }
  }
  return false;
}

async function verifyEmail(token) {
  const user = await User.findOne({ verificationToken: token });
  if (!user) throw new Error('Invalid token');
  user.isEmailVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return true;
}

async function requestPasswordReset(email) {
  const user = await User.findOne({ email });
  if (!user) return; // do not reveal

  const token = crypto.randomBytes(24).toString('hex');
  user.resetToken = { token, expiresAt: Date.now() + 1000 * 60 * 60 }; // 1 hour
  await user.save();

  mailService.sendEmail(
    email,
    'Password reset',
    `Reset: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset?token=${token}`
  );
}

async function resetPassword(token, newPassword) {
  const user = await User.findOne({ 'resetToken.token': token });
  if (!user) throw new Error('Invalid or expired token');
  if (Date.now() > user.resetToken.expiresAt) throw new Error('Invalid or expired token');

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  await user.save();
}

module.exports = { signup, login, generateAccessToken, refreshToken, revokeRefreshToken, verifyEmail, requestPasswordReset, resetPassword };
