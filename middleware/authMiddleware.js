const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        try {
            const userRecord = await user.findOne({
                where: {
                    id: decoded.id,
                    accessToken: token,
                },
            });
            if (!userRecord) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = userRecord;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}