import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMNk9WgmyFlZ73ycX_7V3DXKgPf0e_vAE",
  authDomain: "hindi-school-project.firebaseapp.com",
  databaseURL: "https://hindi-school-project-default-rtdb.firebaseio.com",
  projectId: "hindi-school-project",
  storageBucket: "hindi-school-project.firebasestorage.app",
  messagingSenderId: "581576176771",
  appId: "1:581576176771:web:6b865bd56fffc4d5ca57b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication for Login and Dashboard
export const auth = getAuth(app);