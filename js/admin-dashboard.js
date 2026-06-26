// ==============================
// Admin Dashboard JS
// Swastika Consultancy Services
// ==============================


// ==============================
// Sidebar Active Menu
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
    window.location.href = "admin-login.html";
  }
}


// ==============================
// Demo Client Data (Local)
// ==============================
let clients = [
  { name: "ABC Traders", service: "GST Filing", status: "Active" },
  { name: "XYZ Enterprises", service: "TDS Return", status: "Pending" },
  { name: "Sharma Industries", service: "Bookkeeping", status: "Completed" }
];


// ==============================
// Render Client Table
// ==============================
function renderClients() {
  const table = document.querySelector("table");

  // Keep header row only
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Service</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;

  clients.forEach((client, index) => {
    table.innerHTML += `
      <tr>
        <td>${client.name}</td>
        <td>${client.service}</td>
        <td>${client.status}</td>
        <td>
          <button onclick="deleteClient(${index})" style="
            background:red;
            color:white;
            border:none;
            padding:5px 10px;
            border-radius:5px;
            cursor:pointer;
          ">Delete</button>
        </td>
      </tr>
    `;
  });
}


// ==============================
// Delete Client
// ==============================
function deleteClient(index) {
  const confirmDelete = confirm("Delete this client?");

  if (confirmDelete) {
    clients.splice(index, 1);
    renderClients();
  }
}


// ==============================
// Add New Client (Demo Function)
// ==============================
function addClient(name, service, status) {
  clients.push({ name, service, status });
  renderClients();
}


// ==============================
// Initialize Table on Load
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  renderClients();
});


// ==============================
// Future Firebase Hook (Ready)
// ==============================
/*
Example structure:

import { getFirestore, collection, getDocs } from "firebase/firestore";

- Replace `clients` array with Firestore data
- Use real-time updates for dashboard
*/
