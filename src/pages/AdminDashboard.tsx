import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Video, 
  Code, 
  Wrench, 
  BarChart, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  Save, 
  X,
  FileText
} from "lucide-react";
import { FirebaseService } from "../lib/firebaseService";
import { motion, AnimatePresence } from "motion/react";

type Tab = "videos" | "scripts" | "tools" | "stats" | "pages";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
    } else {
      fetchItems();
    }
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await FirebaseService.getAll(activeTab);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'pages') {
        await FirebaseService.set('pages', editingItem.id, formData);
      } else if (editingItem) {
        await FirebaseService.update(activeTab, editingItem.id, formData);
      } else {
        await FirebaseService.add(activeTab, formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await FirebaseService.delete(activeTab, id);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#050507] text-gray-300">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/40 border-r border-white/5 h-[calc(100vh-6rem)] fixed left-0 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-8 font-bold italic px-2">Master Control</h2>
            
            {[
              { id: "videos", label: "Videos", icon: Video },
              { id: "scripts", label: "Scripts", icon: Code },
              { id: "tools", label: "Tools", icon: Wrench },
              { id: "stats", label: "Stats", icon: BarChart },
              { id: "pages", label: "Pages", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? "bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,51,0.2)]" 
                    : "hover:bg-white/5 text-gray-500 hover:text-white"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-600/10 text-red-600 transition-all font-bold uppercase text-xs tracking-widest"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-grow p-12">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight uppercase mb-2">
                Manage {activeTab}
              </h1>
              <p className="text-gray-500 text-sm font-medium">Update, edit or remove data from the {activeTab} protocol.</p>
            </div>
            {activeTab !== 'pages' && (
              <button 
                onClick={() => openModal()}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-black flex items-center space-x-2 shadow-[0_0_30px_rgba(255,0,51,0.3)] hover:scale-105 transition-all uppercase text-xs tracking-widest"
              >
                <Plus className="w-5 h-5" />
                <span>Add New</span>
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center space-x-6">
                    {activeTab === 'videos' && (
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-black/40">
                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight uppercase mb-1">
                        {item.id === 'home' ? 'Home Page' : item.id === 'about' ? 'About Page' : item.id === 'contact' ? 'Contact Page' : item.title || item.label || item.id}
                      </h3>
                      <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">{activeTab === 'pages' ? 'Static Page Node' : (item.category || item.status || item.label)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => openModal(item)}
                      className="p-3 rounded-xl hover:bg-white/10 text-gray-500 hover:text-white transition-all"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    {activeTab !== 'pages' && (
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 rounded-xl hover:bg-red-600/10 text-gray-500 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em]">No items found in {activeTab} node.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0a0c] border border-white/10 w-full max-w-2xl p-10 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-8">
                {editingItem ? 'Edit' : 'Add New'} {activeTab === 'pages' ? 'Page' : activeTab.slice(0, -1)}
              </h2>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Pages Editing Logic */}
                  {activeTab === 'pages' && editingItem?.id === 'home' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Hero Title</label>
                        <input 
                          type="text"
                          value={formData.heroTitle || ""}
                          onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Hero Subtitle</label>
                        <textarea 
                          rows={3}
                          value={formData.heroSubtitle || ""}
                          onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Services Section Title</label>
                        <input 
                          type="text"
                          value={formData.servicesTitle || ""}
                          onChange={(e) => setFormData({ ...formData, servicesTitle: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'pages' && editingItem?.id === 'about' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">About Title</label>
                        <input 
                          type="text"
                          value={formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Main Description</label>
                        <textarea 
                          rows={6}
                          value={formData.description || ""}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all resize-none"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'pages' && editingItem?.id === 'contact' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Contact Title</label>
                        <input 
                          type="text"
                          value={formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Description</label>
                        <textarea 
                          rows={3}
                          value={formData.description || ""}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Address</label>
                        <input 
                          type="text"
                          value={formData.address || ""}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Email</label>
                          <input 
                            type="text"
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Phone</label>
                          <input 
                            type="text"
                            value={formData.phone || ""}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Standard Fields */}
                  {activeTab !== 'pages' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Title / Label</label>
                      <input 
                        required
                        type="text"
                        value={formData.title || formData.label || ""}
                        onChange={(e) => setFormData({ ...formData, [activeTab === 'stats' ? 'label' : 'title']: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                      />
                    </div>
                  )}

                  {activeTab === 'videos' && (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Category</label>
                          <input 
                            type="text"
                            value={formData.category || ""}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Duration</label>
                          <input 
                            type="text"
                            value={formData.duration || ""}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Thumbnail URL</label>
                        <input 
                          type="text"
                          value={formData.thumbnail || ""}
                          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">YouTube URL</label>
                        <input 
                          type="text"
                          value={formData.youtubeUrl || ""}
                          onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                    </>
                  )}

                  {(activeTab === 'scripts' || activeTab === 'tools') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Description</label>
                      <textarea 
                        rows={4}
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all resize-none"
                      />
                    </div>
                  )}

                  {activeTab === 'scripts' && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Language</label>
                        <input 
                          type="text"
                          value={formData.language || ""}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Download URL</label>
                        <input 
                          type="text"
                          value={formData.downloadUrl || ""}
                          onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'tools' && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Status (Production/Beta/Dev)</label>
                        <input 
                          type="text"
                          value={formData.status || ""}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Tool URL</label>
                        <input 
                          type="text"
                          value={formData.url || ""}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'stats' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Value (e.g. 100K+)</label>
                      <input 
                        type="text"
                        value={formData.value || ""}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600 text-white transition-all"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-grow bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_0_30px_rgba(255,0,51,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Protocol</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 bg-white/5 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
