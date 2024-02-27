const express = require('express');
const app = express();
const router = require('./routes/routes'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./middleware/passport-config');
const flash = require('express-flash');

// Set up session middleware
app.use(session({
    secret: 'anConOymDouEsR', 
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Set up Flash middleware
app.use(flash());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up your database models
const db = require("./models/model");

// Synchronize models with database and force sync (use with caution in production)
// db.sequelize.sync({ force: true }) 

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Define middleware to parse JSON bodies
app.use(express.json());

// Use your router
app.use('/', router);

// Set port and start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
