const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); //Unauthorized;
  }
  try {
    const jwtDecode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = jwtDecode;
  } catch (error) {
    return res.sendStatus(403); //Forbidden;
  }
  next();
};
