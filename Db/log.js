const { default: mongoose } = require("mongoose");
const config = require("../config");
const Log = require('./log.model');
const moment = require('moment');

mongoose.connect(config.mongooseConnect);

const addLog = async (log) => {
    const newLog = new Log(log);

    try {
        await newLog.save();
    } catch (err) {
        throw err.message;
    }
}

const getLogs = async (filter) => {
    var find = {};
    if (filter.project != null && filter.project != '') {
        find.project = {};
        find.project._id = filter.project;
    }

    if (filter.search != null && filter.search != '') {
        find.$text = {};
        find.$text.$search = filter.search;
    }

    var timestamp = -1;
    if (filter.timestamp != null && filter.timestamp == '-1') timestamp = -1;
    if (filter.timestamp != null && filter.timestamp == '1') timestamp = 1;


    try {
        return await Log.find(find).populate("project").sort({ timestamp: timestamp });
    } catch (err) {
        throw err.message;
    }
}

const getStatistics = async (projectId) => {
    let statistics = {};
    var find = {};
    find.timestamp = {
        $gte: moment().subtract(1, 'days').toDate()
    }
    if (projectId != null && projectId != '') {
        find.project = {};
        find.project._id = projectId;
    }

    try {
        var count = await Log.find(find).count();
        statistics.oneDayCount = count;
    } catch (err) {
        console.log(err);
        throw err.message;
    }

    find.timestamp = {
        $gte: moment().subtract(1, 'hour').toDate()
    }

    try {
        var count = await Log.find(find).count();
        statistics.oneHourCount = count;
    } catch (err) {
        console.log(err);
        throw err.message;
    }

    find.timestamp = {
        $gte: moment().subtract(1, 'days').toDate()
    }

    statistics.oneDaySeverityCount = [];

    for (var iterator = 0; iterator < config.severity_levels.length; iterator++) {
        find.severity_level = config.severity_levels[iterator];
        try {
            var count = await Log.find(find).count();
            var creteWarning = {};
            creteWarning[config.severity_levels[iterator]] = count;
            statistics.oneDaySeverityCount.push(creteWarning);
        } catch (err) {
            console.log(err);
            throw err.message;
        }

    }
    return statistics;
}

module.exports = { addLog, getLogs, getStatistics };