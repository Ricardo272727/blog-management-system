const multer = require("multer");
const env = require("../env");

module.exports = { multerInstance: multer({ dest: env.imagesPath }) };
