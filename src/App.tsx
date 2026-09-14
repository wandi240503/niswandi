import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileMenu } from './components/MobileMenu';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { CvPage } from './pages/CvPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'NISWANDI';
    const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = `/favicon.png?v=${Date.now()}`;
    document.head.appendChild(link);
  }, []);

  return (
    <BrowserRouter>
      {/* 12. Initial Loading Screen Animation */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen flex flex-col bg-[#0a0b0e] dark:bg-[#0a0b0e] light:bg-[#F8F9FA] text-white dark:text-white light:text-gray-900 transition-colors duration-300">
        <ScrollToTop />
        
        {/* Navigation Bar */}
        <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* 10. Mobile Menu Drawer */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Routed Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/cv" element={<CvPage />} />
            <Route path="/resume" element={<CvPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Hidden Secret Admin Route - No public links */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

