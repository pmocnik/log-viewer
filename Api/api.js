const cookieSession = require('cookie-session');
const express = require('express');
const { addLogController } = require('../Controller/log.controller');
const login = require('../Controller/login.controller');
const logout = require('../Controller/logout.controller');
const { addProjectController, deleteProjectController } = require('../Controller/project.controller');
const { addUserController, editUserController, deleteUserController } = require('../Controller/user.controller');
const { getUser } = require('../Db/user');
const verifyToken = require('../Middleware/authJwt');
const checkRole = require('../Middleware/role');
const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.use(function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
})

api.use(cookieSession({
    name: "my-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
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
api.put('/addUser', verifyToken, checkRole(["Admin"]), (req, res) => {
    console.log("/addUser");
    addUserController(req, res);
})

api.put('/editUser', verifyToken, checkRole(["Admin"]), (req, res) => {
    console.log("/editUser");
    editUserController(req, res);
})

api.delete('/deleteUser', verifyToken, checkRole(["Admin"]), (req, res) => {
    console.log("/deleteUser");
    deleteUserController(req, res);
})

//Project
api.put('/addProject', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/addProject");
    addProjectController(req, res);
})

api.delete('/deleteProject', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    console.log("/deleteProject");
    deleteProjectController(req, res);
})

//Log
api.put('/addLog', verifyToken, checkRole(["Admin", "User", "System"]), (req, res) => {
    console.log("/addLog");
    addLogController(req, res);
})

api.get('/getLogs', (req, res) => {
    res.send('getLogs')
})

api.get('/addUser', (req, res) => {
    addUser();
    res.send('addUser');
})

api.get('/getUser', (req, res) => {
    getUser();
    res.send('getUser');
})

api.get('/data', verifyToken, checkRole(["Admin", "User"]), (req, res) => {
    res.send('test middleware');
})
module.exports = api; 