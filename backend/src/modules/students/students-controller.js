const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

// Get all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents();
  res.status(200).json({ success: true, data: students });
});

// Add new student
const handleAddStudent = asyncHandler(async (req, res) => {
  const newStudent = await addNewStudent(req.body);
  res.status(201).json({ success: true, message: "Student added successfully", data: newStudent });
});

// Update existing student
const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedStudent = await updateStudent(id, req.body);
  res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
});

// Get single student detail
const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await getStudentDetail(id);
  res.status(200).json({ success: true, data: student });
});

// Update student status (e.g. activate/deactivate)
const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await setStudentStatus(id, status);
  res.status(200).json({ success: true, message: "Student status updated successfully" });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
