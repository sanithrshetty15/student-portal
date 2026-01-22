// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

// ----------------- MongoDB connection -----------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



// ----------------- Student Schema -----------------
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  department: String,
  password: String,
  marks: Number,
  attendance: Number,
  totalClasses: Number
});

const Student = mongoose.model("Student", studentSchema);

// ----------------- Routes -----------------

// Test route
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

// Add new student

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student by custom ID
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: `Student ${req.params.id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student by Mongo _id
app.delete("/api/students/by-mongo/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid Mongo ID" });

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student login
app.post("/api/students/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    const student = await Student.findOne({ id });

    if (!student) {
      return res.status(401).json({ message: "Invalid ID or password" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid ID or password" });
    }

    res.json({
      message: "Login successful",
      student: {
        id: student.id,
        name: student.name,
        department: student.department,
        marks: student.marks,
        attendance: student.attendance,
        totalClasses: student.totalClasses
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

// ----------------- Start server -----------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
