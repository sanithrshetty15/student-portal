// Get student data from localStorage
const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
  alert("Please login first!");
  window.location.href = "login.html";
} else {
  document.getElementById("name").innerText = student.name;
  document.getElementById("id").innerText = student.id;
  document.getElementById("department").innerText = student.department;
  document.getElementById("marks").innerText = student.marks;
  document.getElementById("attendance").innerText = student.attendance + "/" + student.totalClasses;

  // Calculate performance
  let percent = (student.marks / 100) * 100; // assuming marks out of 100
  let perf = "";
  if (percent >= 90) perf = "Excellent";
  else if (percent >= 75) perf = "Good";
  else if (percent >= 50) perf = "Average";
  else perf = "Needs Improvement";

  document.getElementById("performance").innerText = perf;

  // Static example data for exam and event
  document.getElementById("exam-date").innerText = "2026-02-05";
  document.getElementById("event").innerText = "Tech Fest 2026";
}

// Logout
function logout() {
  localStorage.removeItem("student");
  window.location.href = "login.html";
}
function openAbout() {
  document.getElementById("aboutModal").style.display = "flex";
}

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

function openContact() {
  document.getElementById("contactModal").style.display = "flex";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}
