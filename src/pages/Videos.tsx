import VideoCard from "../components/VideoCard";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { FirebaseService } from "../lib/firebaseService";

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await FirebaseService.getAll("videos");
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video => 
    (video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4 font-bold italic">Central Repository</h2>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">Video Library</h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-medium">
            Explore our high-fidelity collection of tech tutorials and protocol updates in Kannada. 
            Everything you need to grow in your tech career.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-600 transition-colors" />
            <input
              type="text"
              placeholder="Search database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-600 transition-all shadow-2xl backdrop-blur-sm font-medium"
            />
          </div>
          <button className="flex items-center justify-center space-x-3 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-gray-300 hover:bg-white/10 transition-all shadow-xl backdrop-blur-sm uppercase text-[11px] tracking-widest">
            <Filter className="w-4 h-4 text-red-600" />
            <span>Filter</span>
          </button>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-sm">
            <div className="bg-red-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-red-600 border border-red-600/20 shadow-[0_0_20px_rgba(255,0,51,0.1)]">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight uppercase tracking-wider">No records found</h3>
            <p className="text-gray-500 max-w-sm mx-auto font-medium">Try adjusting your search parameters to locate the requested data protocols.</p>
          </div>
        )}
      </div>
    </div>
  );
}
