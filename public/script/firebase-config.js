import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { getDatabase, ref, onValue, set, remove, update } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyBZbJswskCSVHMg5EoiOVY1sYmDokzTYnk",
  authDomain: "projeto2-b61e7.firebaseapp.com",
  databaseURL: "https://projeto2-b61e7-default-rtdb.firebaseio.com",
  projectId: "projeto2-b61e7",
  storageBucket: "projeto2-b61e7.appspot.com",
  messagingSenderId: "898883632695",
  appId: "1:898883632695:web:77232806daf6f3ad4249b2",
  measurementId: "G-ZN5Y97F72Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };
