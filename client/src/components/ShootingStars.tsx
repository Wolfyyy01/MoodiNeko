import { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const ShootingStars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Create shooting stars
    const createStars = () => {
      const newStars: Star[] = [];
      const starCount = 8; // Number of stars to create

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 20}%`,
          size: Math.random() * 2 + 1, // 1-3px
          duration: Math.random() * 3 + 2, // 2-5s
          delay: Math.random() * 15 // 0-15s
        });
      }

      setStars(newStars);
    };

    createStars();

    // Recreate stars every 20 seconds
    const interval = setInterval(createStars, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shooting-stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size * 30}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;