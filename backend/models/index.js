const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./user")(sequelize, Sequelize);
db.Task = require("./task")(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Task, { foreignKey: "userId", onDelete: "CASCADE" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
