const { body } = require('express-validator')
const config = require('../config')

exports.addLog = () => {
    return [
        body('timestamp', 'timestamp does not exists').notEmpty(),
        body('message', 'message does not exists').notEmpty(),
        body('severity_level', 'severity level not ok').isIn(config.severity_levels),
        body('source', 'source does not exists').notEmpty(),
        body('project_short_name', 'project short name does not exists').notEmpty()
    ]
}