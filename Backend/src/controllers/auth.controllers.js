const authService = require('../services/auth.service');

const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || 'refreshToken';
const COOKIE_OPTIONS = { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' };

module.exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await authService.signup({ email, password, name });

    // set refresh token cookie
    res.cookie(REFRESH_COOKIE_NAME, result.tokens.refreshToken, COOKIE_OPTIONS);

    res.status(201).send({ user: result.user, accessToken: result.tokens.accessToken });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.cookie(REFRESH_COOKIE_NAME, result.tokens.refreshToken, COOKIE_OPTIONS);
    res.send({ user: result.user, accessToken: result.tokens.accessToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.refresh = async (req, res) => {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    const result = await authService.refreshToken(token);
    res.cookie(REFRESH_COOKIE_NAME, result.tokens.refreshToken, COOKIE_OPTIONS);
    res.send({ user: result.user, accessToken: result.tokens.accessToken });
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(401).send({ error: 'Invalid refresh token' });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    await authService.revokeRefreshToken(token);
    res.clearCookie(REFRESH_COOKIE_NAME, COOKIE_OPTIONS);
    res.send({ success: true });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.verify = async (req, res) => {
  try {
    const { token } = req.query;
    await authService.verifyEmail(token);
    res.send({ success: true });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);
    res.send({ success: true });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.send({ success: true });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.me = async (req, res) => {
  try {
    // requireAuth middleware sets req.user
    res.send({ user: req.user });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};