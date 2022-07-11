const { addUser, editUser, deleteUser, getUserById } = require("../Db/user");
const { validationResult } = require('express-validator');

const getUserController = async (req, res) => {
    try {
        res.status(200).send(await getUserById(req.session.userId));
    } catch (err) {
        res.status(202).json(err);
    }
}

const addUserController = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(202).json({ errors: errors.array() });
    }

    let user = await req.body;

    try {
        res.status(200).send(await addUser(user));

    } catch (err) {
        res.status(202).json(err);
    }
}

const editUserController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(202).json({ errors: errors.array() });
    }

    let user = await req.body;
    try {
        await editUser(user);
        res.status(200).send();

    } catch (err) {
        res.status(202).json(err);
    }
}

const deleteUserController = async (req, res) => {
    let user = await req.body;
    try {
        await deleteUser(user.username);
        res.status(200).send();

    } catch (err) {
        res.status(202).json(err);
    }
}

module.exports = { getUserController, addUserController, editUserController, deleteUserController };