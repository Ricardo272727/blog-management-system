const knex = require("../database");

const TABLE = "users";

const create = ({ name, nickname, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex(TABLE).insert({
        name,
        nickname,
        password,
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
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const readByNickname = async ({ nickname }) =>
  new Promise(async (resolve, reject) => {
    try {
      let result = await knex.select().from(TABLE).where("nickname", nickname);
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

module.exports = { create, read, readByNickname, update, deleteItem };
