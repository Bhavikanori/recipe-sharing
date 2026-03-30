const repo = require('../repositories/recipeRepository');

exports.getAll = () => repo.findAll();

exports.search = (keyword) => repo.searchByTitle(keyword);

exports.save = (data) => repo.save(data);

exports.getById = (id) => repo.findById(id);