'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeadlineTickerProps {
  headlines: string[];
  position?: 'top' | 'bottom';
  offset?: number; // Distância em pixels
}

export default function HeadlineTicker({
  headlines,
  position = 'top',
  offset = 125,
}: HeadlineTickerProps) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!headlines.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [headlines]);

  if (!headlines.length || !isVisible) return null;

  // Define o estilo de posicionamento vertical fixo/absoluto
  const positionStyle = {
    [position]: `${offset}px`,
  };

  return (
    <div
      style={positionStyle}
      className="fixed left-1/2 -translate-x-1/2 z-50 h-10 w-full max-w-2xl overflow-hidden flex items-center justify-between bg-zinc-900/90 backdrop-blur-md px-4 rounded-lg border border-zinc-800 text-zinc-100 shadow-xl"
    >
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 1, ease: 'easeInOut' }} // 0.5, valor padrão
            className="text-sm font-medium truncate w-full pr-4"
          >
            {headlines[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Botão de Fechar */}
      <button
        onClick={() => setIsVisible(false)}
        className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 rounded-md hover:bg-zinc-800 focus:outline-none cursor-pointer"
        aria-label="Fechar manchetes"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}