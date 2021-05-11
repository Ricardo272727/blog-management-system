
exports.up = function(knex) {
  return knex.schema.createTable('schedules', function(table){
    table.increments();
    table.time('start_hour');
    table.time('end_hour');
    table.date('date');
    table.integer('user_id');
    table.integer('laboratory_id');
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedules');  
};
