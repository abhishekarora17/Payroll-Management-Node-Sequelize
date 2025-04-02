const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Load environment variables

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false, // Disable SQL logging
    }
);

// Import models
const User = require("./user")(sequelize, DataTypes);

// Sync models with database
sequelize
    .sync({ alter: true }) // Automatically updates schema safely instead of dropping tables
    // .sync({ force: true }) // Use this for development to drop and recreate tables
    .then(() => console.log(" Database synchronized"))
    .catch((err) => console.error(" Sync error:", err));

module.exports = { sequelize, User };
