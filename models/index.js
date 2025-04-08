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
const models = {};
models.User = require("./user")(sequelize, DataTypes);
models.Role = require("./role")(sequelize, DataTypes);

// Call associate methods
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sync models with database
sequelize
    .sync({ alter: true })
    // .sync({ force: true }) // Use this for development to drop and recreate tables
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Sync error:", err));

module.exports = { sequelize, ...models };
