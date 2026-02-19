'use client';

import { useState, useEffect } from 'react';

const logMessages = [
  'ENCRYPTING PACKETS...',
  'SECURE CHANNEL ESTABLISHED.',
  'NO BREACH DETECTED.',
  'SYSTEM STATUS: NOMINAL.',
  'MONITORING FOR INTRUSIONS...',
  'FIREWALL INTEGRITY: 100%',
  'SCANNING FOR VULNERABILITIES...',
];

export default function SystemLogs() {
  const [currentLog, setCurrentLog] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * logMessages.length);
      setCurrentLog(logMessages[randomIndex]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-2 left-2 z-50">
      <p className="font-code text-xs text-green-400 p-2 bg-black/50 rounded-sm">
        {currentLog}
      </p>
    </div>
  );
}
