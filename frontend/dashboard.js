// ===============================
// LOAD STUDENT DATA
// ===============================
const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
  window.location.href = "index.html";
} else {
  document.getElementById("name").innerText = student.name || "-";
  document.getElementById("id").innerText = student.id || "-";
  document.getElementById("department").innerText = student.department || "CSE";

  document.getElementById("marks").innerText =
    student.marks !== undefined ? student.marks : "-";

  // Attendance %
 // Attendance (already stored as percentage)
if (student.attendance !== undefined) {
  document.getElementById("attendance").innerText =
    student.attendance + "%";
} else {
  document.getElementById("attendance").innerText = "-";
}

  // Performance
  let performance = "Average";
  if (student.marks >= 90) performance = "Excellent";
  else if (student.marks >= 75) performance = "Good";
  else if (student.marks >= 50) performance = "Average";
  else performance = "Needs Improvement";

  document.getElementById("performance").innerText = performance;

  // Static academic info
  document.getElementById("exam-date").innerText = "02-02-2026";
  document.getElementById("event").innerText = "Tech Fest 2026";
}
loadDetailedMarks();

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("student");
  window.location.href = "index.html";
}

// ===============================
// ABOUT MODAL
// ===============================
function openAbout() {
  document.getElementById("aboutModal").style.display = "flex";
}
function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

// ===============================
// CONTACT MODAL
// ===============================
function openContact() {
  document.getElementById("contactModal").style.display = "flex";
}
function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

// ===============================
// MARKS MODAL
// ===============================
function openMarksModal() {
  document.getElementById("marksModal").style.display = "flex";
  loadDetailedMarks();
}
function closeMarksModal() {
  document.getElementById("marksModal").style.display = "none";
}

// ===============================
// LOAD DETAILED MARKS FROM CSV
// ===============================
async function loadDetailedMarks() {
  try {
    const response = await fetch("assets/marks.csv");
    const text = await response.text();

    const rows = text.trim().split("\n");
    const headers = rows[0].split(",");

    const studentRow = rows.find(row =>
      row.startsWith(student.id + ",")
    );

    if (!studentRow) {
      alert("No detailed marks found for this student");
      return;
    }

    const values = studentRow.split(",");
    const data = {};

    headers.forEach((h, i) => {
      data[h.trim()] = parseInt(values[i], 10);
    });

    // Fill subject marks
    document.getElementById("m-maths").innerText = data.maths;
    document.getElementById("m-chemistry").innerText = data.chemistry;
    document.getElementById("m-ec").innerText = data.ec;
    document.getElementById("m-python").innerText = data.python;
    document.getElementById("m-ai").innerText = data.ai;
    document.getElementById("m-english").innerText = data.english;

    // ===============================
    // TOTAL, PERCENTAGE, GRADE
    // ===============================
    const total =
      data.maths +
      data.chemistry +
      data.ec +
      data.python +
      data.ai +
      data.english;

    const percentage = Math.round((total / 600) * 100);

    let grade = "F";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";

    document.getElementById("totalMarks").innerText = total + " / 600";
    document.getElementById("percentage").innerText = percentage;
    document.getElementById("grade").innerText = grade;

  } catch (err) {
   
    console.error(err);
  }
}


async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // ===============================
  // LOGO
  // ===============================
  const logo = new Image();
  logo.src = "assets/logo.jpg";

  logo.onload = () => {
    // Logo
    doc.addImage(logo, "JPEG", 15, 10, 25, 25);

    // College name
    doc.setFontSize(16);
    doc.text(
      "Alva’s Institute of Engineering and Technology",
      50,
      20
    );

    doc.setFontSize(11);
    doc.text("Student Academic Report", 50, 28);

    // Line
    doc.line(15, 38, 195, 38);

    // ===============================
    // STUDENT INFO
    // ===============================
    let y = 48;
    doc.setFontSize(12);

    doc.text(`Name: ${student.name}`, 15, y);
    y += 8;
    doc.text(`Student ID: ${student.id}`, 15, y);
    y += 8;
    doc.text(`Department: ${student.department}`, 15, y);
    y += 8;
    doc.text(`Attendance: ${attendancePercent()}%`, 15, y);
    y += 10;

    // ===============================
    // SUBJECT MARKS TABLE
    // ===============================
    doc.setFontSize(13);
    doc.text("Subject-wise Marks", 15, y);
    y += 8;

    doc.setFontSize(11);

    const subjects = [
      ["Mathematics", document.getElementById("m-maths").innerText],
      ["Chemistry", document.getElementById("m-chemistry").innerText],
      ["Electronics & Communication", document.getElementById("m-ec").innerText],
      ["Python Programming", document.getElementById("m-python").innerText],
      ["Introduction to AI", document.getElementById("m-ai").innerText],
      ["Communication Skills", document.getElementById("m-english").innerText]
    ];

    subjects.forEach(sub => {
      doc.text(`${sub[0]} : ${sub[1]}`, 20, y);
      y += 7;
    });

    y += 5;

    // ===============================
    // TOTAL + GRADE
    // ===============================
    doc.setFontSize(12);
    doc.text(`Total Marks: ${student.marks}`, 15, y);
    y += 8;

    doc.text(`Performance: ${document.getElementById("performance").innerText}`, 15, y);

    // ===============================
    // FOOTER
    // ===============================
    doc.setFontSize(10);
    doc.text(
      "© 2026 Alva’s Institute of Engineering and Technology, Moodbidri",
      15,
      285
    );

    // SAVE
    doc.save(`${student.id}_Report.pdf`);
  };
}

// Attendance percentage helper
function attendancePercent() {
  if (student.attendance && student.totalClasses) {
    return Math.round((student.attendance / student.totalClasses) * 100);
  }
  return 0;
}


