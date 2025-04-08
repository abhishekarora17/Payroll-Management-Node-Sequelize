module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
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
    }, {
        defaultScope: 
        {
            attributes: { 
                exclude: [
                    "createdAt",
                    "updatedAt"
                ] 
            }  // Exclude password by default
        },

    });

    Role.associate = (models) => {
        Role.hasMany(models.User , { foreignKey  : 'roleId'})
    }

    return Role;
};