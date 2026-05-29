// Firebase SDK Imports
import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

apiKey: "AIzaSyCn1J0A48vPbNEhhoLAAzvjqTB2DQ3osIc",

authDomain: "findspyonline.firebaseapp.com",

projectId: "findspyonline",

storageBucket: "findspyonline.firebasestorage.app",

messagingSenderId: "323605379455",

appId: "1:323605379455:web:30510246c9f3605325424a",

measurementId: "G-65VDDJXJMZ"

};

/* INITIALIZE */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* EXPORT */

window.auth = auth;

window.db = db;

console.log("Firebase Connected");