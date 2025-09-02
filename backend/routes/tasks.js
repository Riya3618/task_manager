const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../backend/middleware/auth");
const { Task } = require("../backend/models");
const ExcelJS = require("exceljs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "..", "uploads/") });

// Create task
router.post(
  "/",
  auth,
  [body("title").notEmpty().withMessage("Title required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const task = await Task.create({ ...req.body, userId: req.user.id });
      res.status(201).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// List tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.update(req.body);
  res.json(task);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.destroy();
  res.json({ message: "Task deleted" });
});

// Export to Excel
router.get("/export/xlsx", auth, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Tasks");
  sheet.columns = [
    { header: "Title", key: "title" },
    { header: "Description", key: "description" },
    { header: "EffortDays", key: "effortDays" },
    { header: "DueDate", key: "dueDate" },
    { header: "Completed", key: "completed" },
  ];
  tasks.forEach((t) => sheet.addRow(t.toJSON()));
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=tasks.xlsx");
  await workbook.xlsx.write(res);
  res.end();
});

// Upload CSV/XLSX
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  let rows = [];

  try {
    if (ext === ".csv") {
      const csv = fs.readFileSync(filePath, "utf8");
      rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true });
    } else if (ext === ".xlsx") {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.worksheets[0];
      worksheet.eachRow((row, idx) => {
        if (idx === 1) return; // skip header
        const [title, description, effortDays, dueDate] = row.values.slice(1);
        rows.push({ title, description, effortDays, dueDate });
      });
    } else return res.status(400).json({ message: "Only CSV/XLSX allowed" });

    const tasks = await Promise.all(
      rows.map((r) =>
        Task.create({
          title: r.title,
          description: r.description || "",
          effortDays: Number(r.effortDays) || 0,
          dueDate: r.dueDate ? new Date(r.dueDate) : null,
          userId: req.user.id,
        })
      )
    );

    fs.unlinkSync(filePath);
    res.json({ created: tasks.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
