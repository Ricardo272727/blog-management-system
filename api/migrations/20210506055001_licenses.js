
exports.up = function(knex) {
  return knex.schema.createTable('licenses', function(table){
    table.increments();
    table.string('name');
    table.datetime('start_datetime');
    table.datetime('end_datetime');
    table.enu('status', ['expirada', 'activa']);
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('licenses');  
};
