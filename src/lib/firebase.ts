import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOMPjoxp3kAZhORGP3TZgeQRLbeKtWUl0",
  authDomain: "peta-glyph-107pf.firebaseapp.com",
  projectId: "peta-glyph-107pf",
  storageBucket: "peta-glyph-107pf.firebasestorage.app",
  messagingSenderId: "858401640246",
  appId: "1:858401640246:web:f9bd337699c8ff6689ad97"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-hackbitskannada-1323467d-18d7-4984-86d1-1d7d25cd58c2");
