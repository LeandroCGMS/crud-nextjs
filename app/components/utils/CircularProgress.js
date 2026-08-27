'use client';

import React from 'react';

export default function CircularProgress({ 
  size = 40,          // Tamanho do spinner em pixels
  strokeWidth = 4,    // Espessura da linha
  progress = null,    // Se omitido, vira um Spinner infinito. Se passar de 0 a 100, vira barra de progresso.
  className = ""      // Permite passar cores do Tailwind (ex: "text-violet-600")
}) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  // Calcula o preenchimento caso o progresso seja informado (0 - 100)
  const offset = progress !== null 
    ? circumference - (progress / 100) * circumference 
    : 0;

  return (
    <div 
      className={`inline-flex items-center justify-center relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        width={size} 
        height={size} 
        className={`transform -rotate-90 ${progress === null ? 'animate-spin' : ''}`}
      >
        {/* Círculo de Fundo (Trilho) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-20"
          fill="transparent"
        />

        {/* Círculo de Progresso / Spinner */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress === null ? circumference * 0.25 : offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Exibe a porcentagem no centro (opcional, só quando há progresso definido e tamanho >= 48px) */}
      {progress !== null && size >= 48 && (
        <span className="absolute text-xs font-semibold text-gray-700 dark:text-gray-200">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}