import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Terminal, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "8073788665" && password === "praju@80737km") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid Protocol Credentials");
    }
  };

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Lock className="w-48 h-48 text-white" />
        </div>

        <div className="flex flex-col items-center mb-12 relative z-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,51,0.4)]">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-2 font-bold italic">Admin Protocol</h2>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 italic font-bold">Access ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                required
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-white placeholder-gray-700 transition-all font-medium"
                placeholder="ID: 8073..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 italic font-bold">Master Code</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-white placeholder-gray-700 transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-mono font-bold tracking-wider text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-5 rounded-2xl font-black hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(255,0,51,0.3)] active:scale-[0.98] flex items-center justify-center space-x-3 uppercase text-[11px] tracking-[0.3em]"
          >
            <span>Initialize Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
