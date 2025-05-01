// src/components/DemoVideoModal.jsx
import React from 'react';

const DemoVideoModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '90%'
      }}>
        <video controls autoPlay width="100%">
          <source src="/demo/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#2b538d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DemoVideoModal;
