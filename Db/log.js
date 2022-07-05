const { default: mongoose } = require("mongoose");
const config = require("../config");
const Log = require('./log.model');

mongoose.connect(config.mongooseConnect);

const addLog = async (log) => {
    const newLog = new Log(log);

    try {
        await newLog.save();
    } catch (err) {
        throw err.message;
    }
}

module.exports = { addLog };