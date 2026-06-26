/*==================================================
  Swastika Consultancy Services
  AUTH.JS - PART 1
==================================================*/

import { auth, db } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/*==================================================
    DOM ELEMENTS
==================================================*/

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

const loadingOverlay = document.getElementById("loginLoading");

const errorBox = document.getElementById("loginError");
const successBox = document.getElementById("loginSuccess");

/*==================================================
    UI HELPERS
==================================================*/

function showLoading() {

    if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
    }

}

function hideLoading() {

    if (loadingOverlay) {
        loadingOverlay.style.display = "none";
    }

}

function showError(message) {

    if (!errorBox) return;

    errorBox.style.display = "block";
    errorBox.textContent = message;

    if (successBox) {

        successBox.style.display = "none";
        successBox.textContent = "";

    }

}

function showSuccess(message) {

    if (!successBox) return;

    successBox.style.display = "block";
    successBox.textContent = message;

    if (errorBox) {

        errorBox.style.display = "none";
        errorBox.textContent = "";

    }

}

/*==================================================
    LOGIN
==================================================*/

async function loginUser(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {

        showError("Please enter your email and password.");

        return;
    }

    showLoading();

    try {

        const persistence = rememberMe.checked
            ? browserLocalPersistence
            : browserSessionPersistence;

        await setPersistence(auth, persistence);

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        showSuccess("Login successful. Redirecting...");

        // Get User Role

        const userRef = doc(db, "users", user.uid);

        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {

            const userData = userSnapshot.data();

            setTimeout(() => {

                if (userData.role === "admin") {

                    window.location.href = "admin-dashboard.html";

                } else {

                    window.location.href = "client-dashboard.html";

                }

            }, 1000);

        } else {

            // Default Dashboard

            setTimeout(() => {

                window.location.href = "client-dashboard.html";

            }, 1000);

        }

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/invalid-email":

                showError("Invalid email address.");

                break;

            case "auth/user-disabled":

                showError("Your account has been disabled.");

                break;

            case "auth/invalid-credential":

                showError("Incorrect email or password.");

                break;

            case "auth/too-many-requests":

                showError("Too many login attempts. Please try again later.");

                break;

            default:

                showError(error.message);

        }

    } finally {

        hideLoading();

    }

}

/*==================================================
    EVENT LISTENER
==================================================*/

if (loginForm) {

    loginForm.addEventListener("submit", loginUser);

}

console.log("Auth.js Part 1 Loaded Successfully");
/*==================================================
    AUTH.JS - PART 2
    Authentication State & Password Reset
==================================================*/

import {
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

/*==================================================
    DOM ELEMENTS
==================================================*/

const forgotPasswordBtn = document.getElementById("forgotPassword");
const resetForm = document.getElementById("resetForm");
const resetEmail = document.getElementById("resetEmail");

/*==================================================
    FORGOT PASSWORD
==================================================*/

if (resetForm) {

    resetForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = resetEmail.value.trim();

        if (!email) {

            alert("Please enter your email address.");

            return;

        }

        try {

            await sendPasswordResetEmail(auth, email);

            alert("Password reset email has been sent successfully.");

            resetForm.reset();

            const modal = document.getElementById("forgotModal");

            if (modal) {

                modal.style.display = "none";

            }

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/user-not-found":

                    alert("No account found with this email.");

                    break;

                case "auth/invalid-email":

                    alert("Invalid email address.");

                    break;

                default:

                    alert(error.message);

            }

        }

    });

}

/*==================================================
    AUTH STATE LISTENER
==================================================*/

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        return;

    }

    console.log("Logged in as:", user.email);

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            console.log("User Profile Loaded");

        }

    } catch (error) {

        console.error(error);

    }

});

/*==================================================
    LOGOUT FUNCTION
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

/*==================================================
    CHECK LOGIN
==================================================*/

export function requireLogin() {

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.href = "login.html";

        }

    });

}

/*==================================================
    CHECK ADMIN ACCESS
==================================================*/

export async function requireAdmin() {

    const user = auth.currentUser;

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {

        window.location.href = "login.html";

        return;

    }

    const data = userSnap.data();

    if (data.role !== "admin") {

        alert("Access Denied.");

        window.location.href = "client-dashboard.html";

    }

}

/*==================================================
    SESSION TIMER
==================================================*/

let lastActivity = Date.now();

["click","mousemove","keydown","scroll"].forEach(event => {

    document.addEventListener(event, () => {

        lastActivity = Date.now();

    });

});

setInterval(() => {

    const inactiveMinutes =
        (Date.now() - lastActivity) / 1000 / 60;

    if (inactiveMinutes >= 30 && auth.currentUser) {

        logoutUser();

    }

}, 60000);

/*==================================================
    END OF PART 2
==================================================*/

console.log("Auth.js Part 2 Loaded");
/*==================================================
    AUTH.JS - PART 3
    Registration & User Profile
==================================================*/

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/*==================================================
    REGISTER FORM
==================================================*/

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", registerUser);

}

/*==================================================
    REGISTER USER
==================================================*/

async function registerUser(event) {

    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password) {

        showError("Please fill in all required fields.");

        return;

    }

    if (password !== confirmPassword) {

        showError("Passwords do not match.");

        return;

    }

    if (password.length < 6) {

        showError("Password must be at least 6 characters.");

        return;

    }

    showLoading();

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        /*==========================
            UPDATE PROFILE
        ==========================*/

        await updateProfile(user, {

            displayName: fullName

        });

        /*==========================
            EMAIL VERIFICATION
        ==========================*/

        await sendEmailVerification(user);

        /*==========================
            SAVE USER
        ==========================*/

        await setDoc(

            doc(db, "users", user.uid),

            {

                uid: user.uid,

                name: fullName,

                email: email,

                role: "client",

                status: "Active",

                package: "Basic",

                emailVerified: false,

                createdAt: serverTimestamp(),

                lastLogin: serverTimestamp()

            }

        );

        showSuccess(

            "Registration successful. Please verify your email before logging in."

        );

        registerForm.reset();

        setTimeout(() => {

            window.location.href = "login.html";

        }, 3000);

    }

    catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/email-already-in-use":

                showError("This email is already registered.");

                break;

            case "auth/invalid-email":

                showError("Invalid email address.");

                break;

            case "auth/weak-password":

                showError("Password is too weak.");

                break;

            default:

                showError(error.message);

        }

    }

    finally {

        hideLoading();

    }

}

/*==================================================
    GET CURRENT USER
==================================================*/

export function getCurrentUser() {

    return auth.currentUser;

}

/*==================================================
    CHECK EMAIL VERIFICATION
==================================================*/

export function isEmailVerified() {

    const user = auth.currentUser;

    if (!user) {

        return false;

    }

    return user.emailVerified;

}

/*==================================================
    REFRESH USER
==================================================*/

export async function refreshCurrentUser() {

    if (auth.currentUser) {

        await auth.currentUser.reload();

    }

}

/*==================================================
    END OF AUTH.JS
==================================================*/

console.log("Auth.js Loaded Successfully");

