const { default: mongoose } = require("mongoose");
const config = require("../config");
const Project = require('./project.model');


mongoose.connect(config.mongooseConnect);

const addProject = async (project) => {
    const newProject = new Project(project);
    try {
        await newProject.save();
        return newProject._id;
    } catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            console.log('There was a duplicate key error');
            console.log(err.keyValue);
            throw err.message;
        }
    }
}

const deleteProject = async (projectShortName) => {
    console.log(projectShortName);
    let dbProject = await getProject(projectShortName);

    try {
        await dbProject.remove();
    } catch (err) {
        throw err;
    }
}

const getProject = async (projectShortName) => {
    return await Project.findOne({ short_name: projectShortName });
}

const getProjects = async () => {
    return await Project.find();
}

module.exports = { getProject, getProjects, addProject, deleteProject }