const { addLog } = require("../Db/log");
const { getProject } = require("../Db/project");

const addLogController = async (req, res) => {
    let log = req.body;

    log.project_id = await (await getProject(log.project_short_name))._id;

    try {
        await addLog(log);
        res.status(200).send();
    } catch (err) {
        res.status(202).json(err);
    }

}

module.exports = { addLogController };