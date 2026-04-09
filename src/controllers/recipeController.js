const express = require('express');
const router = express.Router();
const service = require('../services/recipeService');
const multer = require('multer');
const path = require('path');

// Multer config (FIXED)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes

router.get('/', (req, res) => {
    res.redirect('/search');
});

router.get('/search', async (req, res) => {
    let recipes;

    if (req.query.keyword) {
        recipes = await service.search(req.query.keyword);
    } else {
        recipes = await service.getAll();
    }

    res.render('index', { recipes });
});

router.get('/recipe/:id', async (req, res) => {
    try {
        const recipe = await service.getById(req.params.id);

        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }

        res.render('recipe', { recipe });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', upload.single('image'), async (req, res) => {

    const ingredients = Array.isArray(req.body.ingredients)
        ? req.body.ingredients.join(', ')
        : req.body.ingredients;

    const instructions = req.body.instructions.replace(/\n/g, ' ').trim();

    const data = {
        title: req.body.title,
        ingredients,
        instructions,
        imagePath: req.file ? req.file.filename : null
    };

    await service.save(data);

    res.redirect('/search');
});

module.exports = router;