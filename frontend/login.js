async function login() {
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const res = await fetch("http://localhost:3000/api/students/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password })
    });

    const data = await res.json();

    if (!res.ok) {
      message.innerText = data.message;
      return;
    }

    // ✅ SAVE STUDENT ONLY
    localStorage.setItem("student", JSON.stringify(data.student));

    // ✅ GO TO DASHBOARD
    window.location.href = "dashboard.html";

  } catch (err) {
    message.innerText = "Server not running";
  }
}
function openAbout() {
  document.getElementById("aboutModal").style.display = "flex";
}

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}
