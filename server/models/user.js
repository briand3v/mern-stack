const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: 'String', required: true },
    password: { type: 'String', require: true}
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10).then(hashedPassword => {
        user.password = hashedPassword;
        next();
    });
});

userSchema.methods.comparePassword = function (password, next) {
    const user = this;
    bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) return next();
        next(null, isMatch);
    })
};

module.exports = mongoose.model('User', userSchema);
