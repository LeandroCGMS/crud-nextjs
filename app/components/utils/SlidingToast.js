'use client';

import { motion } from 'framer-motion';

export default function SlidingToast({ 
  ComponentContent = (
    <span>🚀 Servidor operando em 100% — Novas atualizações disponíveis!</span>
  ), 
  setIsVisible = () => {} 
}) {
  return (
    <motion.div
      // 1. Animação de entrada vindo de CIMA para BAIXO (eixo Y)
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // 2. Classes para fixar no topo com 100% de largura
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full bg-gray-900 text-white p-3 shadow-xl border-b border-gray-800 overflow-hidden"
    >
      {/* Container centralizado para conteúdo e indicador */}
      <div className="flex items-center w-full overflow-hidden mr-4">
        {/* Indicador visual / Ícone */}
        <span className="flex-shrink-0 w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />

        {/* Conteúdo com efeito Marquee (Texto passando continuamente) */}
        <div className="relative flex overflow-x-hidden w-full">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 18, // Aumentado ligeiramente para um texto mais longo em telas largas
              ease: 'linear',
            }}
            className="whitespace-nowrap font-mono text-sm"
          >
            {ComponentContent}
          </motion.div>
        </div>
      </div>

      {/* Botão para fechar */}
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 text-gray-400 hover:text-white text-sm px-2 py-1 rounded cursor-pointer"
        aria-label="Fechar aviso"
      >
        ✕
      </button>
    </motion.div>
  );
}