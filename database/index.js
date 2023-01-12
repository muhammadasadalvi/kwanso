const Sequelize = require('sequelize');
const config = require('../config/db.config');

// creating
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: config.dialect,
        host: process.env.DATABASE_HOST,
        pool: {
            // destructuring config.pool object
            ...config.pool
        },
        logging: true
    }
);

module.exports={
    Sequelize, 
    sequelize
}