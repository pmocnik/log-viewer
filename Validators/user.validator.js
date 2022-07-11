const { body } = require('express-validator')
const config = require('../config')

exports.editUser = () => {
    return [
        body('name', 'name does not exists').notEmpty(),
        body('surname', 'surname does not exists').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('roles', 'Invalid roles').isIn(config.roles),
    ]
}

exports.addUser = () => {
    return [
        body('name', 'name does not exists').notEmpty(),
        body('surname', 'surname does not exists').notEmpty(),
        body('username', 'username does not exists').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password').notEmpty().withMessage('password does not exists').isStrongPassword().withMessage('password not strong'),
        body('roles', 'Invalid roles').isIn(config.roles),
    ]
}
