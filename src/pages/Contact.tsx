import { Mail, MessageSquare, MapPin, Youtube, Github, Instagram, Send } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FirebaseService } from "../lib/firebaseService";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [pageContent, setPageContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FirebaseService.getById("pages", "contact");
        if (data) setPageContent(data);
      } catch (error) {
        console.error("Error fetching contact page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="max-w-2xl mb-16">
          <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4 font-bold italic">Communication Portal</h2>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">{pageContent.title || "Get in Touch"}</h1>
          <p className="text-xl text-gray-400 leading-relaxed font-medium">
            {pageContent.description || "Have a protocol inquiry or business request? Our encrypted channels are open. Fill out the form below or reach out via our verified social nodes."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Mail, label: "Email", value: pageContent.email || "hello@hackbits.com" },
                { icon: MessageSquare, label: "Community", value: "Discord Node" },
                { icon: MapPin, label: "Location", value: pageContent.address || "Bangalore, IN" },
                { icon: Youtube, label: "Verified", value: "@hackbitskannada" },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-2xl hover:bg-white/10 transition-all duration-500 backdrop-blur-sm group">
                  <div className="bg-red-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-red-600 border border-red-600/20 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-2 font-bold">{item.label}</h3>
                  <p className="text-lg font-black text-white tracking-tight uppercase">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-[0_0_50px_rgba(255,0,51,0.2)] group">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                <Send className="w-48 h-48" />
              </div>
              <h3 className="text-2xl font-black mb-8 relative z-10 tracking-tight uppercase tracking-widest">Connect with Us</h3>
              <div className="flex space-x-6 relative z-10">
                <a href="https://youtube.com/@hackbitskannada" target="_blank" rel="noopener noreferrer" className="bg-black/10 p-4 rounded-2xl hover:bg-black/20 transition-all transform hover:scale-110 border border-white/10">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="https://github.com/prajwal69sp" target="_blank" rel="noopener noreferrer" className="bg-black/10 p-4 rounded-2xl hover:bg-black/20 transition-all transform hover:scale-110 border border-white/10">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/hackbitskannada" target="_blank" rel="noopener noreferrer" className="bg-black/10 p-4 rounded-2xl hover:bg-black/20 transition-all transform hover:scale-110 border border-white/10">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-10 lg:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-2xl font-black text-white mb-10 tracking-tight uppercase">Transmit Message</h3>
            
            {submitted ? (
              <div className="bg-red-600/10 text-red-500 p-10 rounded-[2rem] border border-red-600/20 flex flex-col items-center text-center backdrop-blur-sm">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(255,0,51,0.4)]">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight uppercase">Protocol Success</h4>
                <p className="text-gray-400 font-medium leading-relaxed">Thank you for reaching out. We will process your transmission shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 italic font-bold">Operator Name</label>
                    <input
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-700 transition-all font-medium"
                      placeholder="Ident Name"
                    />
                  </div>
                  <div className="space-y-3 text-left">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 italic font-bold">Return Address</label>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-700 transition-all font-medium"
                      placeholder="email@node.com"
                    />
                  </div>
                </div>
                <div className="space-y-3 text-left">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 italic font-bold">Transmission Subject</label>
                  <input
                    required
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-700 transition-all font-medium"
                    placeholder="Subject Header"
                  />
                </div>
                <div className="space-y-3 text-left">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 italic font-bold">Data Payload</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-white placeholder-gray-700 transition-all resize-none font-medium"
                    placeholder="Enter message data..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-6 rounded-2xl font-black hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(255,0,51,0.3)] active:scale-[0.98] flex items-center justify-center space-x-3 uppercase text-[11px] tracking-[0.3em]"
                >
                  <span>Transmit</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
