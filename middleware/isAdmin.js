const jwt = require("jsonwebtoken");
const {User, Role} = require("../models");
require("dotenv").config();

// Middleware to check if the user is an admin
module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token , process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                return res.status(401).json({ message: "Unauthorized User" });
            }

            const user = await User.findOne({
            where: { id: decoded.id },
            include: [
                {
                    model: Role,
                    as: 'role'
                }
            ]
            });
              
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            if(user.role.id != 1) {
                return res.status(403).json({ message: "Forbidden! Admins Only." });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
