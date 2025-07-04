import React, { useState, useEffect } from 'react';

interface SparkleProps {
  children: React.ReactNode;
  color?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

interface SparklePoint {
  id: string;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
    animationDelay: string;
  };
}

const generateSparkle = (color: string, minSize: number, maxSize: number): SparklePoint => {
  const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
  return {
    id: String(Math.random()),
    color,
    size,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      zIndex: 2,
      animationDelay: `${Math.random() * 1}s`,
    },
  };
};

const Sparkle: React.FC<SparkleProps> = ({
  children,
  color = '#FFC700',
  count = 4,
  minSize = 10,
  maxSize = 20,
  className = '',
}) => {
  const [sparkles, setSparkles] = useState<SparklePoint[]>([]);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const sparkle = generateSparkle(color, minSize, maxSize);
      setSparkles(currentSparkles => [...currentSparkles, sparkle]);
      
      // Remove sparkle after animation completes (2s)
      setTimeout(() => {
        setSparkles(currentSparkles =>
          currentSparkles.filter(s => s.id !== sparkle.id)
        );
      }, 2000);
    }, 400);

    // Initial sparkles
    const initialSparkles = Array.from({ length: count }).map(() =>
      generateSparkle(color, minSize, maxSize)
    );
    setSparkles(initialSparkles);

    return () => clearInterval(sparkleInterval);
  }, [color, count, minSize, maxSize]);

  return (
    <span className={`sparkle-wrapper ${className}`}>
      {sparkles.map(sparkle => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            ...sparkle.style,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: sparkle.color,
          }}
        />
      ))}
      <span className="sparkle-child">{children}</span>
    </span>
  );
};

export default Sparkle;