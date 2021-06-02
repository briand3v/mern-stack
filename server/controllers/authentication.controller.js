const User = require('../models/user');
const { checkUserAlreadyExist } = require('../services/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ 'message': 'Password does not match' });
    }

    try {
        const userAccount = await checkUserAlreadyExist(username);
        if (userAccount) return res.status(400).json({ message: 'User already exist' });

        const newUser = new User();
        newUser.username = username;
        newUser.password = password;

        const user = await newUser.save();
        res.status(201).json({ data: { user: { id: user._id, username: user.username } }});

    } catch (error) {
        throw next(error);
    }
}

const login = (req, res, next) => {
    passport.authenticate('local', { session: false, failureMessage: 'Missing credentials' }, (error, user) => {
        if (error || !user) return next(error);
        // token generate
        const payload = {
            sub: user._id,
            iat: Date.now() + parseInt(process.env.JWT_EXPIRATION),
            username: user.username
        };

        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
        res.status(200).json({ data: { token: token, user: { id: user._id, username: user.username } }});
    })(req, res, next);
}

module.exports = {
    signUp,
    login
}
