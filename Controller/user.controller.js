const { addUser, editUser, deleteUser } = require("../Db/user");

const addUserController = async (req, res) => {
    //TO-DO validate user.
    let user = await req.body;

    try {
        await addUser(user);
        res.status(200).send();

    } catch (err) {
        res.status(202).json(err);
    }
}

const editUserController = async (req, res) => {
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

module.exports = { addUserController, editUserController, deleteUserController };