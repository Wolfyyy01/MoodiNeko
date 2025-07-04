import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onClose,
  isVisible
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);
  
  if (!visible) return null;
  
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };
  
  return (
    <div className={`toast-container ${visible ? 'toast-visible' : ''}`}>
      <div className={`toast ${typeClasses[type]}`}>
        <span className="toast-icon">{icons[type]}</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;