const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const ajv = require("../ajv/login");
const { validateBody } = require("../middlewares/ajv");
const env = require("../env");
const model = require("../models/users");
const { passwordMatch } = require("../models/password");
const _ = require("lodash");

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

const authenticate = async (req, res) => {
  try {
    let body = req.body;
    let result = await model.readByNickname({ nickname: body.username });
    let user = _.get(result, "[0]", null);
    if (!user) {
      throw new Error("Usuario no registrado");
    }
    if (!passwordMatch(body.password, user.password)) {
      throw new Error("Usuario o contraseña inválidos");
    }
    let token = generateToken({ username: body.username });
    return res.send({ success: true, token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

Router.post("/authenticate", validateBody(ajv), authenticate);

module.exports = Router;
