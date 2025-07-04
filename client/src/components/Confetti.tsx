import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  size: number;
  speed: number;
  shape: 'square' | 'circle' | 'triangle';
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
  pieces?: number;
  colors?: string[];
}

const Confetti: React.FC<ConfettiProps> = ({
  active,
  duration = 3000,
  pieces = 100,
  colors = ['#ff6b9d', '#9c59b6', '#ffcc4d', '#a2d5f2', '#d3a4f7']
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active && !isActive) {
      setIsActive(true);
      const newConfetti: ConfettiPiece[] = [];
      
      const shapes: ('square' | 'circle' | 'triangle')[] = ['square', 'circle', 'triangle'];
      
      for (let i = 0; i < pieces; i++) {
        newConfetti.push({
          id: i,
          x: 50 + (Math.random() * 30 - 15), // Center +/- 15%
          y: 50 + (Math.random() * 10 - 5),  // Center +/- 5%
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          size: Math.random() * 10 + 5, // 5-15px
          speed: Math.random() * 3 + 2,  // 2-5s
          shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
      }
      
      setConfetti(newConfetti);
      
      // Clear confetti after duration
      setTimeout(() => {
        setConfetti([]);
        setIsActive(false);
      }, duration);
    }
  }, [active, duration, pieces, colors, isActive]);

  if (confetti.length === 0) return null;

  return (
    <div className="confetti-container">
      {confetti.map((piece) => {
        let shapeStyle = {};
        
        if (piece.shape === 'circle') {
          shapeStyle = { borderRadius: '50%' };
        } else if (piece.shape === 'triangle') {
          // Triangle is created with border trick
          shapeStyle = {
            width: 0,
            height: 0,
            borderLeft: `${piece.size/2}px solid transparent`,
            borderRight: `${piece.size/2}px solid transparent`,
            borderBottom: `${piece.size}px solid ${piece.color}`,
            backgroundColor: 'transparent'
          };
        }
        
        return (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              transform: `rotate(${piece.rotation}deg)`,
              animationDuration: `${piece.speed}s`,
              ...shapeStyle
            }}
          />
        );
      })}
    </div>
  );
};

export default Confetti;