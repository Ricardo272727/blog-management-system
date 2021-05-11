
exports.up = function(knex) {
  return knex.schema.createTable('laboratories', function(table){
    table.increments();
    table.string('name');
    table.boolean('busy');
    table.integer('user_id');    
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('laboratories');
};
