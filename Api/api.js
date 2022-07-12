const cookieSession = require('cookie-session');
const express = require('express');
const { addLogController, getLogsController, getStatisticsController, downloadLogsController } = require('../Controller/log.controller');
const login = require('../Controller/login.controller');
const logout = require('../Controller/logout.controller');
const { addProjectController, deleteProjectController, getProjectsController } = require('../Controller/project.controller');
const { addUserController, editUserController, deleteUserController } = require('../Controller/user.controller');
const { getUser } = require('../Db/user');
const verifyToken = require('../Middleware/authJwt');
const checkRole = require('../Middleware/role');
const userValidate = require('../Validators/user.validator');
const projectValidate = require('../Validators/project.validator');
const logValidate = require('../Validators/log.validator');
const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.use(cookieSession({
    name: "my-session",
    secret: "COOKIE_SECRET",
    httpOnly: false
}))

//Auth
api.post('/login', (req, res) => {
    console.log("/login");
    login(req, res);
})

api.post('/logout', (req, res) => {
    console.log("/logout");
    logout(req, res);
})

//User
api.put('/addUser', verifyToken, checkRole(["Admin"]), userValidate.addUser(), (req, res) => {
    console.log("/addUser");
    addUserController(req, res);
})

api.put('/editUser', verifyToken, checkRole(["Admin"]), userValidate.editUser(), (req, res) => {
    console.log("/editUser");
    editUserController(req, res);
})

api.delete('/deleteUser', verifyToken, checkRole(["Admin"]), (req, res) => {
    console.log("/deleteUser");
    deleteUserController(req, res);
})

//Project
api.get('/getProjects', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/getProjects");
    getProjectsController(req, res);
})

api.put('/addProject', verifyToken, checkRole(["Admin", "User"]), projectValidate.addProject(), (req, res) => {
    console.log("/addProject");
    addProjectController(req, res);
})

api.delete('/deleteProject', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/deleteProject");
    deleteProjectController(req, res);
})

//Log
api.post('/addLog', verifyToken, checkRole(["Admin", "User", "System"]), logValidate.addLog(), (req, res) => {
    console.log("/addLog");
    addLogController(req, res);
})

api.get('/getLogs', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/getLogs");
    getLogsController(req, res);
})

api.get('/getStatistics', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/getStatistics");
    getStatisticsController(req, res);
})

api.get('/downloadCsv', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/downloadCsv");
    downloadLogsController(req, res);
})

module.exports = api; 