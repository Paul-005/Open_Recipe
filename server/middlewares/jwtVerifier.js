const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Not Authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is just the email string, convert it to an object
    if (typeof decoded === 'string') {
      req.user = { email: decoded };
    } else {
      req.user = decoded;
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyUser;
