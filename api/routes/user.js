const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const ajv = require('../ajv/login');
const { validateBody } = require('../middlewares/ajv');
const env = require('../env');

const username = "administrador";
const password = "abc123";

const generateToken = ({ username }) =>
  jwt.sign(
    {
      data: username,
    },
    env.jwtPrivateKey,
    { expiresIn: env.jwtSessionTime }
  );

const authenticate = (req, res) => {
  try {
    let body = req.body;
    if (body.username !== username || body.password !== password) {
      throw new Error("Usuario o contraseña inválidos");
    }
    let token = generateToken({ username: body.username });    
    return res.send({ success: true, token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

Router.post("/authenticate", 
  validateBody(ajv),  
  authenticate
);

module.exports = Router;
