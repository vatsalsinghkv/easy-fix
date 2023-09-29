import React, { useState, useEffect } from 'react';

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);  // To track hover

  const baseStyle = {
    display: visible ? 'block' : 'none',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 99,
    border: 'none',
    outline: 'none',
    color: 'var(--color-text)',          // Set text color
    cursor: 'pointer',
    padding: '15px',
    borderRadius: '50%',
    transition: 'all 0.3s',
    width: '60px',
    height: '60px',
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: '30px',
    boxShadow: hovered ? '0 4px 8px var(--color-dark-3)' : '0 2px 5px var(--color-dark-2)', // Darker shadow on hover
    backgroundColor: hovered ? 'var(--color-dark-3)' : 'var(--color-bg)', // Darker background on hover
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      ↑
    </button>
  );
};

export default ScrollUpButton;
