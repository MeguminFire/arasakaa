'use client';

import { useState, useEffect } from 'react';

const RainColumns = () => {
  // This component will only be rendered on the client.
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 16);
    const generatedColumns = Array.from({ length: columnCount }).map((_, i) => {
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * -20;
      const content = Array.from({ length: 100 })
        .map(() => (Math.random() > 0.5 ? '1' : '0'))
        .join('\n');

      return {
        key: `rain-col-${i}`,
        left: `${(i / columnCount) * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        content: content,
      };
    });
    setColumns(generatedColumns);
  }, []);

  return (
    <>
      {columns.map((col) => (
        <div
          key={col.key}
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
    </>
  );
};


const DataRain = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="data-rain-container" aria-hidden="true">
        <RainColumns />
      </div>
      <div className="flicker-overlay" />
    </>
  );
};

export default DataRain;
