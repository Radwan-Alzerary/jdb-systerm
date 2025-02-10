const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || "thaerfaez777";

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)

  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"
  console.log(token)

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Contains id, role, entityId
    next();
  });
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: 'Not authenticated' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
