import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Videos", path: "/videos" },
  { name: "Scripts", path: "/scripts" },
  { name: "Tools", path: "/tools" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-800 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,0,51,0.3)] transition-transform group-hover:scale-110">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none">
                HACKBITS
              </span>
              <span className="text-[10px] text-red-500 font-mono tracking-[0.3em] font-bold">
                KANNADA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-all hover:text-red-500 hover:tracking-[0.25em] ${
                  location.pathname === item.path ? "text-red-500" : "text-gray-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://youtube.com/@hackbitskannada"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,51,0.4)] transition-all uppercase"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-6 border-t border-white/5 bg-black/95 backdrop-blur-2xl absolute left-0 right-0 shadow-2xl"
          >
            <div className="flex flex-col space-y-5 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold tracking-[0.2em] uppercase px-2 py-1 transition-colors ${
                    location.pathname === item.path ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://youtube.com/@hackbitskannada"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-4 py-3 rounded-xl text-sm font-bold tracking-[0.2em] uppercase transition-all text-center shadow-[0_0_20px_rgba(255,0,51,0.2)]"
              >
                Subscribe
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
