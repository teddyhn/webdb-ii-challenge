
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('VIN', 17);
        tbl.string('make');
        tbl.string('model');
        tbl.integer('mileage');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
