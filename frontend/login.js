// ===============================
// LOGIN FUNCTION
// ===============================
async function login() {
  const id = document.getElementById("id").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  message.innerText = "";

  if (!id || !password) {
    message.innerText = "Please enter ID and Password";
    return;
  }

  try {
    const res = await fetch(
      "https://student-portal-production-1981.up.railway.app/api/students/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      message.innerText = data.message || "Login failed";
      return;
    }

    // ✅ Save student data
    localStorage.setItem("student", JSON.stringify(data.student));

    // ✅ Redirect
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    message.innerText = "Server not reachable";
  }
}

// ===============================
// ENTER KEY LOGIN SUPPORT
// ===============================
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    login();
  }
});

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
// PASSWORD TOGGLE
// ===============================
function togglePassword() {
  const passField = document.getElementById("password");
  passField.type = passField.type === "password" ? "text" : "password";
}
