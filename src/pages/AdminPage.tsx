import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Plus, Trash2, Edit3, Globe, ArrowUpRight, Check, X, LogOut, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types/portfolio';
import { getStoredProjects, addOrUpdateProject, deleteStoredProject, resetStoredProjects } from '../utils/projectStorage';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '',
    title: '',
    category: 'WEB DEVELOPMENT',
    tag: 'WEB // 2026',
    badge: 'LIVE WEB',
    year: '2026',
    description: '',
    image: '/images/recaffe.png',
    liveUrl: '',
    tags: ['React', 'Tailwind CSS', 'TypeScript'],
  });

  const [tagsInput, setTagsInput] = useState('React, Tailwind CSS, TypeScript');

  useEffect(() => {
    // Check if session token exists
    const sessionAuth = sessionStorage.getItem('niswandi_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      setProjects(getStoredProjects());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password can be changed here or customized
    if (passwordInput === 'niswandi2026' || passwordInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('niswandi_admin_auth', 'true');
      setProjects(getStoredProjects());
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('niswandi_admin_auth');
    setIsAuthenticated(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    const newId = 'proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setFormData({
      id: newId,
      number: String(projects.length + 1).padStart(2, '0'),
      title: '',
      category: 'WEB DEVELOPMENT',
      tag: 'WEB // ' + new Date().getFullYear(),
      badge: 'LIVE PRODUCTION',
      year: String(new Date().getFullYear()),
      description: '',
      image: '/images/recaffe.png',
      liveUrl: '',
      tags: ['React', 'Tailwind CSS'],
    });
    setTagsInput('React, Tailwind CSS');
    setShowModal(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      id: project.id,
    });
    setTagsInput(project.tags && project.tags.length > 0 ? project.tags.join(', ') : '');
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    const projTitle = proj ? `"${proj.title}"` : 'proyek ini';
    if (window.confirm(`Yakin ingin menghapus ${projTitle}?`)) {
      const updated = deleteStoredProject(id);
      setProjects(updated);
      showToast(`${projTitle} berhasil dihapus.`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan semua proyek ke 4 proyek utama bawaan?')) {
      const defaults = resetStoredProjects();
      setProjects(defaults);
      showToast('Daftar proyek dikembalikan ke default.');
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    // 1. Files <= 6MB: 100% ORIGINAL LOSSLESS QUALITY (Zero blur, zero compression)
    // Directly store pixel-perfect original file without any canvas degradation
    if (file.size <= 6 * 1024 * 1024) {
      reader.onload = (event) => {
        const originalData = event.target?.result as string;
        setFormData((prev) => ({ ...prev, image: originalData }));
      };
      reader.readAsDataURL(file);
      return;
    }

    // 2. Ultra HD processing for very large raw camera files (> 6MB)
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 2560;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          let hdData = canvas.toDataURL('image/webp', 0.94);
          if (!hdData.startsWith('data:image/webp')) {
            hdData = canvas.toDataURL('image/jpeg', 0.94);
          }
          setFormData((prev) => ({ ...prev, image: hdData }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim() || !formData.description?.trim()) {
      alert('Mohon isi Judul dan Deskripsi proyek.');
      return;
    }

    const cleanedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const targetId = editingId || formData.id || ('proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6));

    const projectToSave: Project = {
      id: targetId,
      number: formData.number || String(projects.length + 1).padStart(2, '0'),
      title: formData.title.trim(),
      category: formData.category || 'WEB DEVELOPMENT',
      tag: formData.tag || 'WEB // ' + new Date().getFullYear(),
      badge: formData.badge || 'LIVE WEB',
      year: formData.year || String(new Date().getFullYear()),
      description: formData.description.trim(),
      image: formData.image || '/images/fintech-app.png',
      liveUrl: formData.liveUrl?.trim() ? formData.liveUrl.trim() : undefined,
      tags: cleanedTags.length > 0 ? cleanedTags : ['Web Development'],
      client: formData.client || 'Client Project',
      role: formData.role || 'Designer & Developer',
      timeline: formData.timeline || '4 Weeks',
      services: formData.services || ['Web Development'],
      overview: formData.overview || formData.description,
      challenge: formData.challenge || 'Designing and engineering an intuitive web platform.',
    };

    const result = addOrUpdateProject(projectToSave);
    if (!result.success) {
      alert('⚠️ GAGAL MENYIMPAN!\n\nMemori browser penuh (localStorage limit 5MB).\n\nSolusi:\n1. Hapus beberapa proyek lama yang tidak dibutuhkan\n2. Gunakan link gambar URL (bukan upload file)\n3. Upload gambar dengan ukuran lebih kecil');
      return;
    }
    setProjects(result.projects);
    setShowModal(false);
    showToast(editingId ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!');
  };

  // 1. Password Protection Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0b0e]">
        <div className="w-full max-w-md bg-[#12151a] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lime">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black font-display text-white">
              NISWANDI<span className="text-lime">.</span> Management
            </h1>
            <p className="text-xs text-gray-400">
              Enter secret password to access project manager.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (default: niswandi2026)"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-lime"
              />
              {authError && (
                <p className="text-xs text-red-400 mt-1.5">
                  Password incorrect. (Try: niswandi2026)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_15px_rgba(198,242,33,0.3)] transition-all"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs font-mono text-gray-500 hover:text-lime">
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="text-xs font-mono text-lime uppercase tracking-widest">
              SECRET ADMIN PANEL
            </div>
            <h1 className="text-3xl font-black font-display">
              Manage Your Websites & Projects
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-lime text-black font-bold text-xs hover:bg-lime-hover transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>

            <Link
              to="/"
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono hover:text-lime transition-colors"
            >
              View Site ↗
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-lime/15 border border-lime/40 text-lime text-xs font-mono flex items-center space-x-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Projects Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#14171d] border border-white/10 p-5 flex flex-col justify-between space-y-4 relative group"
            >
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-4 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  {proj.liveUrl && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-lime text-black font-bold text-[10px] font-mono">
                      LIVE WEB
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-lime mb-1">
                  {proj.category} • {proj.year}
                </div>
                <h3 className="text-lg font-bold font-display text-white">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                  {proj.description}
                </p>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center space-x-1.5 text-xs text-lime hover:underline font-mono"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{proj.liveUrl}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="inline-flex items-center space-x-1 text-gray-300 hover:text-lime transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="inline-flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reset Button Footer */}
        <div className="pt-8 border-t border-white/10 flex justify-end">
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to default showcase projects (4 proyek asli)</span>
          </button>
        </div>
      </div>

      {/* 3. Add / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#12151a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-xl font-bold font-display text-white">
                {editingId ? 'Edit Project' : 'Add New Website / Project'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              {/* Title & Live URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                    Project / Website Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Toko Online Hijau"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                    Live Website Link (URL)
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://mywebsite.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                  />
                </div>
              </div>

              {/* Category & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1e26] border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                  >
                    <option value="WEB DEVELOPMENT">WEB DEVELOPMENT</option>
                    <option value="UI/UX - PRODUCT DESIGN">UI/UX DESIGN</option>
                    <option value="MOBILE">MOBILE APP</option>
                    <option value="BRANDING">BRANDING</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. LIVE PRODUCTION"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell what the project is about..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime resize-none"
                />
              </div>

              {/* Image Input & Upload */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                  Project Image / Screenshot
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Image path (/images/...) or URL"
                    className="flex-1 w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                  />
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-lime" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Next.js, Tailwind CSS, API"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-lime"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-lime text-black font-bold text-xs hover:bg-lime-hover shadow-lg transition-all"
                >
                  {editingId ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

