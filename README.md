#  Task Manager App

A full-stack **To-Do Task Management** application with:  
✅ User Authentication  
✅ Task CRUD (Create, Read, Update, Delete)  
✅ Export Tasks to Excel  
✅ Bulk Upload Tasks via Excel/CSV  
✅ MySQL Database Integration  

---

## ⚙️ Setup Instructions

### 1 Clone the Repository

git clone https://github.com/your-username/task-manager.git
cd task-manager

### 2 Backend Setup

backend:
git clone https://github.com/your-username/task-manager.git
cd task-manager
database:
Create MySQL database using CREATE DATABASE task_manager;
Update backend/config/db.js with your MySQL credentials.
Create tables in task_manager database
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  title VARCHAR(255),
  description TEXT,
  effort INT,
  dueDate DATE,
  FOREIGN KEY (userId) REFERENCES users(id)
);
Start backend using npm start. 
Backend will run on:
👉 http://localhost:5000

### 3 Frontend Setup
cd ../frontend
npm install
npm start
Frontend will run on:
👉 http://localhost:3000

### Usage

Register/Login → Create an account and log in.

Task Dashboard → Create, update, delete, and view your tasks.

Export to Excel → Click Export to download all tasks.

Upload Tasks → Upload .csv or .xlsx files to bulk add tasks.

📂 Example CSV/Excel File Format
title,description,effort,dueDate
Finish Project,Complete frontend and backend,5,2025-09-10
Prepare Report,Write project documentation,2,2025-09-15


