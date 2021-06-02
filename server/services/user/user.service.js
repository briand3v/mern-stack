const User = require('../../models/user');

checkUserAlreadyExist = async (username) => {
    try {
        return await User.findOne({ username });
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = {
    checkUserAlreadyExist
}