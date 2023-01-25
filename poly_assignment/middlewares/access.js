const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const RESTRICTED_ROLES = ['ADMIN'];

module.exports = async (req, res, next) => {
  // get token from header
  let token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Authorization failed' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.user.id);
    if (!RESTRICTED_ROLES.includes(user.type.toUpperCase())) {
      return res.status(401).json({ msg: 'You are not an admin!!' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Authorization failed' });
  }
};
