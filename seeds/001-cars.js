
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 'WAUGFAFC6FN014725', make: 'Porsche', model: '911', mileage: 12},
        {VIN: '1GA2GYDG2A1151114', make: 'Toyota', model: 'Yaris iA', mileage: 3210},
        {VIN: '1FTNS24202HA75860', make: 'Kia', model: 'Stinger', mileage: 69}
      ]);
    });
};
