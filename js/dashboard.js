// ==============================
// Client Dashboard JS
// Swastika Consultancy Services
// ==============================

// Load client name (temporary demo data)
document.addEventListener("DOMContentLoaded", () => {
  const clientName = localStorage.getItem("clientName");

  if (clientName) {
    document.getElementById("clientName").innerText = clientName;
  } else {
    document.getElementById("clientName").innerText = "Client";
  }
});


// ==============================
// Sidebar Active Menu Handling
// ==============================
const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});


// ==============================
// Logout Function
// ==============================
function logout() {
  const confirmLogout = confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    localStorage.removeItem("clientName");

    // later you can redirect to login page
    window.location.href = "login.html";
  }
}


// ==============================
// Future Firebase Hook (Ready)
// ==============================

/*
Example structure for later:

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

function logout() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
}
*/
