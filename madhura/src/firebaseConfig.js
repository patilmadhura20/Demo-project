// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdyZYdobjXvHUr327sfLpGGBQgHnJgiXs",
  authDomain: "myapp-6123a.firebaseapp.com",
  databaseURL: "https://myapp-6123a-default-rtdb.firebaseio.com",
  projectId: "myapp-6123a",
  storageBucket: "myapp-6123a.firebasestorage.app",
  messagingSenderId: "34579160921",
  appId: "1:34579160921:web:0c9cc9d21d2245e631b648",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
