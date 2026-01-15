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
  const [language, setLanguage] = useState('bs');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [preloaderProgress, setPreloaderProgress] = useState(0);

  // BOSANSKI sadržaj
  const bsContent = {
    words: ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'],
    welcome: 'Dobrodošao u moj digitalni svijet 🚀 Ja sam Harun, full-stack developer koji pretvara ideje u moderne web i mobilne aplikacije, gdje se dizajn i funkcionalnost susreću.',
    servicesBtn: '🚀 Usluge',
    cvBtn: '📄 Pogledaj CV',
    servicesTitle: '🌟 Usluge 🌟',
    servicesRequest: '✉️ Zatraži uslugu',
    servicesClose: '❌ Zatvori',
    cvClose: '❌ Zatvori',
    myServices: [
      {
        title: 'Izrada Web Stranica',
        description: 'Pravimo moderne web stranice koristeći Next.js, React ili Angular, sa fokusom na dizajn i performanse.',
        emoji: '🌐',
        gradient: 'from-indigo-500 to-purple-600',
        ring: 'ring-indigo-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za izradu web stranice')}&body=${encodeURIComponent('Zdravo Harune,\n\nŽelim da mi napraviš web stranicu. Možeš li mi reći više informacija o cijenama i procesu izrade?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'Razvoj Mobilnih Aplikacija',
        description: 'Razvijamo Android i iOS aplikacije koristeći Kotlin, Java ili React Native.',
        emoji: '📱',
        gradient: 'from-emerald-500 to-teal-600',
        ring: 'ring-emerald-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za razvoj mobilne aplikacije')}&body=${encodeURIComponent('Zdravo Harune,\n\nŽelim da mi napraviš mobilnu aplikaciju. Možeš li mi reći više informacija o cijenama i procesu izrade?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'Održavanje i Optimizacija',
        description: 'Održavanje web i mobilnih aplikacija, optimizacija performansi i sigurnosti.',
        emoji: '🛠️',
        gradient: 'from-orange-500 to-amber-600',
        ring: 'ring-orange-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za održavanje i optimizaciju')}&body=${encodeURIComponent('Zdravo Harune,\n\nZanima me održavanje i optimizacija moje aplikacije. Možeš li mi reći više informacija o cijenama i procesu?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'UI/UX Dizajn',
        description: 'Kreiranje modernih, responzivnih i privlačnih dizajna za web i mobilne aplikacije.',
        emoji: '🎨',
        gradient: 'from-pink-500 to-rose-600',
        ring: 'ring-pink-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za UI/UX dizajn')}&body=${encodeURIComponent('Zdravo Harune,\n\nZanima me UI/UX dizajn za moju aplikaciju. Možeš li mi reći više informacija o cijenama i procesu?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'Konsultacije i Savjeti',
        description: 'Savjeti i konsultacije u vezi tehnologija, arhitekture i izbora stacka za vaš projekt.',
        emoji: '💡',
        gradient: 'from-blue-500 to-cyan-600',
        ring: 'ring-blue-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za konsultacije')}&body=${encodeURIComponent('Zdravo Harune,\n\nZanima me konsultacija vezano za moj projekt. Možeš li mi reći više informacija?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
    ]
  };

  const enContent = {
    words: ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'],
    welcome: 'Welcome to my digital world 🚀 I am Harun, a full-stack developer who turns ideas into modern web and mobile applications where design meets functionality.',
    servicesBtn: '🚀 Services',
    cvBtn: '📄 View CV',
    servicesTitle: '🌟 Services 🌟',
    servicesRequest: '✉️ Request Service',
    servicesClose: '❌ Close',
    cvClose: '❌ Close',
    myServices: [
      {
        title: 'Website Development',
        description: 'We create modern websites using Next.js, React or Angular, with focus on design and performance.',
        emoji: '🌐',
        gradient: 'from-indigo-500 to-purple-600',
        ring: 'ring-indigo-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Website development request')}&body=${encodeURIComponent('Hello Harun,\n\nI want you to create a website for me. Can you tell me more about prices and development process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'Mobile App Development',
        description: 'We develop Android and iOS apps using Kotlin, Java or React Native.',
        emoji: '📱',
        gradient: 'from-emerald-500 to-teal-600',
        ring: 'ring-emerald-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Mobile app development request')}&body=${encodeURIComponent('Hello Harun,\n\nI want you to create a mobile app for me. Can you tell me more about prices and development process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'Maintenance & Optimization',
        description: 'Maintenance of web and mobile apps, performance and security optimization.',
        emoji: '🛠️',
        gradient: 'from-orange-500 to-amber-600',
        ring: 'ring-orange-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Maintenance & optimization request')}&body=${encodeURIComponent('Hello Harun,\n\nI am interested in maintenance and optimization of my application. Can you tell me more about prices and process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'UI/UX Design',
        description: 'Creating modern, responsive and attractive designs for web and mobile applications.',
        emoji: '🎨',
        gradient: 'from-pink-500 to-rose-600',
        ring: 'ring-pink-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('UI/UX design request')}&body=${encodeURIComponent('Hello Harun,\n\nI am interested in UI/UX design for my application. Can you tell me more about prices and process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'Consultations & Advice',
        description: 'Advice and consultations regarding technologies, architecture and stack selection for your project.',
        emoji: '💡',
        gradient: 'from-blue-500 to-cyan-600',
        ring: 'ring-blue-500/30',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Consultation request')}&body=${encodeURIComponent('Hello Harun,\n\nI am interested in consultation regarding my project. Can you tell me more information?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
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
    <div className="relative min-h-screen flex flex-col font-sans text-white overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
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
{/* Language toggle - NAJVIŠI Z-INDEX! */}
{isLoaded && (
  <div className="fixed top-4 right-4 z-[999] px-4 pt-4 flex items-start gap-2 pointer-events-auto">
    <div
      className="w-28 h-14 sm:w-32 sm:h-16 bg-gray-900/95 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl shadow-black/70 border-2 sm:border-4 border-white/30 backdrop-blur-2xl relative overflow-hidden group hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-400 hover:scale-105 cursor-pointer select-none touch-manipulation"
      onClick={toggleLanguage}
    >
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-1.5 w-12 h-12 sm:w-14 sm:h-14 sm:left-2 rounded-2xl sm:rounded-3xl shadow-2xl sm:shadow-3xl shadow-gray-500/70 backdrop-blur-2xl border-2 sm:border-4 flex items-center justify-center drop-shadow-2xl ring-2 sm:ring-4 ring-white/40 z-[1000]"
        animate={{
          background:
            language === 'bs'
              ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
              : 'linear-gradient(135deg, #fde68a 0%, #eab308 100%)',
          borderColor: language === 'bs' ? '#1d4ed8' : '#d97706',
          boxShadow:
            language === 'bs'
              ? '0 0 40px rgba(59,130,246,0.9), inset 0 0 20px rgba(255,255,255,0.5)'
              : '0 0 40px rgba(234,179,8,0.9), inset 0 0 20px rgba(255,255,255,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 28 }}
        whileHover={{ scale: 1.1 }}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={language === 'bs' ? '/bosna.png' : '/engleska.png'}
          alt={language === 'bs' ? 'Bosanski' : 'English'}
          className={`w-6 h-4 sm:w-8 sm:h-5 rounded-lg shadow-md overflow-hidden border object-cover ${
            language === 'bs' ? 'border-blue-400/70' : 'border-yellow-400/70'
          }`}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.src =
              language === 'bs'
                ? 'https://flagcdn.com/24x18/ba.png'
                : 'https://flagcdn.com/24x18/gb.png';
          }}
        />
      </motion.div>
    </div>
  </div>
)}


      {/* FULLSCREEN Canvas */}
      <div className={`absolute inset-0 w-full h-screen z-0 pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
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
        className={`flex-grow flex flex-col justify-center items-center text-center p-4 sm:p-8 relative z-10 space-y-6 sm:space-y-8 ${showServices || showCV ? 'blur-sm' : ''} transition-all duration-500 ${isFullyLoaded ? 'opacity-100' : 'opacity-0'}`}
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
    {/* UKLONI wrapper div - NIJE POTREBAN! */}
    {skills.map((skill, i) => {
      const angleRad = (i / skills.length) * 2 * Math.PI; // 0 do 2π radijana
      
      return (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-xl sm:text-2xl md:text-3xl drop-shadow-[0_0_15px_cyan] pointer-events-none"
          style={{ 
            // **Ovo je ključ - BEZ ROTATE, SAMO TRANSLATE!**
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
        {/* Services Modal */}
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
              className="fixed inset-0 flex justify-center items-center z-50 p-4 sm:px-6 overflow-auto bg-black/90"
            >
              <div className="bg-gray-900 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 text-white shadow-2xl shadow-cyan-500/20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-6 sm:mb-8">
                  {content.servicesTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {currentServices.map((service, index) => (
                    <motion.a
                      key={index}
                      href={service.emailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-700 transition-all duration-300 flex flex-col space-y-3 group hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2 touch-manipulation backdrop-blur-sm border border-white/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2 group-hover:text-yellow-300 transition-colors">
                        {service.emoji} {service.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{service.description}</p>
                      <span className="mt-auto self-start px-3 sm:px-4 py-2 bg-cyan-500 text-black font-semibold rounded-full text-xs sm:text-sm hover:bg-cyan-600 transition-all duration-300 group-hover:scale-105 shadow-lg">
                        {content.servicesRequest}
                      </span>
                    </motion.a>
                  ))}
                </div>
                <div className="flex justify-center mt-6 sm:mt-8">
                  <motion.button
                    onClick={() => setShowServices(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 bg-red-600 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 text-sm sm:text-base min-w-[120px]"
                  >
                    {content.servicesClose}
                  </motion.button>
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-semibold shadow-lg transition-all duration-200 hover:shadow-red-500/50 text-xs sm:text-sm"
                >
                  {content.cvClose}
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
