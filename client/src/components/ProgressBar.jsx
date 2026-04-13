import React, { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;
    
    const handleStart = () => {
      setVisible(true);
      setProgress(10);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 5;
        });
      }, 200);
    };

    const handleStop = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    };

    window.addEventListener('loading-start', handleStart);
    window.addEventListener('loading-stop', handleStop);

    return () => {
      window.removeEventListener('loading-start', handleStart);
      window.removeEventListener('loading-stop', handleStop);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #9C4336 0%, #FF7B72 100%)',
        boxShadow: '0 0 10px rgba(156, 67, 54, 0.7)',
        zIndex: 9999,
        transition: 'width 0.3s ease, opacity 0.3s ease',
        opacity: progress === 100 ? 0 : 1
      }}
    />
  );
}
