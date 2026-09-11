import React, { forwardRef, memo, useState, useRef } from 'react';
import { copyFormattedText, clearClipboard } from './functions';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';

const NewsPrintLayout = memo(forwardRef(function NewsPrintLayout({ apiData }, ref) {
	const [copied, setCopied] = useState(false);
	const contentRef = useRef(null);
	// Trata casos em que apiData ainda não está pronto ou não possui articles
	const articles = apiData?.articles || [];
	// Função auxiliar para formatar a data
	const formatDate = (isoString) => {
		if (!isoString) return '';
		const date = new Date(isoString);
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		/* 
		  1. 'hidden': oculta a div na tela normal.
		  2. 'print:block': faz a div aparecer quando acionada a impressão (Ctrl+P / window.print()).
		  Se você apenas quiser copiar o HTML via DOM, a div oculta com 'hidden' já cumpre o papel.
		*/
		<div ref={contentRef} id="print-news-container" className="print:block print:p-0 p-6 bg-gray-50 text-gray-900 rounded-lg">
			<button
				className={`p-1 cursor-pointer p-2 rounded-lg hover:bg-gray-700 bg-black mb-2 ${copied ? 'text-green-500' : 'text-gray-400'}`}
				onClick={() => {
					setCopied(!copied);
					copied ? clearClipboard() : copyFormattedText(contentRef?.current?.innerHTML ?? '');
					copied ? toast.success('Texto removido da área de transferência!') : toast.success('Texto copiado para a área de transferência!');
				}}
				aria-label="Copiar texto"
			>
				{copied ? <FiTrash2 color="red" size={20} /> : <FiCopy size={20} />}
			</button>
			{/* Estilos específicos para otimizar a impressão */}
			<style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-news-container, #print-news-container * {
            visibility: visible;
          }
          #print-news-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .news-card {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

			{/* Grid de Notícias */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{articles.map((article, index) => (
					<article
						key={index}
						className="news-card flex flex-col justify-between bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
					>
						{/* Imagem de Capa */}
						{article.urlToImage && (
							<div className="relative w-full h-48 overflow-hidden bg-gray-100">
								<img
									src={article.urlToImage}
									alt={article.title}
									className="w-full h-full object-cover"
									loading="lazy"
									onError={(e) => {
										// Oculta a imagem se o link falhar ao carregar
										e.currentTarget.style.display = 'none';
									}}
								/>
							</div>
						)}

						{/* Conteúdo do Card */}
						<div className="p-5 flex-1 flex flex-col justify-between">
							<div>
								{/* Fonte e Autor */}
								<div className="flex items-center justify-between text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wider">
									<span>{article.source?.name || 'Notícia'}</span>
									{article.author && (
										<span className="text-gray-500 font-normal normal-case truncate max-w-[150px]">
											Por {article.author}
										</span>
									)}
								</div>

								{/* Título */}
								<h2 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
									{article.title}
								</h2>

								{/* Descrição */}
								{article.description && (
									<p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
										{article.description}
									</p>
								)}
							</div>

							{/* Rodapé do Card */}
							<div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
								<span>{formatDate(article.publishedAt)}</span>
								{article.url && (
									<a
										href={article.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-indigo-600 font-medium hover:underline print:text-gray-600"
									>
										Ler matéria original &rarr;
									</a>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}));

NewsPrintLayout.displayName = 'NewsPrintLayout';

export default NewsPrintLayout;