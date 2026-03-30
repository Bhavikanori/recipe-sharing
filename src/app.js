const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();


const recipeController = require('./controllers/recipeController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', recipeController);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
}); 