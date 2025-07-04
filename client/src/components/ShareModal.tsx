import React from 'react';
import { useToast } from '../context/ToastContext';

interface ShareModalProps {
  isVisible: boolean;
  onClose: () => void;
  recommendations: Array<{
    title: string;
    reason: string;
  }>;
  mood: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isVisible, onClose, recommendations, mood }) => {
  const { showToast } = useToast();
  if (!isVisible) return null;

  const shareText = `🌸 My MoodiNeko Anime Recommendations 🌸\n\nFeeling: ${mood}\n\nRecommendations:\n${recommendations
    .map((rec, index) => `${index + 1}. ${rec.title} - ${rec.reason}`)
    .join('\n')}\n\nGet your own recommendations at MoodiNeko!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        showToast('Recommendations copied to clipboard!', 'success');
      })
      .catch(() => {
        showToast('Failed to copy to clipboard', 'error');
      });
  };

  const shareOnTwitter = () => {
    const twitterText = `I'm feeling ${mood} and MoodiNeko recommended these anime for me:\n${recommendations
      .slice(0, 2)
      .map(rec => rec.title)
      .join(', ')}\n\nGet your own recommendations!`;
    
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal show" id="shareModal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Share Your Recommendations</h3>
          <button className="modal-close" onClick={onClose} id="closeShareBtn">&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="manga-panel">
            <h4 className="mb-2 font-bold">Your Mood</h4>
            <p className="mb-4">{mood}</p>
            
            <h4 className="mb-2 font-bold">Your Recommendations</h4>
            <ul className="list-disc pl-5 mb-4">
              {recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.title}</strong> - {rec.reason}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <button className="manga-button" onClick={copyToClipboard}>
              📋 Copy to Clipboard
            </button>
            
            <button className="manga-button" onClick={shareOnTwitter}>
              🐦 Share on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
