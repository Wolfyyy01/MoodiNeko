import React from 'react';

interface MoodEmojiProps {
  emoji: string;
  isSelected: boolean;
  onClick: () => void;
  label?: string;
}

const MoodEmoji: React.FC<MoodEmojiProps> = ({ emoji, isSelected, onClick, label }) => {
  return (
    <div 
      className={`mood-emoji ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
      title={label}
      role="button"
      aria-pressed={isSelected}
      aria-label={label || `Mood: ${emoji}`}
    >
      {emoji}
    </div>
  );
};

export default MoodEmoji;