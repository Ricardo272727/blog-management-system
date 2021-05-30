const knex = require("../database");

const create = ({ name, amount, image, laboratory_id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex("inventory").insert({
        name,
        amount,
        image,
        laboratory_id,
      });

      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const read = (ids = [], { laboratory_id }) =>
  new Promise(async (resolve, reject) => {
    try {
      let result = [];
      if (ids.length > 0) {
        result = await knex.select().from("inventory").whereIn("id", ids);
      } else if (laboratory_id) {
        result = await knex
          .select()
          .from("inventory")
          .where("laboratory_id", laboratory_id);
      } else {
        result = await knex.select().from("inventory");
      }
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const update = ({ id, data }) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex("inventory").where("id", id).update(data);
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const deleteItem = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex("inventory").where("id", id).del();
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

module.exports = { create, read, update, deleteItem };
