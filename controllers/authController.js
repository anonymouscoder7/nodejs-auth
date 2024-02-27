
const bcrypt = require('bcrypt');
const db = require('../models/model');
const passport = require('passport');

function getLoginPage(req, res) {
    res.render('auth/login', { errorMessage: '' });
}

// async function login(req, res) {
//     const { email, password } = req.body;
//     try {
//         // Find user by email
//         const user = await db.Users.findOne({ where: { email: email } });

//         // If user not found or password does not match, return error
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.render('auth/login', { errorMessage: 'Invalid email or password.' });
//         }

//         // User authenticated, redirect to dashboard or profile page
//         res.redirect('/admin/dashboard');
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }
function login(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}
function getRegisterPage(req, res) {
    res.render('auth/register', { errorMessage: '' });
}

async function register(req, res) {
    const { name, email, password, confirm_password } = req.body;
    console.log(password)
    try {
        // Check if password and confirm_password match
        if (password !== confirm_password) {
            return res.render('auth/register', { errorMessage: 'Passwords do not match.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await db.Users.create({ name: name, email: email, password: hashedPassword });

        // Registration successful, redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
}

function logout(req, res) {
    req.logout(); // Logout the user
    res.redirect('/login'); // Redirect the user to the login page
}

module.exports = {
    getLoginPage,
    login,
    getRegisterPage,
    register,
    logout
};
