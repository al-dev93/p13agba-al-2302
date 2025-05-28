const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
