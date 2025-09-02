require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("../routes/auth"));
app.use("/api/tasks", require("../routes/tasks"));

app.get("/", (req, res) => res.send("Task backend with MySQL running"));

const PORT = process.env.PORT || 5000;
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.error("DB sync error:", err));
