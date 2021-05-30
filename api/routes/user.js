const _ = require('lodash');
const Router = require("express").Router();
const ajv = require("../ajv/user");
const { validateBody, validateParams } = require("../middlewares/ajv");
const model = require("../models/users");
const { respondError, respondItems, respondSuccess } = require("../responses");
const { encryptPassword } = require('../models/password');


const create = async (req, res) => {
  try {
    req.body.password = encryptPassword(req.body.password);
    const id = await model.create(req.body);
    return res.send(respondSuccess({ id }));
  } catch (error) {
    return res.status(400).send(respondError(error.message, req.body));
  }
};

const read = async (req, res) => {
  try {
    let id = req.params.id;
    let ids = [];
    if (id) ids.push(id);
    let result = await model.read(ids);
    result = _.map(result, (value) => {
      delete value.password;
      return value;
    });
    return res.send(respondItems(result));
  } catch (error) {
    return res.status(400).send(respondError(error));
  }
};



const update = async (req, res) => {
  try {
    if (req.body.password)
      req.body.password = encryptPassword(req.body.password);
    const affectedRows = await model.update({
      id: req.params.id,
      data: req.body,
    });
    return res.send(respondSuccess({ affectedRows: affectedRows[0] }));
  } catch (error) {
    return res.status(400).send(respondError(error.message, req.body));
  }
};

const deleteReq = async (req, res) => {
  try {
    const affectedRows = await model.deleteItem(req.params.id);
    return res.send(respondSuccess({ affectedRows }));
  } catch (error) {
    return res.status(400).send(respondError(error.message, req.body));
  }
};

Router.route("/:id?")
  .get(validateParams(ajv.optionalId), read)
  .delete(validateParams(ajv.idParam), deleteReq)
  .put(validateParams(ajv.idParam), validateBody(ajv.edit), update)
  .post(validateBody(ajv.create), create);

module.exports = Router;
