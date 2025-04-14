module.exports = (sequelize, DataTypes) => {
  const SalaryRecord = sequelize.define('SalaryRecord', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baseSalary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'salaryRecords',
    timestamps: true
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

  SalaryRecord.associate = function (models) {
    SalaryRecord.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return SalaryRecord;
};
