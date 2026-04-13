import React from 'react';

export default function SleekSpinner() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      width: '100%'
    }}>
      <div className="sleek-loader"></div>
      <p style={{ 
        marginTop: '20px', 
        color: 'var(--text-muted)', 
        fontSize: '0.9rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontWeight: '500'
      }}>
        Gathering Data...
      </p>
      <style>{`
        .sleek-loader {
          width: 50px;
          height: 50px;
          border: 3px solid var(--primary-light);
          border-radius: 50%;
          border-top-color: var(--primary-accent);
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
