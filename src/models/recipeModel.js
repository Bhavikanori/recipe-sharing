const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // ✅ ADD THIS

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    imagePath: DataTypes.STRING
}, {
    tableName: 'recipes'
});

sequelize.sync()
    .then(() => console.log("Table created correctly"))
    .catch(err => console.error("DB Error:", err));

module.exports = { Recipe };