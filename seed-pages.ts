import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOMPjoxp3kAZhORGP3TZgeQRLbeKtWUl0",
  authDomain: "peta-glyph-107pf.firebaseapp.com",
  projectId: "peta-glyph-107pf",
  storageBucket: "peta-glyph-107pf.firebasestorage.app",
  messagingSenderId: "858401640246",
  appId: "1:858401640246:web:f9bd337699c8ff6689ad97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-hackbitskannada-1323467d-18d7-4984-86d1-1d7d25cd58c2");

async function seedPages() {
  console.log("Starting page content seeding...");

  const pages = {
    home: {
      heroTitle: "I'm a",
      heroSubtitle: "Creating high-fidelity tech tutorials, programming modules, and software architecture guides in Kannada. Join our community of 100k+ builders.",
      servicesTitle: "My Services",
      createdAt: Timestamp.now()
    },
    about: {
      title: "About the Protocol",
      description: "HackBits Kannada is a premium technical educational initiative dedicated to bridging the linguistic gap in high-end engineering education. We believe that complex technical concepts—from distributed systems to reactive frontend architectures—should be accessible in regional languages without compromising on technical depth or professional quality.",
      createdAt: Timestamp.now()
    },
    contact: {
      title: "Initialize Connection",
      description: "Have a technical inquiry or a collaboration proposal? Reach out through the secure channels below.",
      address: "Bangalore, India",
      email: "prajwalmarigowda69@gmail.com",
      phone: "+91 80737 88665",
      createdAt: Timestamp.now()
    }
  };

  for (const [id, content] of Object.entries(pages)) {
    await setDoc(doc(db, "pages", id), content);
    console.log(`Seeded page: ${id}`);
  }

  console.log("Page seeding completed!");
}

seedPages().catch(console.error);
