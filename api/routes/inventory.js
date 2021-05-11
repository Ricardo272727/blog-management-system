const Router = require("express").Router();
const ajv = require("../ajv/inventory");
const {
  validateBody,
  validateFile,
  validateParams,
} = require("../middlewares/ajv");
const { multerInstance } = require("../multer");
const model = require("../models/inventory");
const { respondError, respondItems, respondSuccess } = require("../responses");
const env = require("../env");

const create = async (req, res) => {
  try {
    const id = await model.create({
      ...req.body,
      image: req.file.filename,
    });
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
    result = result.map((item) => {
      item.image = `${env.url_static_images}/${item.image}`;
      return item;
    });
    return res.send(respondItems(result));
  } catch (error) {
    return res.status(400).send(respondError(error));
  }
};

const update = async (req, res) => {
  try {
    if(req.file){
      req.body.image = req.file.filename;
    } else {
      delete req.body.image;
    }
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
  try{
    const affectedRows = await model.deleteItem(req.params.id);
    return res.send(respondSuccess({ affectedRows }));
  } catch(error){
    return res.status(400).send(respondError(error.message, req.body));
  } 
};

Router.route("/:id?")
  .get(validateParams(ajv.optionalId), read)
  .delete(
    validateParams(ajv.idParam),
    deleteReq
  )
  .put(
    multerInstance.single('image'),
    validateParams(ajv.idParam), validateBody(ajv.edit), update)
  .post(
    multerInstance.single("image"),
    validateBody(ajv.create),
    validateFile(ajv.file),
    create
  );

module.exports = Router;
