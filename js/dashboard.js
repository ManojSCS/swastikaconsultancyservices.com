// ==============================
// Client Dashboard JS
// Swastika Consultancy Services
// FIXED: logout() is defined HERE only.
//        client-dashboard.html inline script was also
//        defining logout() causing a conflict. That
//        inline script has been removed from the HTML.
// ==============================

// ─── Load Client Name ─────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const clientNameEl = document.getElementById("clientName");
  if (!clientNameEl) return;

  const storedName = localStorage.getItem("clientName");
  clientNameEl.innerText = storedName || "Client";
});

// ─── Sidebar Active Menu ──────────────────────────
const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// ─── Logout Function ──────────────────────────────
// FIX: Only defined here — was also defined inline in client-dashboard.html
function logout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem("clientName");
    window.location.href = "login.html";
  }
}

console.log("Client Dashboard Loaded ✓");
