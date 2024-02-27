// routes/routes.js
const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const authController = require('../controllers/authController');
const adminDashboard  = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// auth routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);

// Logout route
router.get('/logout', authController.logout);

// frontend routes
router.get('/', frontendController.index);

// admin routes
router.get('/admin/dashboard',[isAuthenticated,isAdmin],adminDashboard.adminDashboard);

module.exports = router;
