module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    effortDays: { type: DataTypes.INTEGER, defaultValue: 0 },
    dueDate: { type: DataTypes.DATE },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
  return Task;
};
