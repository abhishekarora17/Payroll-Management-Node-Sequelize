module.exports = (sequelize, DataTypes) => {
    const Salary = sequelize.define('Salary', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        baseSalary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        bonus: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        deductions: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        netSalary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('paid', 'pending', 'failed'),
            allowNull: false,
        },

    }, {
        tableName: 'salaries',
        timestamps: true
    });

    Salary.associate = function (models) {
        Salary.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Salary;
};
