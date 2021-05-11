
exports.up = function(knex) {
  return knex.schema.createTable('inventory', function(table){
    table.increments();
    table.string('name');
    table.integer('amount');
    table.string('image');
    table.integer('laboratory_id');
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('inventory');  
};
