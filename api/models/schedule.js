const knex = require("../database");

const TABLE = "schedules";

const create = ({ start_hour, end_hour, date, user_id, laboratory_id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex(TABLE).insert({
        start_hour,
        end_hour,
        date,
        user_id,
        laboratory_id,
      });
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const read = (ids = [], params = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      let laboratory_id = params.laboratory_id;
      let user_id = params.user_id;
      let result = [];
      if (ids.length > 0) {
        result = await knex.select().from(TABLE).whereIn("id", ids);
      } else if (laboratory_id || user_id) {
        if (laboratory_id) {
          result = await knex(TABLE)
            .join("users", "schedules.user_id", "users.id")
            .join("laboratories", "schedules.laboratory_id", "laboratories.id")
            .where("schedules.laboratory_id", "=", laboratory_id)
            .select(
              "schedules.*",
              knex.raw(
                "users.name as username, laboratories.name as laboratory_name"
              )
            );
        }
      } else {
        result = await knex(TABLE)
          .join("users", "schedules.user_id", "users.id")
          .join("laboratories", "schedules.laboratory_id", "laboratories.id")
          .select(
            "schedules.*",
            knex.raw(
              "users.name as username, laboratories.name as laboratory_name"
            )
          );
      }
      return resolve(result);
    } catch (error) {
      console.log({ error });
      return reject(error);
    }
  });

const update = ({ id, data }) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex(TABLE).where("id", id).update(data);
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const deleteItem = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex(TABLE).where("id", id).del();
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

module.exports = { create, read, update, deleteItem };
