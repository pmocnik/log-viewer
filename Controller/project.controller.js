const { addProject, deleteProject } = require("../Db/project");

const addProjectController = async (req, res) => {
    //TO-DO validate user.
    let project = await req.body;

    try {
        await addProject(project);
        res.status(200).send();
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

module.exports = { addProjectController, deleteProjectController }