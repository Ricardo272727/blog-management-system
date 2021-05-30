const { encryptPassword } = require("../models/password");

exports.seed = async function (knex) {
  await knex("inventory").del();
  await knex("laboratories").del();
  await knex("schedules").del();
  await knex("licenses").del();
  await knex("users").del();

  await knex("inventory").insert([
    {
      id: 1,
      name: "PLC nano",
      amount: 3,
      image: "PLC-nano.jpg",
      laboratory_id: 1,
    },
    {
      id: 2,
      name: "Arduino uno",
      amount: 5,
      image: "arduino-primaria.jpg",
      laboratory_id: 1,
    },
    {
      id: 3,
      name: "Protoboard",
      amount: 10,
      image: "Protoboard.jpg",
      laboratory_id: 2,
    },
  ]);
  await knex("laboratories").insert([
    { id: 1, name: "Laboratorio 1", busy: false, user_id: 1 },
    { id: 2, name: "Laboratorio 2", busy: false, user_id: 2 },
  ]);
  await knex("schedules").insert([
    {
      id: 1,
      start_hour: "10:00:00",
      end_hour: "11:00:00",
      date: "2021-01-15",
      user_id: 1,
      laboratory_id: 1,
    },
    {
      id: 2,
      start_hour: "12:00:00",
      end_hour: "13:00:00",
      date: "2021-01-15",
      user_id: 2,
      laboratory_id: 2,
    },
  ]);
  await knex("licenses").insert([
    {
      id: 1,
      name: "Proteus 8.5",
      start_datetime: "2021-05-09 00:00:00",
      end_datetime: "2021-05-13 00:00:00",
      status: "activa",
    },
    {
      id: 2,
      name: "Microsoft office",
      start_datetime: "2021-05-09 00:00:00",
      end_datetime: "2021-05-13 00:00:00",
      status: "activa",
    },
  ]);
  await knex("users").insert([
    {
      id: 1,
      name: "Lilia Mantilla",
      nickname: "liliaMantilla",
      password: encryptPassword("lilia123"),
    },
    {
      id: 2,
      name: "Josue Sanchez",
      nickname: "josueSanchez",
      password: encryptPassword("josue123"),
    },
  ]);
};
