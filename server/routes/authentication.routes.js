const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

// register
router.route('/signup').post(AuthController.signUp);

// log in
router.route('/login').post(AuthController.login);

module.exports = router;
