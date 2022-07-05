const { severity_levels } = require("../config");
const { addLog } = require("../Db/log");
const { getProject } = require("../Db/project");

const addLogController = async (req, res) => {
    let log = req.body;
    try {
        if (!severity_levels.includes(log.severity_level)) throw new Error("Severity level not ok. Must be one of: " + severity_levels.toString());

        const project = await getProject(log.project_short_name);

        if (project == null) throw new Error("Project does not exists!");

        log.project_id = project._id;

        await addLog(log);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(202).json(err.message);
    }
}

module.exports = { addLogController };