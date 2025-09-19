// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SeoJsonLd from './components/SeoJsonLd';
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import EventsPage from './pages/EventsPage';

// Pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import TagPage from './pages/TagPage';
import ScrollToTop from './components/ScrollToTop';
import HiddenGemsPrinceGeorge from './pages/HiddenGemsPrinceGeorge';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Site-level JSON-LD (must match brand + domain used in <head>) */}
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://hiddenprincegeorge.ca/#website",
          "url": "https://hiddenprincegeorge.ca/",
          "name": "Hidden Prince George",
          "alternateName": ["Hidden PG"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://hiddenprincegeorge.ca/?q={query}",
            "query-input": "required name=query"
          }
        }}
      />

      {/* Reset scroll on route change */}
      <ScrollToTop />

      <NavBar />

      {/* No global max-width wrapper here */}
      <main className="flex-1 pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/hidden-gems-prince-george" element={<HiddenGemsPrinceGeorge />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
