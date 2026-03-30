const { Recipe } = require('../models/recipeModel');
const { Op } = require('sequelize');

exports.findAll = () => Recipe.findAll();

exports.searchByTitle = (keyword) =>
    Recipe.findAll({
        where: {
            title: { [Op.like]: `%${keyword}%` }
        }
    });

exports.save = (data) => Recipe.create(data);

exports.findById = (id) => Recipe.findByPk(id);