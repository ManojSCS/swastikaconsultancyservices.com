// ==============================
// Admin Dashboard JS
// Swastika Consultancy Services
// FIXED: logout was redirecting to "admin-login.html" (doesn't exist)
//        Changed to "login.html"
//        renderClients now targets table by ID for reliability
// ==============================

// ─── Sidebar Active Menu ──────────────────────────
const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// ─── Logout Function ──────────────────────────────
function logout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    // FIX: was "admin-login.html" — there is no such file. Corrected to "login.html"
    window.location.href = "login.html";
  }
}

// ─── Demo Client Data ─────────────────────────────
let clients = [
  { name: "ABC Traders",       service: "GST Filing",  status: "Active"    },
  { name: "XYZ Enterprises",   service: "TDS Return",  status: "Pending"   },
  { name: "Sharma Industries", service: "Bookkeeping", status: "Completed" }
];

// ─── Render Client Table ──────────────────────────
function renderClients() {
  // FIX: select by ID so it's always the right table
  const table = document.getElementById("clientTable");
  if (!table) return;

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Service</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;

  clients.forEach((client, index) => {
    const statusClass =
      client.status === "Active"    ? "status-active"    :
      client.status === "Pending"   ? "status-pending"   :
      client.status === "Completed" ? "status-completed" : "";

    table.innerHTML += `
      <tr>
        <td>${client.name}</td>
        <td>${client.service}</td>
        <td class="${statusClass}">${client.status}</td>
        <td>
          <button
            onclick="deleteClient(${index})"
            style="background:#ef4444;color:white;border:none;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:13px;">
            Delete
          </button>
        </td>
      </tr>
    `;
  });

  // Update total clients card
  const totalEl = document.getElementById("totalClients");
  if (totalEl) totalEl.textContent = clients.length;
}

// ─── Delete Client ────────────────────────────────
function deleteClient(index) {
  if (confirm("Delete this client?")) {
    clients.splice(index, 1);
    renderClients();
  }
}

// ─── Add New Client ───────────────────────────────
function addClient(name, service, status) {
  clients.push({ name, service, status });
  renderClients();
}

// ─── Initialize on Load ───────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderClients();
});

console.log("Admin Dashboard Loaded ✓");
