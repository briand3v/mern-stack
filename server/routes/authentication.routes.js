const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication.controller');

// register
router.route('/signup').post(AuthController.signUp);

// log in
router.route('/login').post(AuthController.login);

//logout
router.route('/logout').post(AuthController.logOut)

module.exports = router;
