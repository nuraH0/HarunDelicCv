'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  SiAngular,
  SiDotnet,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
} from 'react-icons/si';
import * as THREE from 'three';

export default function Home() {
  const words = ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const [showServices, setShowServices] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [showContact, setShowContact] = useState(false); // NOVI STATE ZA KONTAKT MODAL
  const [language, setLanguage] = useState('bs');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [toast, setToast] = useState('');

  const copyToClipboard = async (text: string, type: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setToast(`${type === 'email' ? '📧' : '📱'} Copied!`);
  } catch {
    // Fallback
    setToast('Press long to copy');
  }
  setTimeout(() => setToast(''), 2500);
};

  // BOSANSKI sadržaj
 const bsContent = {
  words: ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'],
  welcome: 'Dobrodošao u moj digitalni svijet 🚀 Ja sam Harun, full-stack developer koji pretvara ideje u moderne web i mobilne aplikacije, gdje se dizajn i funkcionalnost susreću.',
  servicesBtn: '🚀 Usluge',
  cvBtn: '📄 Pogledaj CV',
  servicesTitle: '🌟 Usluge 🌟',
  contactTitle: '📞 Kontakt',
  contactBtn: '📞 Kontaktiraj me',
  email: 'harun.delic01@gmail.com',
  viber: '+387 61 622 101', // ← TVOJ BROJ!
  myServices: [
      {
        title: 'Izrada Web Stranica',
        description: 'Pravimo moderne web stranice koristeći Next.js, React ili Angular, sa fokusom na dizajn i performanse.',
        emoji: '🌐',
        gradient: 'from-indigo-500 to-purple-600',
        ring: 'ring-indigo-500/30',
      },
      {
        title: 'Razvoj Mobilnih Aplikacija',
        description: 'Razvijamo Android i iOS aplikacije koristeći Kotlin, Java ili React Native.',
        emoji: '📱',
        gradient: 'from-emerald-500 to-teal-600',
        ring: 'ring-emerald-500/30',
      },
      {
        title: 'Održavanje i Optimizacija',
        description: 'Održavanje web i mobilnih aplikacija, optimizacija performansi i sigurnosti.',
        emoji: '🛠️',
        gradient: 'from-orange-500 to-amber-600',
        ring: 'ring-orange-500/30',
      },
      {
        title: 'UI/UX Dizajn',
        description: 'Kreiranje modernih, responzivnih i privlačnih dizajna za web i mobilne aplikacije.',
        emoji: '🎨',
        gradient: 'from-pink-500 to-rose-600',
        ring: 'ring-pink-500/30',
      },
      {
        title: 'Konsultacije i Savjeti',
        description: 'Savjeti i konsultacije u vezi tehnologija, arhitekture i izbora stacka za vaš projekt.',
        emoji: '💡',
        gradient: 'from-blue-500 to-cyan-600',
        ring: 'ring-blue-500/30',
      },
    ]
  };

  const enContent = {
    words: ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'],
    welcome: 'Welcome to my digital world 🚀 I am Harun, a full-stack developer who turns ideas into modern web and mobile applications where design meets functionality.',
    servicesBtn: '🚀 Services',
    cvBtn: '📄 View CV',
    servicesTitle: '🌟 Services 🌟',
    servicesClose: '❌ Close',
    cvClose: '❌ Close',
    contactTitle: '📞 Contact Me',
    contactBtn: '📞 Contact Me',
    email: 'harun.delic01@gmail.com',
    viber: '+387 61 622 101', // OVDJE STAVI SVOJ VIBER BROJ
    myServices: [
      {
        title: 'Website Development',
        description: 'We create modern websites using Next.js, React or Angular, with focus on design and performance.',
        emoji: '🌐',
        gradient: 'from-indigo-500 to-purple-600',
        ring: 'ring-indigo-500/30',
      },
      {
        title: 'Mobile App Development',
        description: 'We develop Android and iOS apps using Kotlin, Java or React Native.',
        emoji: '📱',
        gradient: 'from-emerald-500 to-teal-600',
        ring: 'ring-emerald-500/30',
      },
      {
        title: 'Maintenance & Optimization',
        description: 'Maintenance of web and mobile apps, performance and security optimization.',
        emoji: '🛠️',
        gradient: 'from-orange-500 to-amber-600',
        ring: 'ring-orange-500/30',
      },
      {
        title: 'UI/UX Design',
        description: 'Creating modern, responsive and attractive designs for web and mobile applications.',
        emoji: '🎨',
        gradient: 'from-pink-500 to-rose-600',
        ring: 'ring-pink-500/30',
      },
      {
        title: 'Consultations & Advice',
        description: 'Advice and consultations regarding technologies, architecture and stack selection for your project.',
        emoji: '💡',
        gradient: 'from-blue-500 to-cyan-600',
        ring: 'ring-blue-500/30',
      },
    ]
  };

  // Trenutni sadržaj ovisno o jeziku
  const content = language === 'bs' ? bsContent : enContent;
  const currentServices = content.myServices;

  // Toggle jezik
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'bs' ? 'en' : 'bs');
    setIndex(0);
    setCurrentWord(content.words[0]);
  }, [content.words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [content.words]);

  useEffect(() => {
    setCurrentWord(content.words[index % content.words.length]);
  }, [index, content.words]);

  // Premium loading effects
  useEffect(() => {
    // Simulate progressive loading
    const progressInterval = setInterval(() => {
      setPreloaderProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 5;
      });
    }, 80);

    // Initial load
    const timer1 = setTimeout(() => setIsLoaded(true), 1200);
    
    // Full load after canvas and images
    const timer2 = setTimeout(() => setIsFullyLoaded(true), 2800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const skills = [
    { icon: <SiAngular className="text-red-500" />, name: 'Angular' },
    { icon: <SiDotnet className="text-blue-400" />, name: '.NET' },
    { icon: <SiReact className="text-cyan-400" />, name: 'React' },
    { icon: <SiNextdotjs className="text-gray-300" />, name: 'Next.js' },
    { icon: <SiHtml5 className="text-orange-500" />, name: 'HTML' },
    { icon: <SiCss3 className="text-blue-600" />, name: 'CSS' },
  ];

  const radius = 130;

  const StarsParticles = () => {
    const meshRef = useRef<THREE.Points>(null);
    const cometRef = useRef<THREE.Points>(null);

    const stars = useMemo(() => {
      const temp: number[][] = [];
      for (let i = 0; i < 2000; i++) {
        temp.push([
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 1200,
          (Math.random() - 0.5) * 1500,
        ]);
      }
      return temp;
    }, []);

    const comet = useMemo(() => {
      const temp: number[][] = [];
      for (let i = 0; i < 10; i++) {
        temp.push([
          Math.random() * 2000 - 1000,
          600 + Math.random() * 400,
          Math.random() * 1500 - 750,
        ]);
      }
      return temp;
    }, []);

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.0005;
        meshRef.current.rotation.x += 0.0003;
      }
      if (cometRef.current) {
        const positions = cometRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] -= 8;
          positions[i + 1] -= 3;
          if (positions[i] < -1200 || positions[i + 1] < -600) {
            positions[i] = 1200;
            positions[i + 1] = 600 + Math.random() * 400;
          }
        }
        cometRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });

    return (
      <>
        <points ref={meshRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(stars.flat()), 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.5} color="#ffffff" sizeAttenuation transparent opacity={0.6} />
        </points>

        <points ref={cometRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(comet.flat()), 3]} />
          </bufferGeometry>
          <pointsMaterial size={3} color="#00ffff" transparent opacity={0.8} />
        </points>
      </>
    );
  };

  // Fixed Variants - TypeScript compliant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  } as const;

  const itemVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  } as const;

  const profileVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  } as const;

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white bg-gradient-to-br from-black via-gray-900 to-black">
      {/* PREMIUM PRELOADER */}
      <AnimatePresence>
        {!isFullyLoaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Animated Logo */}
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 mb-12 relative"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
                borderRadius: ["20%", "50%", "20%"]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                borderRadius: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full shadow-[0_0_100px_rgba(6,182,212,0.8)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-60 animate-pulse delay-1000" />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mb-8">
              <div className="w-full bg-white/10 rounded-full h-3 relative overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,1)] relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${preloaderProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 animate-[shimmer_2s_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]" />
                </motion.div>
              </div>
              <motion.div
                className="text-center mt-2 font-mono text-sm text-cyan-300 tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(preloaderProgress)}%
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Loading Portfolio...
            </motion.div>
            
            {/* Floating particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/50 rounded-full"
                animate={{
                  x: [0, Math.sin(i) * 200, 0],
                  y: [0, Math.cos(i) * 100, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  left: `${20 + i * 5}%`,
                  top: `${30 + i * 3}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language toggle */}
      {isLoaded && !showServices && !showCV && !showContact && (
        <div className="fixed top-4 right-4 z-[1000] p-2 pointer-events-auto sm:top-3 sm:right-3">
          <div
            className="w-[90px] h-[46px] bg-gray-900/95 backdrop-blur-2xl rounded-2xl p-[4px] shadow-2xl border border-white/30 relative cursor-pointer group hover:shadow-cyan-500/30 overflow-hidden select-none"
            onClick={toggleLanguage}
          >
            {/* PUNI KRUG ZASTAVE - SVE SAVRŠENO CENTRIRANO */}
            <motion.div
              className="w-[38px] h-[38px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-gradient-to-br rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.5)] z-10 border-2 border-white/60 flex items-center justify-center backdrop-blur-xl"
              animate={{
                translateX: language === 'bs' ? "-22px" : "22px",
                background: language === 'bs'
                  ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 70%, #1e3a8a 100%)"
                  : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 70%, #b45309 100%)"
              }}
              transition={{
                translateX: { type: "spring", stiffness: 450, damping: 28 },
                background: { duration: 0.3 }
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* PUNA ZASTAVA - popunjava CEIJI KRUG */}
              <img
                src={language === 'bs' ? '/bosna.png' : '/engleska.png'}
                alt={language === 'bs' ? '🇧🇦' : '🇬🇧'}
                className="w-full h-full rounded-full object-cover shadow-inner border border-white/80"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = language === 'bs'
                    ? 'https://flagcdn.com/w40/ba.png'
                    : 'https://flagcdn.com/w40/gb.png';
                }}
              />
            </motion.div>
            
            {/* SUBTILNA TRACA */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent/50 to-white/20 h-[2px] top-[50%] -translate-y-1/2 rounded-full" />
          </div>
        </div>
      )}

      {/* FULLSCREEN Canvas */}
      <div className={`absolute inset-0 w-full h-screen z-10 pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <Canvas 
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ 
            antialias: false,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.4} />
          <StarsParticles />
        </Canvas>
      </div>

      {/* MAIN CONTENT */}
      <motion.main 
        className={`h-screen flex flex-col justify-center items-center text-center p-4 sm:p-8 relative z-20 space-y-6 sm:space-y-8 ${showServices || showCV || showContact ? 'blur-sm' : ''} transition-all duration-500 ${isFullyLoaded ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
        variants={containerVariants}
        initial="hidden"
        animate={isFullyLoaded ? "visible" : "hidden"}
      >
        {/* Orbit ikone */}
        <motion.div
          className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56"
          variants={itemVariants}
        >
          {/* ROTACIJA KONTENJERA */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            className="absolute inset-0"
          >
            {skills.map((skill, i) => {
              const angleRad = (i / skills.length) * 2 * Math.PI; 
              
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-xl sm:text-2xl md:text-3xl drop-shadow-[0_0_15px_cyan] pointer-events-none"
                  style={{ 
                    transform: `translate(-50%, -50%) translate(${100 * Math.cos(angleRad)}px, ${100 * Math.sin(angleRad)}px)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.8 }}
                >
                  {skill.icon}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Profilna slika */}
          <motion.div
            variants={profileVariants}
            className="absolute inset-0 flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-cyan-500 z-20"
          >
            <motion.img
              src="/slikamoja.jpg"
              alt="Harun Delić"
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-all duration-700 ease-out"
              loading="lazy"
              initial={{ filter: 'blur(20px)' }}
              animate={{ filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 1.8 }}
            />
          </motion.div>
        </motion.div>

        {/* Ime */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 px-4"
          style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px' }}
        >
          Harun Delić
        </motion.h1>

        {/* Rotirajuća uloga */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`${currentWord}-${language}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="text-2xl sm:text-3xl text-cyan-300 font-semibold tracking-wide px-4"
          >
            {currentWord}
          </motion.p>
        </AnimatePresence>

        {/* Glass opis */}
        <motion.div
          variants={itemVariants}
          className="mt-6 sm:mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-6 sm:px-12 py-4 sm:py-6 max-w-sm sm:max-w-xl sm:max-w-2xl md:max-w-xl text-gray-300 text-sm sm:text-base leading-relaxed shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500"
        >
          {content.welcome}
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-md sm:max-w-none px-4 justify-center"
        >
          <motion.button
            onClick={() => setShowServices(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 rounded-full border border-transparent text-cyan-300 font-semibold hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 w-full sm:w-auto text-sm sm:text-base backdrop-blur-sm bg-white/5 hover:bg-white/10"
          >
            {content.servicesBtn}
          </motion.button>

          <motion.button
            onClick={() => setShowCV(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 font-semibold flex items-center justify-center gap-2 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 w-full sm:w-auto text-sm sm:text-base backdrop-blur-sm bg-white/5"
          >
            {content.cvBtn}
          </motion.button>
        </motion.div>
      </motion.main>

      {/* MODALI */}
      <AnimatePresence>
        {/* Services Modal - MOBITEL FULL SCREEN, DESKTOP KAO PRIJE */}
        {showServices && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              onClick={() => setShowServices(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 p-4"
            >
              {/* MOBITEL: FULL SCREEN, DESKTOP: MAX-W + CENTER */}
              <div className="w-full h-[95vh] md:w-full md:max-w-4xl md:mx-auto md:my-auto md:h-auto bg-gray-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl shadow-cyan-500/20 border border-white/20">
                
                {/* Header sa ZATVORI - VIDLJIV SVUDA */}
                <div className="p-4 sm:p-6 md:p-8 sm:border-b md:border-b border-white/10 flex items-center justify-between sticky top-0 bg-gray-900/50 backdrop-blur-sm z-10">
                  <h2 className="text-xl sm:text-2xl md:text-3xl md:text-4xl font-bold text-yellow-400 text-center flex-1">
                    {content.servicesTitle}
                  </h2>
                  <motion.button
                    onClick={() => setShowServices(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-4 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 shadow-lg hover:shadow-white/20 flex items-center justify-center text-xl font-bold text-gray-200 hover:text-white transition-all duration-200"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* NOVI KONTAKT BUTTON - VIDLJIV NA POČETKU */}
                {/* iPHONE-STYLE SERIOUS PREMIUM BUTTON */}
<div className="p-6 sm:p-8 border-b border-white/10 bg-white/5/70 dark:bg-gray-900/20 backdrop-blur-xl flex items-center justify-center">
  <motion.button
    onClick={() => {
      setShowContact(true);
      setShowServices(false);
    }}
    whileHover={{ 
      scale: 1.02, 
      backgroundColor: "rgba(255,255,255,0.15)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
    }}
    whileTap={{ scale: 0.98 }}
    className="group relative w-full max-w-sm px-6 py-4 rounded-2xl font-semibold text-lg text-white backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 bg-white/10 hover:bg-white/20 overflow-hidden"
  >
    {/* Subtle Shine */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
    
    <div className="flex items-center justify-center gap-3 relative z-10">
      <span className="tracking-wide font-semibold">{content.contactBtn}</span>
    </div>
  </motion.button>
</div>


                {/* Services grid - SCROLLABLE */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:px-8 md:px-10 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {currentServices.map((service, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-gray-700 transition-all duration-300 flex flex-col space-y-3 group hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 backdrop-blur-sm border border-white/10 cursor-default"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400 flex items-center gap-2 group-hover:text-yellow-300">
                          {service.emoji} {service.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* NOVI KONTAKT MODAL */}
       {/* IPHONE-STYLE CENTERED KONTAKT MODAL */}
{showContact && (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      onClick={() => setShowContact(false)}
    />
    
    {/* TOAST */}
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 bg-emerald-500/95 backdrop-blur-xl text-white text-lg font-semibold rounded-2xl shadow-2xl border border-emerald-400/50"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>

    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-sm mx-auto backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl shadow-black/30 border border-white/50 dark:border-gray-800/50 max-h-[85vh] overflow-hidden">
        
        {/* Drag Handle */}
        <div className="flex items-center justify-center py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="w-10 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-400 rounded-full shadow-sm" />
        </div>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-black dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">
                {content.contactTitle}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Copy ili otvori app
              </p>
            </div>
            <motion.button
              onClick={() => setShowContact(false)}
              whileTap={{ scale: 0.95, rotate: 90 }}
              className="w-11 h-11 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Contact Items - COPY + OPEN */}
        <div className="divide-y divide-gray-100/50 dark:divide-gray-800/50">
          
          {/* EMAIL */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl text-white font-semibold">✉️</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-base">Email</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{content.email}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                onClick={() => copyToClipboard(content.email, 'email')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg hover:shadow-emerald-500/50 transition-all duration-200"
              >
                Copy
              </motion.button>
              <motion.a
                href={`mailto:${content.email}`}
                className="w-14 py-3 px-4 rounded-xl bg-gray-500/20 hover:bg-gray-500/40 flex items-center justify-center text-white shadow-md hover:shadow-gray-500/30 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ↗️
              </motion.a>
            </div>
          </div>

          {/* VIBER */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl text-white font-semibold">📱</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-base">Viber</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{content.viber}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                onClick={() => copyToClipboard(content.viber, 'viber')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg hover:shadow-emerald-500/50 transition-all duration-200"
              >
                Copy
              </motion.button>
              <motion.a
                href={`viber://chat?number=${content.viber.replace(/\s+/g, '')}`}
                className="w-14 py-3 px-4 rounded-xl bg-gray-500/20 hover:bg-gray-500/40 flex items-center justify-center text-white shadow-md hover:shadow-gray-500/30 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ↗️
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
)}

        {/* CV Modal */}
        {showCV && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40"
              onClick={() => setShowCV(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 pointer-events-none max-w-full"
            >
              <div className="relative pointer-events-auto max-w-2xl w-full max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/90 backdrop-blur-xl p-4 sm:p-6">
                <motion.button
                  onClick={() => setShowCV(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 z-[60] w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 shadow-lg hover:shadow-white/20 flex items-center justify-center text-xl font-bold text-gray-200 hover:text-white transition-all duration-200"
                >
                  ✕
                </motion.button>

                <img
                  src="/cvslika.png"
                  alt="Harun Delić CV"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-inner shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
