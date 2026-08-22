import { motion } from "motion/react";
import { Youtube, Users, Video, Code, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { FirebaseService } from "../lib/firebaseService";

const iconMap: Record<string, any> = {
  "Subscribers": Users,
  "Videos": Video,
  "Views": Youtube,
  "Tutorials": Code
};

export default function About() {
  const [stats, setStats] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, pageData] = await Promise.all([
          FirebaseService.getAll("stats"),
          FirebaseService.getById("pages", "about")
        ]);
        
        if (statsData.length > 0) {
          setStats(statsData);
        } else {
          setStats([
            { label: "Subscribers", value: "100k+" },
            { label: "Videos", value: "500+" },
            { label: "Views", value: "5M+" },
            { label: "Tutorials", value: "200+" },
          ]);
        }
        
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
    <div className="pt-32 pb-24 bg-black min-h-screen relative overflow-hidden text-gray-400">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-24 text-left">
          <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4 font-bold italic">Core Mission</h2>
          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight mb-8 leading-tight">{pageContent.title || "Our Story & Vision"}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
            {pageContent.description || "Hackbits Kannada was initiated to bridge the linguistic gap in technical education. We provide a decentralized learning protocol for every Kannada speaker."}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
              alt="Community"
              className="relative rounded-[2rem] shadow-2xl border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity duration-700 w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
            />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black text-white mb-8 tracking-tight uppercase tracking-widest">Empowering Innovation</h2>
            <div className="space-y-8 text-lg text-gray-400 leading-relaxed font-medium">
              <p>
                Established in 2020, our platform has evolved into a comprehensive resource 
                for system architecture, ethical hacking, and modern web development, 
                all delivered in the Kannada language.
              </p>
              <p>
                We focus on high-fidelity, hands-on learning modules designed to be immediately 
                actionable for career progression in the global tech economy.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-10 rounded-[2rem] border border-white/5 text-center hover:bg-white/10 hover:shadow-2xl transition-all duration-500 group backdrop-blur-sm"
            >
              <div className="bg-red-600/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 group-hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,51,0.1)] border border-red-600/20">
                {(() => {
                  const Icon = iconMap[stat.label] || BarChart3;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <p className="text-4xl font-black text-white mb-3 tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Creator Section */}
        <div className="bg-gradient-to-br from-white/5 to-red-600/5 rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden border border-white/10 backdrop-blur-xl shadow-2xl group">
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
            <Youtube className="w-80 h-80 text-white" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 text-left">
              <h2 className="text-3xl font-black text-white mb-8 tracking-tight uppercase tracking-wider">The Lead Architect</h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-10 font-medium italic border-l-4 border-red-600 pl-8">
                "We are building a future where language is no longer a bottleneck for 
                technical excellence. Our goal is to empower a new generation of 
                engineers from Karnataka."
              </p>
              <div>
                <p className="text-2xl font-black text-white tracking-tight uppercase">Prajwal M G</p>
                <p className="text-red-600 font-mono text-xs uppercase tracking-[0.3em] mt-2 font-bold italic">Founder & Chief Educator</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-white/10 max-w-[420px] mx-auto shadow-[0_0_50px_rgba(255,0,51,0.1)] transition-transform hover:scale-105 duration-700">
                 <img
                  src="/src/assets/images/anime_tech_avatar_1787412214560.jpg"
                  alt="Prajwal Anime Avatar"
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
