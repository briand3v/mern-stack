const User = require('../models/user');
const { checkUserAlreadyExist } = require('../services/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
signUp = async (req, res, next) => {
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

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
login = (req, res, next) => {
    passport.authenticate('local', { session: false, failureMessage: 'Missing credentials' }, (error, user) => {
        if (error) return res.status(500).json({ message: 'Something bad happened'});
        if (!user) return res.status(404).json({ message: 'User not found' });
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

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
logOut = (req, res) => {
    req.logout();
    return res.status(200).json({ message: 'user logout' });
}

module.exports = {
    signUp,
    login,
    logOut
}
