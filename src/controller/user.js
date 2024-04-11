const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { UserDB } = require('../models/user');
async function postUser(req, res) {
    const { name, email, password } = req.body;
    // IF USER ALREADY EXISTS
    const userExists = await UserDB.findOne({ email});
    if (userExists) return res.status(400).send({ message: 'User already exists. Try loging In' });
    const user = new UserDB({ name, email });
    user.setPassword(password);
    await user.save();
    res.send({ message: 'User created' });
}


async function postLogin(req, res) {
    const { email, password } = req.body;
    const user = await UserDB.findOne({ email });
    if (!user || !user.validPassword(password)) return res.status(401).send({ message: 'Invalid email or password' });
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.send({ token });
}

async function getUser(req, res) {
    const users = await UserDB.find({ user: req.user._id });
    res.send(users);
}

module.exports = {
    postUser: {
        handler: postUser,
        validator: {
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required().min(6),
            })
        }
    },
    postLogin: {
        handler: postLogin,
        validator: {
            body: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
        }
    },
    getUser
}