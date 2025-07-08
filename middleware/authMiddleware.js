const jwt = require("jsonwebtoken");
const {User} = require("../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const rawHeader = req.headers["authorization"];
    if (!rawHeader || !rawHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = rawHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        try {
            const userRecord = await User.findOne({
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
};