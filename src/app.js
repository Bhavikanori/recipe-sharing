const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const recipeController = require('./controllers/recipeController');

const app = express();

// ✅ Set view engine
app.set('view engine', 'ejs');

// ✅ FIXED views path (very important)
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

// ✅ Debug (you can remove later)
console.log("Views folder:", viewsPath);

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Static folder for images
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// ✅ Routes
app.use('/', recipeController);

// ✅ Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});