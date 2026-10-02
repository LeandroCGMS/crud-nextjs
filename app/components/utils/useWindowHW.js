import { useState, useEffect } from 'react';

export default function useWindowSizeHW() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Define o tamanho inicial assim que o componente renderiza no cliente
    handleResize();

    // Adiciona o listener para atualizar ao redimensionar a janela
    window.addEventListener('resize', handleResize);

    // Limpa o listener ao desmontar o componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}