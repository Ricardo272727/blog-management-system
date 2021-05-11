const env = require("../env");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: env.db_host,
    user: env.db_user,
    password: env.db_password,
    database: env.db_name,
  },
});

module.exports = knex;
