const jwt = require("jsonwebtoken");
// const { restart } = require('nodemon')

module.exports.validateToken = (req, res, next) => {
  // let response = {}
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // if (!req.headers.authorization) {
    //   throw new Error('Token is missing from header')
    // }

    // const userToken = req.headers.authorization.split('Bearer')[1].trim()
    // const decodedToken = jwt.verify(
    //   userToken,
    //   process.env.SECRET_KEY || 'default-secret-key'
    // )
    // return next()
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // On peut attacher des infos du token à la requête
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    // console.error('Error in tokenValidation.js', error)
    // response.status = 401
    // response.message = error.message
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  // return res.status(response.status).send(response);
};
