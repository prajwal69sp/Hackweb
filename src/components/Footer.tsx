import { Link } from "react-router-dom";
import { Youtube, Github, Linkedin, Instagram, Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-12 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-8 transition-transform hover:scale-105 inline-flex">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,0,51,0.4)]">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black tracking-tighter text-white leading-none uppercase">HACKBITS</span>
                <span className="text-[10px] text-red-600 font-mono tracking-[0.3em] font-bold">KANNADA</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed text-sm font-medium">
              Empowering the Kannada tech community through high-quality tutorials, 
              coding tips, and technology news. Learning tech simplified in your language.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 text-sm hover:text-red-600 transition-colors uppercase tracking-widest font-bold">Home</Link></li>
              <li><Link to="/videos" className="text-gray-500 text-sm hover:text-red-600 transition-colors uppercase tracking-widest font-bold">Videos</Link></li>
              <li><Link to="/about" className="text-gray-500 text-sm hover:text-red-600 transition-colors uppercase tracking-widest font-bold">About</Link></li>
              <li><Link to="/contact" className="text-gray-500 text-sm hover:text-red-600 transition-colors uppercase tracking-widest font-bold">Contact</Link></li>
              <li><Link to="/admin" className="text-gray-800 text-[9px] hover:text-red-900 transition-colors uppercase tracking-[0.3em] font-mono mt-4 block">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Connect</h3>
            <div className="flex space-x-6">
              <a href="https://youtube.com/@hackbitskannada" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-all transform hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://github.com/prajwal69sp" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/prajwalkm01" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-all transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/hackbitskannada" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-all transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-8">
               <span className="text-[10px] text-red-600 font-mono uppercase tracking-[0.2em] font-bold italic">Bit-Club • Join Now</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold italic">
            &copy; {currentYear} HACKBITS KANNADA. ALL SYSTEMS OPERATIONAL.
          </p>
        </div>
      </div>
    </footer>
  );
}
