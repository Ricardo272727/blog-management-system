const Ajv = require("ajv");
const ajv = new Ajv({ verbose: true });

const parseAjvErrors = (errors) => ({
  keyword: errors.keyword,
  dataPath: errors.dataPath,
  schemaPath: errors.schemaPath,
  params: errors.params,
  message: errors.message,
});

const validateBody = (schema) => {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (validate(req.body)) {
      return next();
    } else {
      return res.status(400).send(parseAjvErrors(validate.errors[0]));
    }
  };
};

const validateFile = (schema) => {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (validate(req.file)) {
      return next();
    } else {
      return res.status(400).send(parseAjvErrors(validate.errors[0]));
    }
  };
};

const validateParams = (schema) => {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (validate(req.params)) {
      return next();
    } else {
      return res.status(400).send(parseAjvErrors(validate.errors[0]));
    }
  };
};

module.exports = { validateBody, validateParams, validateFile };
