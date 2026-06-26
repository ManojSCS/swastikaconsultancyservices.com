/*==================================================
  SWASTIKA CONSULTANCY SERVICES — AUTH.JS
  FIXED:
  - Merged 3 separate import blocks into single imports per module
  - Removed duplicate import statements
  - showError/showSuccess now work on both login & register pages
  - registerUser reads correct field IDs matching register.html
==================================================*/

import { auth, db } from "./firebase-config.js";

/* ─── ALL AUTH IMPORTS (merged) ──────────────── */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

/* ─── ALL FIRESTORE IMPORTS (merged) ─────────── */
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/*==================================================
  UI HELPERS
  Work on both login page and register page
==================================================*/

function showLoading() {
  const overlay = document.getElementById("loginLoading");
  if (overlay) overlay.style.display = "flex";
}

function hideLoading() {
  const overlay = document.getElementById("loginLoading");
  if (overlay) overlay.style.display = "none";
}

function showError(message) {
  // Login page uses #loginError, register page uses #registerError
  const errorBox   = document.getElementById("loginError")    || document.getElementById("registerError");
  const successBox = document.getElementById("loginSuccess")  || document.getElementById("registerSuccess");

  if (errorBox) {
    errorBox.style.display = "block";
    errorBox.textContent   = message;
  }
  if (successBox) {
    successBox.style.display = "none";
    successBox.textContent   = "";
  }
}

function showSuccess(message) {
  // Login page uses #loginSuccess, register page uses #registerSuccess
  const successBox = document.getElementById("loginSuccess")  || document.getElementById("registerSuccess");
  const errorBox   = document.getElementById("loginError")    || document.getElementById("registerError");

  if (successBox) {
    successBox.style.display = "block";
    successBox.textContent   = message;
  }
  if (errorBox) {
    errorBox.style.display = "none";
    errorBox.textContent   = "";
  }
}

/*==================================================
  LOGIN
==================================================*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}

async function loginUser(event) {
  event.preventDefault();

  const emailInput    = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberMe    = document.getElementById("rememberMe");

  const email    = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showError("Please enter your email and password.");
    return;
  }

  showLoading();

  try {
    const persistence = rememberMe && rememberMe.checked
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(auth, persistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user           = userCredential.user;

    showSuccess("Login successful. Redirecting...");

    // Get user role from Firestore
    const userRef      = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    setTimeout(() => {
      if (userSnapshot.exists() && userSnapshot.data().role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "client-dashboard.html";
      }
    }, 1000);

  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/invalid-email":        showError("Invalid email address.");                         break;
      case "auth/user-disabled":        showError("Your account has been disabled.");                break;
      case "auth/invalid-credential":   showError("Incorrect email or password.");                   break;
      case "auth/too-many-requests":    showError("Too many login attempts. Please try again later."); break;
      default:                          showError(error.message);
    }
  } finally {
    hideLoading();
  }
}

/*==================================================
  FORGOT PASSWORD
==================================================*/

const resetForm = document.getElementById("resetForm");

if (resetForm) {
  resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const resetEmail = document.getElementById("resetEmail");
    const email      = resetEmail.value.trim();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email has been sent successfully.");
      resetForm.reset();
      const modal = document.getElementById("forgotModal");
      if (modal) modal.style.display = "none";
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/user-not-found": alert("No account found with this email."); break;
        case "auth/invalid-email":  alert("Invalid email address.");             break;
        default:                    alert(error.message);
      }
    }
  });
}

/*==================================================
  REGISTER
==================================================*/

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}

async function registerUser(event) {
  event.preventDefault();

  // FIX: IDs now match what's in register.html
  const fullName       = document.getElementById("fullName")?.value.trim();
  const email          = document.getElementById("registerEmail")?.value.trim();
  const password       = document.getElementById("registerPassword")?.value;
  const confirmPass    = document.getElementById("confirmPassword")?.value;

  if (!fullName || !email || !password) {
    showError("Please fill in all required fields.");
    return;
  }

  if (password !== confirmPass) {
    showError("Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  showLoading();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user           = userCredential.user;

    await updateProfile(user, { displayName: fullName });
    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      uid:           user.uid,
      name:          fullName,
      email:         email,
      role:          "client",
      status:        "Active",
      package:       document.getElementById("package")?.value || "Basic",
      emailVerified: false,
      createdAt:     serverTimestamp(),
      lastLogin:     serverTimestamp()
    });

    showSuccess("Registration successful! Please verify your email before logging in.");
    registerForm.reset();

    setTimeout(() => { window.location.href = "login.html"; }, 3000);

  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/email-already-in-use": showError("This email is already registered."); break;
      case "auth/invalid-email":        showError("Invalid email address.");            break;
      case "auth/weak-password":        showError("Password is too weak.");             break;
      default:                          showError(error.message);
    }
  } finally {
    hideLoading();
  }
}

/*==================================================
  AUTH STATE LISTENER
==================================================*/

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  console.log("Logged in as:", user.email);

  try {
    const userRef  = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) console.log("User Profile Loaded");
  } catch (error) {
    console.error(error);
  }
});

/*==================================================
  SESSION TIMER — auto logout after 30 min idle
==================================================*/

let lastActivity = Date.now();

["click", "mousemove", "keydown", "scroll"].forEach(evt => {
  document.addEventListener(evt, () => { lastActivity = Date.now(); });
});

setInterval(() => {
  const idleMinutes = (Date.now() - lastActivity) / 60000;
  if (idleMinutes >= 30 && auth.currentUser) {
    logoutUser();
  }
}, 60000);

/*==================================================
  EXPORTED UTILITIES
==================================================*/

export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    alert("Unable to logout.");
  }
}

export function requireLogin() {
  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
  });
}

export async function requireAdmin() {
  const user = auth.currentUser;
  if (!user) { window.location.href = "login.html"; return; }

  const userRef  = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) { window.location.href = "login.html"; return; }

  if (userSnap.data().role !== "admin") {
    alert("Access Denied.");
    window.location.href = "client-dashboard.html";
  }
}

export function getCurrentUser()  { return auth.currentUser; }
export function isEmailVerified() { return auth.currentUser?.emailVerified ?? false; }

export async function refreshCurrentUser() {
  if (auth.currentUser) await auth.currentUser.reload();
}

console.log("Auth.js Loaded Successfully ✓");
