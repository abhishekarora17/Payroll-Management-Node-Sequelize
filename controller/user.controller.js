const {User} = require("../models");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
}
// Get a user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
}
// Update a user by ID
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}
// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}
// Update user role
exports.updateRole = async (req , res) => {
    const {id} = req.params;
    const { role  } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message : "User not found "});
        }

        user.role = role;
        await user.save();
        res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role", error });
    }
}
