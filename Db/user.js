const mongoose = require('mongoose');
const config = require('../config');
const User = require('./user.model');

mongoose.connect(config.mongooseConnect);

const addUser = async (user) => {

    const newUser = new User(user);
    try {
        await newUser.save();
    } catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            console.log('There was a duplicate key error');
            console.log(err.keyValue);
            throw err.message;
        }
    }
}

const editUser = async (user) => {
    try {
        let dbUser = await getUser(user.username);
        if (dbUser == null) throw new Error("User does not exists!");

        dbUser.name = user.name;
        dbUser.surname = user.surname;
        dbUser.email = user.email;
        dbUser.roles = user.roles;

        await dbUser.save();
    } catch (err) {
        throw err;
    }
}

const deleteUser = async (username) => {
    let dbUser = await getUser(username);

    try {
        await dbUser.remove();
    } catch (err) {
        throw err;
    }
}

const getUserById = async (id) => {
    return await User.findOne({ _id: id });
}

const getUser = async (username) => {
    return await User.findOne({ username: username });
}

const checkPassword = async (username, password) => {
    const user = await User.findOne({ username: username });

    return await user.comparePassword(password);
}

module.exports = { addUser, editUser, deleteUser, getUserById, getUser, checkPassword };