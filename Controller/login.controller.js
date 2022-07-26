const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { getUser, checkPassword } = require("../Db/user");

const login = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = await checkPassword(username, password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            roles: user.roles
        }, jwtSecret, {
            expiresIn: 86400, // 24 hours
        });

        req.session.token = token;
        req.session.userId = user.id;

        return res.status(200).send({
            id: user.id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            roles: user.roles,
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = login;