'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { useState, useEffect, useRef, useMemo } from 'react';
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
  const [language, setLanguage] = useState('bs'); // 'bs' ili 'en'

  // BOSANSKI sadržaj
  const bsContent = {
    words: ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'],
    welcome: 'Dobrodošao u moj digitalni univerzum 🚀 Ja sam Harun, full-stack developer koji pretvara ideje u moderne web i mobilne aplikacije, gdje se dizajn i funkcionalnost susreću.',
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
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za izradu web stranice')}&body=${encodeURIComponent('Zdravo Harune,\n\nŽelim da mi napraviš web stranicu. Možeš li mi reći više informacija o cijenama i procesu izrade?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'Razvoj Mobilnih Aplikacija',
        description: 'Razvijamo Android i iOS aplikacije koristeći Kotlin, Java ili React Native.',
        emoji: '📱',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za razvoj mobilne aplikacije')}&body=${encodeURIComponent('Zdravo Harune,\n\nŽelim da mi napraviš mobilnu aplikaciju. Možeš li mi reći više informacija o cijenama i procesu izrade?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'Održavanje i Optimizacija',
        description: 'Održavanje web i mobilnih aplikacija, optimizacija performansi i sigurnosti.',
        emoji: '🛠️',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za održavanje i optimizaciju')}&body=${encodeURIComponent('Zdravo Harune,\n\nZanima me održavanje i optimizacija moje aplikacije. Možeš li mi reći više informacija o cijenama i procesu?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'UI/UX Dizajn',
        description: 'Kreiranje modernih, responzivnih i privlačnih dizajna za web i mobilne aplikacije.',
        emoji: '🎨',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za UI/UX dizajn')}&body=${encodeURIComponent('Zdravo Harune,\n\nZanima me UI/UX dizajn za moju aplikaciju. Možeš li mi reći više informacija o cijenama i procesu?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
      {
        title: 'Konsultacije i Savjeti',
        description: 'Savjeti i konsultacije u vezi tehnologija, arhitekture i izbora stacka za vaš projekt.',
        emoji: '💡',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Zahtjev za konsultacije')}&body=${encodeURIComponent('Zdravo Harune,\n\nZanima me konsultacija vezano za moj projekt. Možeš li mi reći više informacija?\n\nHvala!\n\nPozdrav,\n[Upiši svoje ime]')}`
      },
    ]
  };

  // ENGLESKI sadržaj
  const enContent = {
    words: ['👨‍💻 Web Developer', '📱 Mobile Developer', '🧩 Problem Solver'],
    welcome: 'Welcome to my digital universe 🚀 I am Harun, a full-stack developer who turns ideas into modern web and mobile applications where design meets functionality.',
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
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Website development request')}&body=${encodeURIComponent('Hello Harun,\n\nI want you to create a website for me. Can you tell me more about prices and development process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'Mobile App Development',
        description: 'We develop Android and iOS apps using Kotlin, Java or React Native.',
        emoji: '📱',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Mobile app development request')}&body=${encodeURIComponent('Hello Harun,\n\nI want you to create a mobile app for me. Can you tell me more about prices and development process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'Maintenance & Optimization',
        description: 'Maintenance of web and mobile apps, performance and security optimization.',
        emoji: '🛠️',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Maintenance & optimization request')}&body=${encodeURIComponent('Hello Harun,\n\nI am interested in maintenance and optimization of my application. Can you tell me more about prices and process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'UI/UX Design',
        description: 'Creating modern, responsive and attractive designs for web and mobile applications.',
        emoji: '🎨',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('UI/UX design request')}&body=${encodeURIComponent('Hello Harun,\n\nI am interested in UI/UX design for my application. Can you tell me more about prices and process?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
      {
        title: 'Consultations & Advice',
        description: 'Advice and consultations regarding technologies, architecture and stack selection for your project.',
        emoji: '💡',
        emailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=harun.delic01@gmail.com&su=${encodeURIComponent('Consultation request')}&body=${encodeURIComponent('Hello Harun,\n\nI am interested in consultation regarding my project. Can you tell me more information?\n\nThank you!\n\nBest regards,\n[Enter your name]')}`
      },
    ]
  };

  // Trenutni sadržaj ovisno o jeziku
  const content = language === 'bs' ? bsContent : enContent;
  const currentServices = content.myServices;

  // Toggle jezik
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bs' ? 'en' : 'bs');
    setIndex(0); // Reset rotacije
    setCurrentWord(content.words[0]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [content.words]);

  useEffect(() => {
    setCurrentWord(content.words[index % content.words.length]);
  }, [index, content.words]);

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
      for (let i = 0; i < 4000; i++) {
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
      for (let i = 0; i < 15; i++) {
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
        meshRef.current.rotation.y += 0.0008;
        meshRef.current.rotation.x += 0.0005;
      }
      if (cometRef.current) {
        const positions = cometRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] -= 10;
          positions[i + 1] -= 4;
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
          <pointsMaterial size={0.7} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
        </points>

        <points ref={cometRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(comet.flat()), 3]} />
          </bufferGeometry>
          <pointsMaterial size={4} color="#00ffff" transparent opacity={0.9} />
        </points>
      </>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white overflow-hidden bg-black">
      <Header />


{/* UMBJEST postojećeg buttona u Home komponenti - SAMO OVO KOPIRAJ */}
<div className="fixed top-20 right-4 z-[70] pt-4 pr-4">
  {/* Language toggle */}
  <div
    className="w-32 h-16 bg-gradient-to-r from-gray-900/95 via-gray-800/80 to-black/90 rounded-3xl p-2 shadow-2xl shadow-black/80 border-4 border-white/20 backdrop-blur-3xl relative overflow-hidden group hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-[1.03] cursor-pointer select-none ring-2 ring-white/10 hover:ring-cyan-400/50"
    onClick={toggleLanguage}
  >
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-3xl shadow-3xl shadow-gray-500/60 backdrop-blur-3xl border-[3px] flex items-center justify-center drop-shadow-2xl ring-4 ring-white/50 z-10 hover:ring-cyan-300/70"
      layout
      animate={{
        left: language === 'bs' ? '3px' : 'calc(100% - 55px)',
        background:
          language === 'bs'
            ? 'linear-gradient(145deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)'
            : 'linear-gradient(145deg, #fde68a 0%, #eab308 50%, #d97706 100%)',
        borderColor: language === 'bs' ? '#1e40af' : '#b45309',
        boxShadow:
          language === 'bs'
            ? '0 0 50px rgba(59,130,246,1), 0 0 100px rgba(59,130,246,0.4), inset 0 0 25px rgba(255,255,255,0.6)'
            : '0 0 50px rgba(234,179,8,1), 0 0 100px rgba(234,179,8,0.4), inset 0 0 25px rgba(255,255,255,0.6)',
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 800, 
        damping: 25,
        background: { duration: 0.4 }
      }}
      whileHover={{ 
        scale: 1.12,
        rotate: 5 
      }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={language === 'bs' ? '/bosna.png' : '/engleska.png'}
        alt={language === 'bs' ? 'Bosanski' : 'English'}
        className={`w-9 h-6 rounded-xl shadow-lg overflow-hidden border-[2px] object-cover transition-all duration-300 hover:shadow-cyan-400/50 ${
          language === 'bs' 
            ? 'border-blue-300/80 shadow-blue-400/60 hover:shadow-blue-500/80' 
            : 'border-yellow-300/80 shadow-yellow-400/60 hover:shadow-yellow-500/80'
        }`}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.target as HTMLImageElement;
          target.src =
            language === 'bs'
              ? 'https://flagcdn.com/28x21/ba.png'
              : 'https://flagcdn.com/28x21/gb.png';
        }}
      />
    </motion.div>
  </div>
</div>




      {/* FULLSCREEN Canvas */}
      <div className="absolute inset-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <StarsParticles />
        </Canvas>
      </div>

      {/* MAIN CONTENT */}
      <main className={`flex-grow flex flex-col justify-center items-center text-center p-8 relative z-10 space-y-8 ${showServices || showCV ? 'blur-sm' : ''} transition-all duration-500`}>
        {/* Orbit ikone */}
        <div className="relative w-56 h-56">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
            className="absolute inset-0"
          >
            {skills.map((skill, i) => {
              const angle = (360 / skills.length) * i;
              const rad = (angle * Math.PI) / 180;
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 text-3xl drop-shadow-[0_0_15px_cyan]"
                  style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                  title={skill.name}
                >
                  {skill.icon}
                </div>
              );
            })}
          </motion.div>

          {/* Profilna slika */}
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: 'spring', stiffness: 90 }}
            className="w-56 h-56 rounded-full overflow-hidden border-4 border-cyan-500 shadow-[0_0_60px_#06b6d4aa] relative"
          >
            <img
              src="/slikamoja.jpg"
              alt="Harun Delić"
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-cyan-400/10 blur-2xl animate-pulse"></div>
          </motion.div>
        </div>

        {/* Ime */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
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
            className="text-3xl text-cyan-300 font-semibold tracking-wide"
          >
            {currentWord}
          </motion.p>
        </AnimatePresence>

        {/* Glass opis */}
        <motion.div
          key={`welcome-${language}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-12 py-6 max-w-xl text-gray-300"
        >
          {content.welcome}
        </motion.div>

        {/* CTA */}
        <div className="flex gap-6 mt-8 flex-wrap justify-center">
          <motion.button
            onClick={() => setShowServices(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full border border-transparent text-cyan-300 font-semibold hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            {content.servicesBtn}
          </motion.button>

          <motion.button
            onClick={() => setShowCV(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 font-semibold flex items-center gap-2 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            {content.cvBtn}
          </motion.button>
        </div>
      </main>

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
              className="fixed inset-0 flex justify-center items-center z-50 px-6 overflow-auto bg-black/90"
            >
              <div className="bg-gray-900 rounded-3xl max-w-5xl w-full p-10 space-y-8 text-white">
                <h2 className="text-4xl font-bold text-yellow-400 text-center mb-8">
                  {content.servicesTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentServices.map((service, index) => (
                    <motion.a
                      key={index}
                      href={service.emailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-6 rounded-2xl cursor-pointer hover:bg-gray-700 transition-all duration-300 flex flex-col space-y-3 group hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-2xl font-semibold text-yellow-400 flex items-center gap-2 group-hover:text-yellow-300 transition-colors">
                        {service.emoji} {service.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed">{service.description}</p>
                      <span className="mt-auto self-start px-4 py-2 bg-cyan-500 text-black font-semibold rounded-full text-sm hover:bg-cyan-600 transition-all duration-300 group-hover:scale-105 shadow-lg">
                        {content.servicesRequest}
                      </span>
                    </motion.a>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <motion.button
                    onClick={() => setShowServices(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-red-600 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
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
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed inset-0 z-50 flex justify-center items-center p-4 pointer-events-none"
            >
              <div className="relative pointer-events-auto max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/90 backdrop-blur-xl p-6">
                <motion.button
                  onClick={() => setShowCV(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 font-semibold shadow-lg transition-all duration-200 hover:shadow-red-500/50"
                >
                  {content.cvClose}
                </motion.button>
                <img
                  src="/cvslika.png"
                  alt="Harun Delić CV"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-inner shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
