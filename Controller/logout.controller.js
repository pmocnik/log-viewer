const logout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "Logout" });
    } catch (err) {
        this.next(err);
    }
}

module.exports = logout;