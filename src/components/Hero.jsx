import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { getMediaUrl } from '../config';

export default function Hero({ data }) {
  const [showText, setShowText] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);

  // Force scroll to top on mount and set a delay before enabling scroll detection
  // This prevents any scroll momentum/restoration from immediately triggering the text.
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Programmatic video play helper (especially helpful on mobile/iOS power save mode)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Auto-play prevented or failed on mobile: ", err);
      });
    }
  }, [data.bgImageUrl, ready]);

  // Intercept the first scroll down / touch swipe to show the Hero text first
  useEffect(() => {
    if (!ready || showText) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        e.preventDefault();
        setShowText(true);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      // swipe up (finger moving up to scroll down)
      if (touchStartY - touchEndY > 15) {
        e.preventDefault();
        setShowText(true);
      }
    };

    // Use passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [ready, showText]);

  // Detect if the background URL represents a video file
  const isVideo = data.bgImageUrl && (
    data.bgImageUrl.endsWith('.mp4') ||
    data.bgImageUrl.endsWith('.webm') ||
    data.bgImageUrl.endsWith('.ogg') ||
    data.bgImageUrl.endsWith('.mov') ||
    data.bgImageUrl.includes('/uploads/uploaded_') && (
      data.bgImageUrl.includes('.mp4') ||
      data.bgImageUrl.includes('.webm') ||
      data.bgImageUrl.includes('.mov')
    )
  );

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20 transition-colors duration-300">
      {/* Background Media Container (Video or Image) */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        {isVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center opacity-85 transform scale-100"
          >
            <source src={getMediaUrl(data.bgImageUrl)} type="video/mp4" />
          </video>
        ) : (
          <img
            src={getMediaUrl(data.bgImageUrl)}
            alt="Importación desde China"
            className="w-full h-full object-cover object-center opacity-55 transform scale-100 transition-opacity duration-500"
          />
        )}
        {/* Lighter, gradient overlay that preserves image definition while maintaining text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-900/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full transition-all duration-1000 ease-out ${
        showText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95 pointer-events-none'
      }`}>
        <div className="max-w-3xl bg-slate-950/40 dark:bg-transparent p-6 sm:p-0 rounded-2xl backdrop-blur-sm sm:backdrop-blur-none border border-white/5 sm:border-0">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-klh-gold/25 border border-klh-gold/45 text-klh-gold text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="flex h-2 w-2 rounded-full bg-klh-goldLight animate-ping"></span>
            Importación Directa y Corporativa
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none mb-6 drop-shadow-md">
            {data.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="font-display font-medium text-lg sm:text-xl text-klh-goldLight mb-4 drop-shadow">
            {data.subtitle}
          </p>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-10 drop-shadow-sm font-medium">
            {data.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
            <a
              href={data.ctaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-klh-gold hover:bg-klh-goldLight text-klh-navy font-bold rounded-lg shadow-lg hover:shadow-klh-gold/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {data.ctaText}
              <ArrowRight size={18} />
            </a>
            <a
              href={data.contactCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 font-semibold rounded-lg transition-all cursor-pointer"
            >
              <MessageSquare size={18} />
              {data.contactCtaText}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}
