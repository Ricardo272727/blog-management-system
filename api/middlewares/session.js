const _ = require("lodash");
const jwt = require("jsonwebtoken");
const env = require("../env");

const sessionMiddleware = (req, res, next) => {
  let token = _.get(req.headers, "token", "");
  try {
    if (!token) {
      return res.status(401).send({ error: "Missing token" });
    }
    jwt.verify(token, env.jwtPrivateKey);
  } catch (error) {
    return res.status(401).send({ error: "Session expired", code: 'session-expired' });
  }
  return next();
};

module.exports = { sessionMiddleware };
