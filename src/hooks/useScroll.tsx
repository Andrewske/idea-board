import { useEffect, useCallback } from 'react';

const useScroll = () => {
  const scrollLeft = useCallback(() => {
    console.log('scrollLeft');
    const board = document.getElementById('board');
    if (board) {
      board.scrollLeft -= 300;
    }
  }, []);

  const scrollRight = useCallback(() => {
    const board = document.getElementById('board');
    if (board) {
      board.scrollLeft += 300;
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: WindowEventMap['keypress']) => {
      if (e.key === 'ArrowLeft') {
        scrollLeft();
      }
      if (e.key === 'ArrowRight') {
        scrollRight();
      }
    };
    window.addEventListener('keypress', handleKeyPress);

    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [scrollLeft, scrollRight]);

  return { scrollLeft, scrollRight };
};

export default useScroll;
