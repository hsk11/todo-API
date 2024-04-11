const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true, default: 'user'
    },
    metadata: {
        type: Object,
        required: false,
    },
    salt: {
        type: String,
        required: true,
    },

});

// Schema Methods
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password =  crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === hash;
};

const UserDB = mongoose.model('User', userSchema);

module.exports = { UserDB };
