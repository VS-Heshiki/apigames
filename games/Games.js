const Sequelize = require('sequelize');
const connection = require('../database/database');

const Games = connection.define('games', {
    title: {
        type: Sequelize.STRING,
        allowEmpty: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowEmpty: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowEmpty: false
    }
})

Games.sync({force : false});

module.exports = Games;