const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id:
            { 
                type: DataTypes.INTEGER, 
                primaryKey: true, 
                autoIncrement: true 
            },
        name: 
            { 
                type: DataTypes.STRING, 
                allowNull: false 
            },
        email: 
            { 
                type: DataTypes.STRING, 
                unique: true, 
                allowNull: false 
            },
        password: 
            { 
                type: DataTypes.STRING, 
                allowNull: false 
            },
        roleId: 
            { 
                type: DataTypes.INTEGER 
            },
        accessToken: 
            { 
                type: DataTypes.STRING 
            },
        refreshToken: 
            { 
                type: DataTypes.STRING 
            },
    },  {
        defaultScope: 
        {
            attributes: { 
                exclude: [
                    // "password",
                    "accessToken",
                    "refreshToken",
                    "createdAt",
                    "updatedAt"
                ] 
            }  // Exclude password by default
        },
        // scopes: 
        // {
        //     withPassword: { attributes: { include: ["password"] } }  // Use explicitly when needed
        // }
    });

    User.associate = (models) => {
        User.belongsTo(models.Role , { foreignKey  : 'roleId'})
    }

    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    return User;
};