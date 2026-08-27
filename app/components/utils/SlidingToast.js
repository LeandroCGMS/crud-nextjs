'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SlidingToast({ text: string = `🚀 Servidor operando em 100% — Novas atualizações disponíveis!`, setIsVisible = new Function()}) {

  return (
    <motion.div
      // Animação de entrada deslizando da esquerda para a direita
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-5 left-5 z-50 flex items-center w-80 max-w-full bg-gray-900 text-white rounded-lg p-3 shadow-xl border border-gray-800 overflow-hidden"
    >
      {/* Indicador visual / Ícone */}
      <span className="flex-shrink-0 w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />

      {/* Conteúdo com efeito Marquee (Texto passando continuamente) */}
      <div className="relative flex overflow-x-hidden w-full mr-2">
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 8,
            ease: 'linear',
          }}
          className="whitespace-nowrap font-mono text-sm"
        >
          {text}
        </motion.div>
      </div>

      {/* Botão para fechar */}
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-400 hover:text-white text-xs px-1"
      >
        ✕
      </button>
    </motion.div>
  );
}