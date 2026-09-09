import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    // Atualiza a largura no estado
    const handleResize = () => setWidth(window.innerWidth);

    // Adiciona o escutador de redimensionamento
    window.addEventListener('resize', handleResize);

    // Limpa o evento ao desmontar o componente para evitar vazamento de memória
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}