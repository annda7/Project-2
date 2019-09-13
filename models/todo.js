module.exports = function(sequelize, DataTypes) {
  var toDoDB = sequelize.define("toDoDB", {
    text: DataTypes.STRING,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
      },
    description: DataTypes.TEXT
  });
  return toDoDB;
};
