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

const read = (ids = []) =>
  new Promise(async (resolve, reject) => {
    try {
      let result = [];
      if (ids.length > 0) {
        result = await knex.select().from(TABLE).whereIn("id", ids);
      } else {
        result = await knex.select().from(TABLE);
      }
      result = result.map((item) => {
        item.username = item.user_id == 1 ? "Lilia Mantilla" : "Josué Sanchez";
        item.laboratory_name =
          item.laboratory_id == 1 ? "Laboratorio 1" : "Laboratorio 2";
        return item;
      });
      return resolve(result);
    } catch (error) {
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
