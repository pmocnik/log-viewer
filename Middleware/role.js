const { getUserById } = require("../Db/user");

const checkRole = (roles) => {
    return async (req, res, next) => {
        let userId = req.session.userId;

        const user = await getUserById(userId);
        let matchingRoles = [];
        roles.forEach(element => {
            if (user.roles.includes(element)) matchingRoles.push(element);
        });

        if (matchingRoles.length > 0) return next();

        return res.status(401).send({
            message: "Unauthorized!",
        })
    }
}

module.exports = checkRole;