'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f172a]/80 to-[#1e3a8a]/80 backdrop-blur-md border-b border-blue-500/20 text-blue-300 px-12 py-4 flex justify-start items-center z-30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"> {/* z-30 umjesto z-50 */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="text-3xl md:text-4xl font-normal tracking-wide cursor-pointer hover:text-cyan-400 transition-all select-none drop-shadow-[0_2px_8px_rgba(0,255,255,0.4)]"
        style={{
          fontFamily: '"Great Vibes", cursive',
          letterSpacing: '0.8px',
        }}
      >
        <Link href="/">Harun Delić</Link>
      </motion.h1>
    </header>
  );
}
