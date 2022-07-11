const { severity_levels } = require("../config");
const { addLog, getLogs, getStatistics } = require("../Db/log");
const { getProject } = require("../Db/project");
const { validationResult } = require('express-validator');
const { mongoose } = require("mongoose");
const { Parser } = require('json2csv');

const addLogController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(202).json({ errors: errors.array() });
    }

    let log = req.body;
    try {
        if (!severity_levels.includes(log.severity_level)) throw new Error("Severity level not ok. Must be one of: " + severity_levels.toString());

        const project = await getProject(log.project_short_name);

        if (project == null) throw new Error("Project does not exists!");

        log.project = project._id;

        await addLog(log);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(202).json(err.message);
    }
}

const getLogsController = async (req, res) => {
    let filter = req.query;
    try {
        if (filter.project != null && filter.project != '')
            if (!mongoose.Types.ObjectId.isValid(filter.project))
                throw new Error("Project id not valid!");
        res.status(200).send(await getLogs(filter));
    } catch (err) {
        console.log(err);
        res.status(202).json(err.message);
    }
}

const getStatisticsController = async (req, res) => {
    let projectId = req.query.projectId;
    try {
        res.status(200).send(await getStatistics(projectId));
    } catch (err) {
        res.status(202).json(err.message);
    }
}

const downloadLogsController = async (req, res) => {
    let filter = req.query;
    try {
        if (filter.project != null && filter.project != '')
            if (!mongoose.Types.ObjectId.isValid(filter.project))
                throw new Error("Project id not valid!");

        let data = await getLogs(filter);

        let newData = data.map((item) => {
            return {
                timestamp: item.timestamp,
                message: item.message,
                severity_level: item.severity_level,
                source: item.source,
                project_name: item.project.name,
                project_short_name: item.project.short_name
            };
        })
        if (newData.length == 0) return res.status(202).json("No data selected");;

        const json2csv = new Parser();
        const csv = json2csv.parse(newData);
        res.header('Content-Type', 'text/csv');
        res.attachment("Test.csv");
        res.status(200).send(csv);
    } catch (err) {
        console.log(err);
        res.status(202).json(err.message);
    }
}

module.exports = { addLogController, getLogsController, getStatisticsController, downloadLogsController };