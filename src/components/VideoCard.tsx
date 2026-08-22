import { Play } from "lucide-react";
import { motion } from "motion/react";
import { Video } from "../types";

interface VideoCardProps {
  video: Video;
  key?: string | number;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-red-600/30 hover:bg-white/10 transition-all duration-500 shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,0,51,0.5)] opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500 ease-out">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] text-red-600 font-mono tracking-widest uppercase font-bold italic">{video.publishedAt}</span>
          <span className="bg-red-600/10 text-red-500 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-red-600/20">Protocol</span>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2 leading-tight mb-4 tracking-tight">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}
