'use client';

import { useMemo } from 'react';

const DataRain = () => {
  const columns = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const columnCount = Math.floor(window.innerWidth / 16);
    return Array.from({ length: columnCount }).map((_, i) => {
      const duration = Math.random() * 10 + 10; // seconds
      const delay = Math.random() * -20; // seconds
      const content = Array.from({ length: 100 })
        .map(() => (Math.random() > 0.5 ? '1' : '0'))
        .join('\n');

      return {
        left: `${(i / columnCount) * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        content: content,
      };
    });
  }, []);

  if (columns.length === 0) return null;

  return (
    <div className="data-rain-container" aria-hidden="true">
      {columns.map((col, i) => (
        <div
          key={i}
          className="data-rain-column absolute top-0"
          style={{
            left: col.left,
            animationDuration: col.animationDuration,
            animationDelay: col.animationDelay,
          }}
        >
          {col.content}
        </div>
      ))}
    </div>
  );
};

export default DataRain;
