const { body } = require('express-validator')

exports.addProject = () => {
    return [
        body('name', 'name does not exists').notEmpty(),
        body('short_name', 'short name does not exists').notEmpty()
    ]
}