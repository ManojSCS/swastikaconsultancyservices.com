const authMsg = document.getElementById('authMsg');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');
const signoutBtn = document.getElementById('signoutBtn');

function setMsg(msg) {
  if (authMsg) authMsg.textContent = msg;
}

function getAuth() {
  return window.firebase?.auth ? firebase.auth() : null;
}

async function signUp() {
  const auth = getAuth();
  if (!auth) return setMsg('Firebase is not configured yet.');
  try {
    await auth.createUserWithEmailAndPassword(email.value.trim(), password.value);
    setMsg('Account created successfully.');
  } catch (e) {
    setMsg(e.message);
  }
}

async function signIn() {
  const auth = getAuth();
  if (!auth) return setMsg('Firebase is not configured yet.');
  try {
    await auth.signInWithEmailAndPassword(email.value.trim(), password.value);
    setMsg('Signed in successfully.');
  } catch (e) {
    setMsg(e.message);
  }
}

async function signOut() {
  const auth = getAuth();
  if (!auth) return setMsg('Firebase is not configured yet.');
  try {
    await auth.signOut();
    setMsg('Signed out successfully.');
  } catch (e) {
    setMsg(e.message);
  }
}

signupBtn?.addEventListener('click', signUp);
signinBtn?.addEventListener('click', signIn);
signoutBtn?.addEventListener('click', signOut);
