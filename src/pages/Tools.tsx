import { motion } from "motion/react";
import { Wrench, Terminal, Cpu, Hammer, Search, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { FirebaseService } from "../lib/firebaseService";

export default function Tools() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await FirebaseService.getAll("tools");
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const filteredTools = tools.filter(t => 
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4 font-bold italic">Utility Hub</h2>
          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight mb-8">Engineering Tools</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
            A suite of technical utilities designed for modern engineering. 
            High-performance tools for daily development challenges.
          </p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-white placeholder-gray-700 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Cpu className="w-24 h-24 text-white" />
              </div>
              
              <div className="bg-red-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-red-600 border border-red-600/20 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Hammer className="w-6 h-6" />
              </div>

              <div className="mb-6">
                <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20 mb-3 inline-block">
                  {tool.category}
                </span>
                <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-red-500 transition-colors">
                  {tool.title}
                </h3>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3">
                {tool.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    tool.status === 'Production' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                    tool.status === 'Beta' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 
                    'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                  }`} />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                    {tool.status}
                  </span>
                </div>
                <button className="text-white text-[11px] font-bold uppercase tracking-widest hover:text-red-500 transition-colors flex items-center space-x-2">
                  <span>Open Tool</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
