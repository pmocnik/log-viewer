const { addProject, deleteProject, getProjects } = require("../Db/project");
const { validationResult } = require('express-validator');

const addProjectController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(202).json({ errors: errors.array() });
    }

    let project = await req.body;

    try {
        res.status(200).send(await addProject(project));
    } catch (err) {
        res.status(202).json(err);
    }

}

const deleteProjectController = async (req, res) => {
    let project = await req.body;

    try {
        await deleteProject(project.short_name);
        res.status(200).send();
    } catch (err) {
        res.status(202).json(err);
    }
}

const getProjectsController = async (req, res) => {
    try {
        res.status(200).send(await getProjects());
    } catch (err) {
        res.status(202).json(err);
    }
}

module.exports = { addProjectController, deleteProjectController, getProjectsController }