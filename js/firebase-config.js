// ======================================
// Swastika Consultancy Services
// Firebase Configuration
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

// Firebase Configuration

const firebaseConfig = {

    apiKey: "AIzaSyB6PurpL6fMCleD442wIA2Kl_pXziQ80mM",

    authDomain: "swastika-consultancy-services.firebaseapp.com",

    databaseURL: "https://swastika-consultancy-services-default-rtdb.firebaseio.com",

    projectId: "swastika-consultancy-services",

    storageBucket: "swastika-consultancy-services.firebasestorage.app",

    messagingSenderId: "966793591445",

    appId: "1:966793591445:web:15a52f732b76129ca4799c"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Services

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

// Export

export {

    auth,

    db,

    storage

};
