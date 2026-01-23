// ===============================
// LOAD STUDENT DATA
// ===============================
const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
  window.location.href = "login.html";
} else {
  // Basic info
  document.getElementById("name").innerText = student.name || "-";
  document.getElementById("id").innerText = student.id || "-";
  document.getElementById("department").innerText =
    student.department || "CSE";

  document.getElementById("marks").innerText =
    student.marks !== undefined ? student.marks : "-";

  // Attendance %
  if (
    student.attendance !== undefined &&
    student.totalClasses !== undefined &&
    student.totalClasses > 0
  ) {
    const percent = Math.round(
      (student.attendance / student.totalClasses) * 100
    );
    document.getElementById("attendance").innerText = percent + "%";
  } else {
    document.getElementById("attendance").innerText = "-";
  }

  // Performance logic (based on marks)
  let performance = "Average";
  if (student.marks >= 90) performance = "Excellent";
  else if (student.marks >= 75) performance = "Good";
  else if (student.marks >= 50) performance = "Average";
  else performance = "Needs Improvement";

  document.getElementById("performance").innerText = performance;

  // Static academic info
  document.getElementById("exam-date").innerText = "05-02-2026";
  document.getElementById("event").innerText = "Tech Fest 2026";
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("student");
  window.location.href = "login.html";
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


function openMarksModal() {
  document.getElementById("marksModal").style.display = "flex";
  loadDetailedMarks();
}

function closeMarksModal() {
  document.getElementById("marksModal").style.display = "none";
}


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
      data[h] = values[i];
    });

    document.getElementById("m-maths").innerText = data.maths;
    document.getElementById("m-chemistry").innerText = data.chemistry;
    document.getElementById("m-ec").innerText = data.ec;
    document.getElementById("m-python").innerText = data.python;
    document.getElementById("m-ai").innerText = data.ai;
    document.getElementById("m-english").innerText = data.english;

  } catch (err) {
    alert("Unable to load marks file");
    console.error(err);
  }
}
