module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late', 'half-day'),
      allowNull: true,
    },
    checkIn: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    checkOut: {
      type: DataTypes.TIME,
      allowNull: true,
    }
  }, {
    tableName: 'attendances',
    timestamps: true
  });

  Attendance.associate = function(models) {
    Attendance.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Attendance;
};
