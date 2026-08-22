import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp, getDocs, query, limit } from "firebase/firestore";

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

async function seed() {
  console.log("Starting database seeding...");

  // Check if already seeded
  const videoCheck = await getDocs(query(collection(db, "videos"), limit(1)));
  if (!videoCheck.empty) {
    console.log("Database already contains data. Skipping seeding.");
    return;
  }

  // Seed Videos
  const videos = [
    {
      title: "How to Build a Portfolio Website with React and Tailwind CSS",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      youtubeUrl: "https://youtube.com",
      category: "Frontend",
      duration: "15:20",
      date: "Aug 15, 2026",
      createdAt: Timestamp.now()
    },
    {
      title: "Mastering TypeScript: A Complete Guide for Beginners",
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop",
      youtubeUrl: "https://youtube.com",
      category: "Programming",
      duration: "25:45",
      date: "Aug 10, 2026",
      createdAt: Timestamp.now()
    }
  ];

  for (const v of videos) {
    await addDoc(collection(db, "videos"), v);
  }

  // Seed Scripts
  const scripts = [
    {
      title: "Python Automation Bot",
      description: "Automate your daily tasks with this highly efficient Python script.",
      category: "Automation",
      language: "Python",
      downloadUrl: "#",
      createdAt: Timestamp.now()
    },
    {
      title: "React Components Library",
      description: "A collection of reusable React components for faster development.",
      category: "Frontend",
      language: "TypeScript",
      downloadUrl: "#",
      createdAt: Timestamp.now()
    }
  ];

  for (const s of scripts) {
    await addDoc(collection(db, "scripts"), s);
  }

  // Seed Tools
  const tools = [
    {
      title: "Performance Monitor",
      description: "Track your system performance in real-time with this lightweight tool.",
      category: "Utility",
      status: "Production",
      url: "#",
      createdAt: Timestamp.now()
    },
    {
      title: "Secure Hash Generator",
      description: "Generate secure cryptographic hashes for your data instantly.",
      category: "Security",
      status: "Beta",
      url: "#",
      createdAt: Timestamp.now()
    }
  ];

  for (const t of tools) {
    await addDoc(collection(db, "tools"), t);
  }

  // Seed Stats
  const stats = [
    { label: "Subscribers", value: "100k+", order: 1 },
    { label: "Videos", value: "500+", order: 2 },
    { label: "Views", value: "5M+", order: 3 },
    { label: "Tutorials", value: "200+", order: 4 }
  ];

  for (const stat of stats) {
    await addDoc(collection(db, "stats"), stat);
  }

  console.log("Seeding completed successfully!");
}

seed().catch(console.error);
