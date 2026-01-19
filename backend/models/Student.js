const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // unique student number
  name: { type: String, required: true },
  email: { type: String },           // new field
  phone: { type: String },           // new field
  department: { type: String },      // new field
  marks: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 },
  totalClasses: { type: Number, default: 0 },
  password: { type: String, required: true }  // for login
});

module.exports = mongoose.model("Student", studentSchema);
