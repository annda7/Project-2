module.exports = function (sequelize, DataTypes) {
  var toDo = sequelize.define("toDo", {
    description: DataTypes.TEXT,
    is_outdoor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    completion_status: {
      defaultValue: 'notDone',
      type: DataTypes.TEXT
    },
    createdBy: DataTypes.STRING
  });
  return toDo;
};
