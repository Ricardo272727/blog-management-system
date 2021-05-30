const md5 = require('md5');

const encryptPassword = (password) => md5(password);
const passwordMatch = (passwordText, passwordMd5) =>
  md5(passwordText) === passwordMd5;

module.exports = { encryptPassword, passwordMatch };
