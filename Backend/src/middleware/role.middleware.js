function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' });
    if (!req.user.roles || !req.user.roles.includes(role)) return res.status(403).send({ error: 'Forbidden' });
    next();
  };
}

module.exports = { requireRole };