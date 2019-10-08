const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving cars" });
        });
});

router.get('/:id', (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .first()
        .then(car => {
            car ? res.status(200).json(car) : res.status(404).json({ message: "car not found" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving specified car" })
        });
});

router.post('/', validateCar, (req, res) => {
    db('cars')
        .insert(req.body, 'id')
        .then(id => {
            res.status(200).json(id);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error adding car" })
        });
});

function validateCar(req, res, next) {
    const { VIN, make, model, mileage } = req.body;
    console.log(req.body);
    if (req.body && Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing car data" })
    } else if (!VIN || !make || !model || !(mileage >= 0)) {
        res.status(400).json({ message: "missing required field(s)" })
    } else next();
}

module.exports = router;
