const {User, Role} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.register = async (req, res) => {
    const { name, email, password , role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = await User.create({ name, email, password });
        const roleEntity = await Role.findOne({ where: { name: role } });
        if (!roleEntity) {
            return res.status(400).json({ message: "Role not found" });
        }
        newUser.roleId = roleEntity.id;
        await newUser.save();

        const token = await createToken(newUser.id);
        if (!token) {
            return res.status(500).json({ message: "Failed to create token" });
        }

        return res.status(201).json({ message: "User registered successfully", user: newUser, token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne(
            { 
                where: { email } , 
                include: [{ model: Role, as: 'role' }]
            }
        );

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await createToken(existingUser.id);
        if (!token) {
            return res.status(500).json({ message: "Failed to create token" });
        }

        return res.status(200).json({ message: "Login successful",user : existingUser, token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.logout = async (req, res) => {
    try {
        let { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userRecord = await User.findOne({ where: { id } });
        if (!userRecord) {
            return res.status(404).json({ message: "User not found" });
        }
        // Clear the access and refresh tokens in the database
        await User.update({ accessToken: null, refreshToken: null }, { where: { id } });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if(!refreshToken){
        return res.status(400).json({message: 'Refresh token is required.'});
    }

    try {
        const userRecord = await User.findOne({ where: { refreshToken } });
        if (!userRecord) {
            return res.status(404).json({ message: "User not found." });
        }
    
        let newToken = await createToken(userRecord.id);
    
        if (!newToken) {
            return res.status(500).json({ message: "Failed to create token." });
        }
    
        return res.status(200).json({ message: "Token generated successfully.", token: newToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }

}

const createToken = async ( id ) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
    const token = await User.update({ accessToken, refreshToken }, { where: { id } });
    if (!token) {
        return null;
    }
    return { accessToken, refreshToken };
}
