'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useId } from "react";

export default function SlidingToast({
	ComponentContent,
	setVisible = () => { },
	bottomOrTop = 'bottom', // 'bottom' ou 'top'.
	pixelsBottomOrTop = 0, 
	duration = 18
}) {
	// useEffect(() => {
	// 	ComponentContent && setVisible(true);
	// 	!ComponentContent && setVisible(false);
	// }, [ComponentContent]);
	// console.warn('SlidingToast, ComponentContent: ', ComponentContent)
	return (
		<motion.div
			initial={{ y: '-100%', opacity: 0 }} // -100%
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: '-100%', opacity: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className={`fixed ${bottomOrTop}-${pixelsBottomOrTop} left-0 right-0 z-50 flex items-center justify-between w-full bg-gray-900 text-white p-3 shadow-xl border-b border-gray-800 overflow-hidden`}
		>
			<div className="flex items-center w-full overflow-hidden mr-4">
				<span className="flex-shrink-0 w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />

				{/* Container do Marquee */}
				<div className="relative flex overflow-x-hidden w-full">
					<motion.div
						animate={{ x: ['0%', '-50%'] }} // -50% para mover metade do conteúdo
						transition={{
							repeat: Infinity,
							repeatType: 'loop',
							duration: duration, // 18 segundos para percorrer todo o conteúdo é a velocidade padrão
							ease: 'linear',
						}}
						className="flex whitespace-nowrap font-mono text-sm shrink-0"
					>
						{/* Bloco 1 */}
						<div className="flex items-center pr-12 shrink-0">
							{ComponentContent}
						</div>

						{/* Bloco 2 (Duplicado necessário para preencher o rastro) */}
						<div className="flex items-center pr-12 shrink-0">
							{ComponentContent}
						</div>
					</motion.div>
				</div>
			</div>

			<button
				onClick={() => setVisible(false)}
				className="flex-shrink-0 text-gray-400 hover:text-white text-sm px-2 py-1 rounded cursor-pointer"
				aria-label="Fechar aviso"
			>
				✕
			</button>
		</motion.div>
	);
}