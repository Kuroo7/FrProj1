import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAq3GqGdnHnCbWBwVMFV4dtz1XS_kmXuVc",
    authDomain: "slack-7e374.firebaseapp.com",
    projectId: "slack-7e374",
    storageBucket: "slack-7e374.firebasestorage.app",
    messagingSenderId: "217008991937",
    appId: "1:217008991937:web:9093e8f8ee1cac68d4ee40"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;

export { auth };