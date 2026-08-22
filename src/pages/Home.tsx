import { motion } from "motion/react";
import { ArrowRight, Terminal, Cpu, Globe, Code2, Youtube, Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useState, useEffect } from "react";
import { FirebaseService } from "../lib/firebaseService";

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const speed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-red-600 inline-block min-w-[200px] text-left">
      {currentText}
      <span className="animate-pulse ml-1 text-white">|</span>
    </span>
  );
};

export default function Home() {
  const [featuredVideos, setFeaturedVideos] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosData, pageData] = await Promise.all([
          FirebaseService.getAll("videos"),
          FirebaseService.getById("pages", "home")
        ]);
        setFeaturedVideos(videosData.slice(0, 3));
        if (pageData) setPageContent(pageData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-black min-h-screen relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Avatar with Glowing Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center lg:justify-start"
            >
              <div className="relative group">
                {/* Red Glowing Circle Background */}
                <div className="absolute inset-0 bg-red-600 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                <div className="absolute inset-0 bg-red-900 rounded-full blur-[80px] opacity-10"></div>
                
                {/* Decorative Red Ring */}
                <div className="absolute -inset-4 border-2 border-red-600/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-red-600/30 shadow-[0_0_50px_rgba(255,0,51,0.2)]">
                  <img
                    src="/src/assets/images/anime_tech_avatar_1787412214560.jpg"
                    alt="Prajwal Anime Avatar"
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                  {/* Red overlay tint */}
                  <div className="absolute inset-0 bg-red-900/20 mix-blend-color group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 text-left"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white tracking-widest">Hey I'm <span className="text-red-600">Prajwal</span></h3>
                <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
                  {pageContent.heroTitle || "I'm a"} <br />
                  <Typewriter texts={["YOUTUBER", "DEVELOPER", "DESIGNER", "STUDENT"]} />
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  {pageContent.heroSubtitle || "Creating high-fidelity tech tutorials, programming modules, and software architecture guides in Kannada. Join our community of 100k+ builders."}
                </p>

                {/* Social Links */}
                <div className="flex space-x-6 py-6">
                  {[
                    { icon: Youtube, color: "hover:text-red-600", url: "https://youtube.com/@hackbitskannada" },
                    { icon: Github, color: "hover:text-white", url: "https://github.com/prajwal69sp" },
                    { icon: Linkedin, color: "hover:text-blue-500", url: "https://www.linkedin.com/in/prajwalkm01" },
                    { icon: Instagram, color: "hover:text-pink-500", url: "https://www.instagram.com/hackbitskannada" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 ${social.color} hover:border-red-600/50 transition-all bg-white/5 hover:bg-white/10 shadow-lg`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                <div className="pt-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-red-600 text-white px-12 py-5 rounded-full font-bold hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(255,0,51,0.4)] active:scale-95 uppercase text-xs tracking-[0.3em]"
                  >
                    Hire me
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section (Extracted from Video) */}
      <section className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.5em] mb-4 font-bold italic">Capabilities</h2>
            <p className="text-4xl sm:text-6xl font-black text-white tracking-tight">{pageContent.servicesTitle || "My Services"}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Code2, title: "Web Development", desc: "Building scalable, high-performance web applications using modern stacks like React, Node, and TypeScript." },
              { icon: Cpu, title: "System Design", desc: "Architecting complex distributed systems and microservices with a focus on reliability and scale." },
              { icon: Globe, title: "Content Creation", desc: "Producing high-fidelity technical educational content in regional languages to empower local communities." }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, backgroundColor: "rgba(255, 0, 51, 0.03)" }}
                className="bg-white/5 p-12 rounded-[2.5rem] border border-white/5 transition-all duration-500 backdrop-blur-sm group hover:border-red-600/20"
              >
                <div className="bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border border-red-600/20 shadow-[0_0_15px_rgba(255,0,51,0.1)] group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-32 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-20 gap-8">
            <div className="text-left">
              <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.5em] mb-4 font-bold">Transmission</h2>
              <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">Latest Uploads</p>
            </div>
            <Link to="/videos" className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase hover:text-red-500 flex items-center group transition-all">
              View Database <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="pb-32 px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/5 to-red-600/5 rounded-[4rem] p-16 sm:p-24 relative overflow-hidden text-center border border-white/10 shadow-2xl backdrop-blur-3xl group">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl sm:text-7xl font-black text-white mb-10 tracking-tight leading-tight">
              Ready to <span className="text-red-600 italic">Code?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
              Join our private engineering community and start building the future of the Kannada tech ecosystem today.
            </p>
            <Link
              to="/contact"
              className="bg-red-600 text-white px-16 py-6 rounded-full font-bold hover:bg-red-700 transition-all shadow-[0_0_40px_rgba(255,0,51,0.4)] active:scale-95 uppercase text-xs tracking-[0.4em]"
            >
              Let's Chat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
