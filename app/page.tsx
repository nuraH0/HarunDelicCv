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
  const [showServices, setShowServices] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [showContact, setShowContact] = useState(false);
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
      setToast('Press long to copy');
    }
    setTimeout(() => setToast(''), 2500);
  };

  // BOSANSKI sadržaj
  const bsContent = {
    welcome: 'Dobrodošao u moj digitalni svijet 🚀 Ja sam Harun, full-stack developer koji pretvara ideje u moderne web i mobilne aplikacije, gdje se dizajn i funkcionalnost susreću.',
    servicesBtn: '🚀 Usluge',
    cvBtn: '📄 Pogledaj CV',
    servicesTitle: '🌟 Usluge 🌟',
    contactTitle: '📞 Kontakt',
    contactBtn: '📞 Kontaktiraj me',
    email: 'harun.delic01@gmail.com',
    viber: '+387 61 622 101',
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
    welcome: 'Welcome to my digital world 🚀 I am Harun, a full-stack developer who turns ideas into modern web and mobile applications where design meets functionality.',
    servicesBtn: '🚀 Services',
    cvBtn: '📄 View CV',
    servicesTitle: '🌟 Services 🌟',
    contactTitle: '📞 Contact Me',
    contactBtn: '📞 Contact Me',
    email: 'harun.delic01@gmail.com',
    viber: '+387 61 622 101',
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
  }, []);

  // Premium loading effects
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setPreloaderProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 5;
      });
    }, 80);

    const timer1 = setTimeout(() => setIsLoaded(true), 1200);
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

  const radius = 90;

  const StarsParticles = () => {
    const meshRef = useRef<THREE.Points>(null);
    const cometRef = useRef<THREE.Points>(null);

    const stars = useMemo(() => {
      const temp: number[][] = [];
      for (let i = 0; i < 1500; i++) {
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
      for (let i = 0; i < 8; i++) {
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
          <pointsMaterial size={0.4} color="#ffffff" sizeAttenuation transparent opacity={0.5} />
        </points>

        <points ref={cometRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(comet.flat()), 3]} />
          </bufferGeometry>
          <pointsMaterial size={2} color="#00ffff" transparent opacity={0.7} />
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
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  } as const;

  const itemVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      scale: 0.85
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
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
        stiffness: 120,
        damping: 14
      }
    }
  } as const;

  return (
    <div className="relative min-h-screen flex flex-col font-['SFProDisplay'] text-white bg-gradient-to-br from-slate-900 via-black to-slate-900/90 overflow-hidden">
      {/* IPHONE-STYLE PREMIUM PRELOADER */}
      <AnimatePresence>
        {!isFullyLoaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-black to-slate-900/90 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Minimal iPhone-style logo */}
            <motion.div
              className="w-20 h-20 mb-8 relative"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 180, 360],
                borderRadius: ["25%", "50%", "25%"]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                borderRadius: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-cyan-400/90 via-blue-400/90 to-indigo-500/90 rounded-full shadow-[0_0_60px_rgba(34,197,94,0.6)] border-2 border-white/20" />
            </motion.div>

            {/* iPhone-style progress */}
            <div className="w-full max-w-xs mb-6">
              <div className="w-full bg-white/5 rounded-full h-2 relative overflow-hidden shadow-inner border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${preloaderProgress}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 animate-[shimmer_1.5s_infinite]" />
                </motion.div>
              </div>
              <motion.div
                className="text-center mt-2 font-mono text-xs text-emerald-400/80 tracking-wider"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(preloaderProgress)}%
              </motion.div>
            </div>

            {/* Clean loading text */}
            <motion.div
              className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight"
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Loading Portfolio...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iPhone-style language switcher */}
     {isLoaded && !showServices && !showCV && !showContact && (
  <div className="fixed top-5 right-5 z-[9999] pointer-events-auto">
    <div
      className="w-[90px] h-[46px] bg-slate-900/98 backdrop-blur-3xl rounded-2xl p-[4px] shadow-2xl border border-white/30 relative cursor-pointer group hover:shadow-emerald-500/40 overflow-hidden select-none"
      onClick={toggleLanguage}
    >
      {/* KRUG SE POMIČE - ALI OSTAJE FIXED NA EKRANU */}
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
      
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent/50 to-white/20 h-[2px] top-[50%] -translate-y-1/2 rounded-full" />
    </div>
  </div>
)}


      {/* Optimized Canvas for mobile */}
      <div className={`absolute inset-0 w-full h-screen z-10 pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <Canvas
          camera={{ position: [0, 0, 50], fov: 85 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: true
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.3} />
          <StarsParticles />
        </Canvas>
      </div>

      {/* IPHONE-OPTIMIZED MAIN CONTENT */}
      <motion.main
        className={`h-screen flex flex-col justify-center items-center text-center px-5 py-12 relative z-20 space-y-6 ${showServices || showCV || showContact ? 'blur-sm' : ''} transition-all duration-500 ${isFullyLoaded ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
        variants={containerVariants}
        initial="hidden"
        animate={isFullyLoaded ? "visible" : "hidden"}
      >
        {/* Perfect iPhone-sized profile */}
        <motion.div
          className="relative w-28 h-28"
          variants={itemVariants}
        >
          {/* Orbit skills - iPhone optimized */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-0"
          >
            {skills.map((skill, i) => {
              const angleRad = (i / skills.length) * 2 * Math.PI;
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-10 h-10 flex items-center justify-center text-lg drop-shadow-[0_0_12px_rgba(34,197,94,0.6)] pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${radius * 0.6 * Math.cos(angleRad)}px, ${radius * 0.6 * Math.sin(angleRad)}px)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, duration: 0.6 }}
                >
                  {skill.icon}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Profile image - perfect iPhone size */}
          <motion.div
  variants={profileVariants}
  className="absolute inset-0 flex items-center justify-center w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-400/50 shadow-2xl shadow-emerald-500/30 z-20"
>
  <motion.img
    src="/slikamoja.jpg"
    alt="Harun Delić"
    className="w-full h-full **rounded-full** object-cover scale-[1.08] hover:scale-100 transition-all duration-500 ease-out"
    loading="lazy"
    initial={{ filter: 'blur(15px)' }}
    animate={{ filter: 'blur(0px)' }}
    transition={{ duration: 1.2, delay: 1.5 }}
  />
</motion.div>
        </motion.div>

        {/* Name - iPhone typography */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-2 tracking-tight"
          style={{ fontFamily: '"SFProDisplay", -apple-system, sans-serif' }}
        >
          Harun Delić
        </motion.h1>

        {/* Welcome text - iPhone card style */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-2xl bg-white/4 border border-white/15 rounded-2xl px-6 py-5 max-w-[90vw] text-sm leading-relaxed shadow-2xl shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all duration-400"
        >
          {content.welcome}
        </motion.div>

        {/* Main Contact Button - iPhone prominent */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-xs"
        >
          <motion.button
            onClick={() => setShowContact(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full px-6 py-4 rounded-2xl font-semibold text-base text-white backdrop-blur-xl border-2 border-emerald-400/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 hover:border-emerald-400/80 transition-all duration-300 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-blue-500/20 hover:from-emerald-500/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent w-0 h-full group-hover:w-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
            <div className="flex items-center justify-center gap-2 relative z-10">
              <span>{content.contactBtn}</span>
            </div>
          </motion.button>
        </motion.div>

        {/* CTA Buttons - Perfect iPhone spacing */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 w-full max-w-xs px-2"
        >
          <motion.button
            onClick={() => setShowServices(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-2xl border-2 border-emerald-400/30 text-emerald-300 font-semibold hover:border-emerald-400/60 hover:text-emerald-200 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 backdrop-blur-md bg-white/5 hover:bg-white/10 text-sm"
          >
            {content.servicesBtn}
          </motion.button>

          <motion.button
            onClick={() => setShowCV(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-2xl border-2 border-cyan-400/60 text-cyan-300 font-semibold hover:border-cyan-400 hover:text-cyan-200 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 backdrop-blur-md bg-white/5 hover:bg-white/10 text-sm flex items-center justify-center"
          >
            {content.cvBtn}
          </motion.button>
        </motion.div>
      </motion.main>

      {/* MODALS - IPHONE OPTIMIZED */}
      <AnimatePresence>
        {/* TOAST - iPhone style */}
        {toast && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 bg-emerald-500/95 backdrop-blur-2xl text-white text-base font-semibold rounded-2xl shadow-2xl border border-emerald-400/60"
          >
            {toast}
          </motion.div>
        )}

        {/* Services Modal - iPhone Sheet Style */}
        {/* STAGGERED CARDS - ODOZGORE PREMA DOLE */}
{showServices && (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-40"
      onClick={() => setShowServices(false)}
    />
    
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col"
    >
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto backdrop-blur-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-blue-900/40 shadow-2xl shadow-blue-900/30 rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
          
          {/* Sticky Header */}
          <div className="px-6 py-6 border-b border-blue-900/30 sticky top-0 bg-slate-900/50 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-semibold text-blue-300 tracking-tight flex-1 text-center">
                {content.servicesTitle}
              </h2>
              <motion.button
                onClick={() => setShowServices(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700 rounded-2xl border border-blue-800/50 shadow-lg flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 ml-4 backdrop-blur-sm"
              >
                ✕
              </motion.button>
            </div>
          </div>

          {/* SMANJENE KOCKICE + HIDDEN SCROLLBAR */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide overscroll-contain px-6 pb-12 pt-6 sm:pt-8">
            <div className="space-y-5">
              {currentServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    scale: 0.95 
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1 
                  }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="group p-5 **sm:p-6** rounded-xl bg-slate-800/50 border border-blue-900/30 hover:border-blue-700/60 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300 cursor-default backdrop-blur-sm **min-h-[110px] sm:min-h-[120px]**"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="**w-12 h-12 sm:w-14 sm:h-14** bg-blue-900/50 rounded-xl flex items-center justify-center border border-blue-700/50 shrink-0 **group-hover:bg-blue-800/70 group-hover:border-blue-600/70 flex-shrink-0">
                      <span className="**text-2xl sm:text-3xl**">{service.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-semibold text-slate-200 **text-lg sm:text-xl** tracking-tight mb-2 **sm:mb-3** group-hover:text-blue-300">
                        {service.title}
                      </h3>
                      <p className="text-sm **sm:text-base** text-slate-400 leading-relaxed group-hover:text-slate-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
)}


        {/* MAX IPHONE-STYLE KONTAKT - CENTERED + MINIMAL */}
        {showContact && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50"
              onClick={() => setShowContact(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-[60] flex items-center justify-center px-4 sm:px-6 pt-safe-8 pb-safe-8 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-md backdrop-blur-3xl bg-gradient-to-b from-slate-900/98 to-slate-950/98 border border-blue-900/50 shadow-2xl shadow-blue-900/40 rounded-3xl max-h-[90vh] overflow-hidden">
                
                {/* iPhone Drag Handle */}
                <div className="flex items-center justify-center py-4 bg-slate-800/95 border-b border-blue-900/40">
                  <div className="w-11 h-1.5 bg-blue-500/70 rounded-full shadow-sm" />
                </div>

                {/* Clean Minimal Header */}
                <div className="px-6 pb-5 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-2xl font-semibold text-slate-100 tracking-tight">
                      {content.contactTitle}
                    </h3>
                    <motion.button
                      onClick={() => setShowContact(false)}
                      whileTap={{ scale: 0.98 }}
                      className="w-10 h-10 rounded-xl bg-slate-800/90 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700 shadow-md border border-slate-700/50 transition-all duration-150 backdrop-blur-sm"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium tracking-wider uppercase opacity-80">Copy or open</p>
                </div>

                {/* Perfect iPhone Cards */}
                <div className="divide-y divide-slate-800/50">
                  
                  {/* EMAIL - iPhone Card */}
                  <div className="p-6 hover:bg-slate-850/50 transition-colors duration-150">
                    <div className="flex items-center gap-4 mb-4 pb-1">
                      <div className="w-11 h-11 bg-blue-900/60 rounded-xl flex items-center justify-center border border-blue-800/60 shrink-0 backdrop-blur-sm">
                        <span className="text-lg">✉️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-200 text-sm tracking-tight mb-0.5">Email</p>
                        <p className="text-xs text-slate-400 font-mono break-all leading-tight">{content.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 pt-0.5">
                      <motion.button
                        onClick={() => copyToClipboard(content.email, 'email')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600/95 hover:bg-blue-700/95 text-white font-semibold text-sm shadow-lg hover:shadow-blue-600/30 transition-all duration-150 border border-blue-500/50 backdrop-blur-sm"
                      >
                        Copy
                      </motion.button>
                      <motion.a
                        href={`mailto:${content.email}`}
                        className="w-12 py-3.5 flex items-center justify-center rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 shadow-md hover:shadow-lg transition-all duration-150 border border-slate-700/50 backdrop-blur-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        ↗️
                      </motion.a>
                    </div>
                  </div>

                  {/* VIBER - iPhone Card */}
                  <div className="p-6 hover:bg-slate-850/50 transition-colors duration-150">
                    <div className="flex items-center gap-4 mb-4 pb-1">
                      <div className="w-11 h-11 bg-blue-900/60 rounded-xl flex items-center justify-center border border-blue-800/60 shrink-0 backdrop-blur-sm">
                        <span className="text-lg">📱</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-200 text-sm tracking-tight mb-0.5">Viber</p>
                        <p className="text-xs text-slate-400 font-mono break-all leading-tight">{content.viber}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 pt-0.5">
                      <motion.button
                        onClick={() => copyToClipboard(content.viber, 'viber')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600/95 hover:bg-blue-700/95 text-white font-semibold text-sm shadow-lg hover:shadow-blue-600/30 transition-all duration-150 border border-blue-500/50 backdrop-blur-sm"
                      >
                        Copy
                      </motion.button>
                      <motion.a
                        href={`viber://chat?number=${content.viber.replace(/\s+/g, '')}`}
                        className="w-12 py-3.5 flex items-center justify-center rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 shadow-md hover:shadow-lg transition-all duration-150 border border-slate-700/50 backdrop-blur-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
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


    {/* PERFECT MOBILE CV MODAL - IPHONE OPTIMIZED */}
{showCV && (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-40"
      onClick={() => setShowCV(false)}
    />
    
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-safe-12 pb-safe-12 pointer-events-none"
    >
      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[90vh] backdrop-blur-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-blue-900/40 shadow-2xl shadow-blue-900/40 rounded-3xl overflow-hidden">
        
        {/* Close Button - iPhone Style */}
        <motion.button
          onClick={() => setShowCV(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-5 right-5 z-[60] w-12 h-12 bg-slate-800/90 hover:bg-slate-700 rounded-2xl border border-blue-800/50 shadow-xl hover:shadow-blue-900/50 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
        >
          ✕
        </motion.button>

        {/* Drag Handle */}
        <div className="flex items-center justify-center py-4 bg-slate-800/95 border-b border-blue-900/40 absolute top-0 left-0 right-0 z-20">
          <div className="w-12 h-1.5 bg-blue-500/70 rounded-full shadow-sm" />
        </div>

        {/* Responsive CV Image */}
        <div className="pt-12 px-4 pb-8 max-h-[90vh] flex items-center justify-center">
          <img
            src="/cvslika.png"
            alt="Harun Delić CV"
            className="w-full h-auto max-w-full max-h-full object-contain rounded-2xl shadow-2xl shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300"
            loading="lazy"
          />
        </div>

        {/* Bottom Shadow Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950/95 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  </>
)}
      </AnimatePresence>
    </div>
  );
}
