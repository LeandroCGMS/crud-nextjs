'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { copyFormattedText, clearClipboard } from './functions';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';

export default function SlidingToast({
	ComponentContent,
	setVisible = () => { },
	bottomOrTop = 'bottom',
	pixelsBottomOrTop = 0,
	speed = 150 // Velocidade em pixels por segundo (Ajuste conforme necessário: 40 a 80 é um bom intervalo)
}) {
	const contentRef = useRef(null);
	const [computedDuration, setComputedDuration] = useState(15); // Valor padrão inicial em segundos
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (contentRef.current) {
			// Mede a largura exata de um dos blocos de conteúdo em pixels
			const contentWidth = contentRef.current.offsetWidth;

			if (contentWidth > 0) {
				// Calcula a duração necessária para percorrer toda a largura na velocidade definida
				const calculatedDuration = contentWidth / speed;
				setComputedDuration(calculatedDuration);
			}
		}
	}, [ComponentContent, speed]);

	const positionClass = bottomOrTop === 'top' ? 'top-0' : 'bottom-0';

	return (
		<motion.div
			initial={{ y: bottomOrTop === 'top' ? '-100%' : '100%', opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: bottomOrTop === 'top' ? '-100%' : '100%', opacity: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			style={{
				[bottomOrTop]: `${pixelsBottomOrTop}px`
			}}
			className={`fixed ${positionClass} left-0 right-0 z-50 flex items-center justify-between w-full bg-gray-900 text-white p-3 shadow-xl border-b border-gray-800 overflow-hidden`}
		>
			<div className="flex items-center w-full max-w-full overflow-hidden left-4 right-4">
				<span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />
				<button className={`p-1 cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${copied ? 'text-green-500' : 'text-gray-400'}`} onClick={() => {
					setCopied(!copied)
					copied ? clearClipboard() : copyFormattedText(contentRef.current.innerHTML);
					copied ? toast.success('Texto removido da área de transferência!') : toast.success('Texto copiado para a área de transferência!')
				}} aria-label="Copiar texto">
					{copied ? <FiTrash2 color="red" size={20} /> : <FiCopy size={20} />}
				</button>

				{/* Container do Marquee */}
				<div className="relative flex overflow-x-hidden w-full">
					<motion.div
						key={computedDuration} // Força a redefinição suave da animação caso a largura mude
						animate={{ x: ['0%', '-50%'] }}
						transition={{
							repeat: Infinity,
							repeatType: 'loop',
							duration: computedDuration,
							ease: 'linear',
						}}
						className="flex whitespace-nowrap font-mono text-sm"
					>
						{/* Bloco 1 (Referenciado com useRef para medição) */}
						<div ref={contentRef} className="flex items-center pr-12 break-words gap-2">
							{ComponentContent}
						</div>

						{/* Bloco 2 (Duplicado necessário para o efeito infinito) */}
						<div className="flex items-center pr-12 break-words gap-2">
							{ComponentContent}
						</div>
					</motion.div>
				</div>
			</div>

			<button
				onClick={() => setVisible()}
				className="flex text-gray-400 hover:text-white text-sm px-2 py-1 rounded cursor-pointer"
				aria-label="Fechar aviso"
			>
				✕
			</button>
		</motion.div>
	);
}