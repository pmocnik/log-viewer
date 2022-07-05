const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthenticated!" });
        }
        next();
    });
};

module.exports = verifyToken;