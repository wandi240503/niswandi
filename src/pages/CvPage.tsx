import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Palette, 
  Wrench, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  FileText,
  Upload,
  Eye,
  Trash2
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { CV_DATA } from '../data/portfolioData';
import { getCvDocument, saveCvDocument, deleteCvDocument } from '../utils/imageDb';

export const CvPage: React.FC = () => {
  const [uploadedCv, setUploadedCv] = useState<{ fileName: string; dataUrl: string } | null>(null);
  const [viewMode, setViewMode] = useState<'web' | 'pdf'>('web');
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load custom uploaded CV if available
    getCvDocument().then((doc) => {
      if (doc) {
        setUploadedCv(doc);
      }
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadFile = () => {
    if (uploadedCv) {
      // Download actual uploaded PDF file
      const a = document.createElement('a');
      a.href = uploadedCv.dataUrl;
      a.download = uploadedCv.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Mengunduh ${uploadedCv.fileName}`);
    } else {
      // Fallback: trigger print to PDF
      window.print();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Ukuran file maksimal 15MB.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const success = await saveCvDocument(file.name, dataUrl);
      setIsUploading(false);
      if (success) {
        setUploadedCv({ fileName: file.name, dataUrl });
        showToast(`File "${file.name}" berhasil diunggah!`);
      } else {
        alert('Gagal menyimpan file CV ke penyimpanan lokal.');
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Gagal membaca file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteCustomCv = async () => {
    if (window.confirm('Hapus file CV PDF yang diunggah? Halaman akan kembali ke format standar.')) {
      await deleteCvDocument();
      setUploadedCv(null);
      setViewMode('web');
      showToast('File CV berhasil dihapus.');
    }
  };

  return (
    <div className="pt-28 pb-20 print:p-0 print:m-0 print:bg-white print:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-lime text-black font-mono text-xs font-bold shadow-2xl animate-fadeIn">
          {toastMessage}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ─── Screen Header Actions (Hidden on Print) ─── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-lime transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Download File Button */}
            <button
              onClick={handleDownloadFile}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-lime text-black font-bold text-xs hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              title={uploadedCv ? `Download ${uploadedCv.fileName}` : "Download CV / Print ke PDF"}
            >
              <Download className="w-4 h-4" />
              <span>{uploadedCv ? 'Download File CV (PDF)' : 'Download / Print PDF'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime/40 text-xs font-mono text-gray-300 hover:text-lime transition-colors"
              title="Print langsung ke printer atau simpan PDF browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Upload CV Button (for Niswandi) */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime/40 text-xs font-mono text-gray-300 hover:text-lime transition-colors"
              title="Upload file PDF CV resmi Anda"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : uploadedCv ? 'Ganti File PDF' : 'Upload File PDF'}</span>
            </button>

            {/* Hire Me CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center space-x-1 px-3.5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime/40 text-xs font-mono text-gray-300 hover:text-lime transition-colors"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Uploaded File Banner & View Mode Switcher */}
        {uploadedCv && (
          <div className="mt-4 p-3 sm:p-4 rounded-2xl bg-lime/10 border border-lime/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-lime font-mono">
              <FileText className="w-4 h-4 shrink-0" />
              <span className="font-bold">File CV Aktif:</span>
              <span className="truncate max-w-xs sm:max-w-md underline">{uploadedCv.fileName}</span>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setViewMode(viewMode === 'web' ? 'pdf' : 'web')}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-lime text-black font-bold font-mono text-[11px] hover:bg-lime-hover transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{viewMode === 'web' ? 'Lihat File PDF Asli' : 'Lihat Desain Web'}</span>
              </button>

              <button
                onClick={handleDeleteCustomCv}
                className="p-1.5 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                title="Hapus file PDF yang diunggah"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── PDF Viewer Mode ─── */}
      {viewMode === 'pdf' && uploadedCv ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="w-full h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-[#12151a] shadow-2xl">
            <iframe
              src={uploadedCv.dataUrl}
              className="w-full h-full"
              title="Preview CV PDF"
            />
          </div>
          <div className="text-center">
            <button
              onClick={() => setViewMode('web')}
              className="text-xs font-mono text-lime hover:underline"
            >
              ← Kembali ke tampilan web interaktif
            </button>
          </div>
        </div>
      ) : (
        /* ─── CV Document Paper (Web & Print Layout) ─── */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#12151a] dark:bg-[#12151a] light:bg-white print:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 print:border-none rounded-3xl print:rounded-none p-6 sm:p-10 lg:p-12 shadow-2xl print:shadow-none space-y-10 print:space-y-8 text-white dark:text-white light:text-gray-900 print:text-black">
            
            {/* 1. Header Profile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-[11px] font-mono tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse print:hidden" />
                  <span>CURRICULUM VITAE</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase print:text-black">
                  {CV_DATA.fullName}
                </h1>
                <p className="text-base sm:text-xl font-semibold text-lime print:text-gray-800">
                  {CV_DATA.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 print:text-gray-600 max-w-xl">
                  {CV_DATA.tagline}
                </p>
              </div>

              {/* Portrait Photo */}
              <div className="shrink-0 relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-lime/50 shadow-[0_0_20px_rgba(198,242,33,0.2)] bg-black/50">
                  <img
                    src={CV_DATA.photo}
                    alt={CV_DATA.fullName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* 2. Contact & Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 text-xs font-mono">
              <a
                href={`mailto:${CV_DATA.email}`}
                className="flex items-center space-x-2.5 text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black hover:text-lime transition-colors"
              >
                <Mail className="w-4 h-4 text-lime shrink-0" />
                <span className="truncate">{CV_DATA.email}</span>
              </a>
              <a
                href={CV_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black hover:text-lime transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-lime shrink-0" />
                <span className="truncate">{CV_DATA.linkedinHandle}</span>
              </a>
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black hover:text-lime transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-lime shrink-0" />
                <span className="truncate">{CV_DATA.githubHandle}</span>
              </a>
              <a
                href={CV_DATA.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black hover:text-lime transition-colors"
              >
                <Globe className="w-4 h-4 text-lime shrink-0" />
                <span className="truncate">{CV_DATA.websiteHandle}</span>
              </a>
              <div className="flex items-center space-x-2.5 text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black">
                <MapPin className="w-4 h-4 text-lime shrink-0" />
                <span>{CV_DATA.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-lime print:text-gray-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-lime animate-ping print:hidden" />
                <span>Open for Projects & Roles</span>
              </div>
            </div>

            {/* 3. Professional Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-lime print:text-gray-800 font-bold flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RINGKASAN PROFESIONAL (ABOUT ME)</span>
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black text-justify">
                {CV_DATA.summary}
              </p>
            </div>

            {/* 4. Skills & Competencies */}
            <div className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-lime print:text-gray-800 font-bold flex items-center space-x-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>KEAHLIAN TEKNOLOGI & SKILLS</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Frontend */}
                <div className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-transparent border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                    <Code2 className="w-3.5 h-3.5 text-lime" />
                    <span>Front-End Engineering</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CV_DATA.skills.frontend.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1a1e26] dark:bg-[#1a1e26] light:bg-white print:bg-gray-100 text-gray-200 dark:text-gray-200 light:text-gray-800 print:text-black border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend & DB */}
                <div className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-transparent border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                    <Wrench className="w-3.5 h-3.5 text-lime" />
                    <span>Back-End & Database</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CV_DATA.skills.backend.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1a1e26] dark:bg-[#1a1e26] light:bg-white print:bg-gray-100 text-gray-200 dark:text-gray-200 light:text-gray-800 print:text-black border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* UI/UX Design */}
                <div className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-transparent border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                    <Palette className="w-3.5 h-3.5 text-lime" />
                    <span>UI/UX & Product Design</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CV_DATA.skills.uiux.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1a1e26] dark:bg-[#1a1e26] light:bg-white print:bg-gray-100 text-gray-200 dark:text-gray-200 light:text-gray-800 print:text-black border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Workflow */}
                <div className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-transparent border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                    <span>Tools, DevOps & Soft Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CV_DATA.skills.tools.concat(CV_DATA.skills.softSkills.slice(0, 4)).map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1a1e26] dark:bg-[#1a1e26] light:bg-white print:bg-gray-100 text-gray-200 dark:text-gray-200 light:text-gray-800 print:text-black border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Work Experience */}
            <div className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-lime print:text-gray-800 font-bold flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>PENGALAMAN KERJA (WORK EXPERIENCE)</span>
              </h2>

              <div className="space-y-6">
                {CV_DATA.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-transparent border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-display text-white dark:text-white light:text-gray-900 print:text-black">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-mono text-lime print:text-gray-800 font-semibold">
                          {exp.company} • <span className="text-gray-400">{exp.location}</span>
                        </p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 dark:bg-white/5 light:bg-white print:bg-gray-100 border border-white/10 text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-black shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 print:text-gray-800 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-1.5 pt-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 print:text-gray-700 flex items-start space-x-2">
                          <span className="text-lime print:text-black font-bold">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Featured Production Projects */}
            <div className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-lime print:text-gray-800 font-bold flex items-center space-x-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>PROYEK UNGGULAN (FEATURED PROJECTS)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CV_DATA.featuredProjects.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 print:bg-transparent border border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                        {p.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime/15 text-lime print:text-gray-800 font-bold">
                        {p.year}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-lime print:text-gray-700 font-semibold">
                      {p.category}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 print:text-gray-700 line-clamp-3">
                      {p.description}
                    </p>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-lime print:text-black hover:underline font-mono pt-1"
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Education & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300">
              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-lime print:text-gray-800 font-bold flex items-center space-x-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>PENDIDIKAN (EDUCATION)</span>
                </h2>
                {CV_DATA.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-mono text-lime print:text-gray-800">
                      {edu.institution} ({edu.period})
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 print:text-gray-700">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-lime print:text-gray-800 font-bold flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>BAHASA (LANGUAGES)</span>
                </h2>
                <div className="space-y-2">
                  {CV_DATA.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white dark:text-white light:text-gray-900 print:text-black">
                        {lang.name}
                      </span>
                      <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 print:text-gray-600">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200 print:border-gray-300 text-center text-xs font-mono text-gray-500">
              <p>© 2026 {CV_DATA.fullName}. Certified Portfolio & Curriculum Vitae.</p>
              <p className="text-[10px] text-gray-600 mt-1">
                Dokumen ini dapat diverifikasi secara daring di {CV_DATA.websiteHandle}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
