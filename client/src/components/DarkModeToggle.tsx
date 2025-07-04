import { useState, useEffect } from 'react';

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode was previously enabled
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <div className={`dark-mode-toggle ${className}`} onClick={toggleDarkMode}>
      {isDarkMode ? '🌙' : '☀️'}
      <span className={isDarkMode ? 'hidden' : ''}>Light</span>
      <span className={isDarkMode ? '' : 'hidden'}>Dark</span>
    </div>
  );
};

export default DarkModeToggle;