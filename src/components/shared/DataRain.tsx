'use client';

import { useState, useEffect } from 'react';

const DataRain = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code now runs only on the client, after hydration
    const columnCount = Math.floor(window.innerWidth / 16);
    const generatedColumns = Array.from({ length: columnCount }).map((_, i) => {
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * -20;
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
    setColumns(generatedColumns);
    setIsClient(true);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="data-rain-container" aria-hidden="true">
      {isClient && columns.map((col, i) => (
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
