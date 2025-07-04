import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Create petals on component mount
    const createPetals = () => {
      const newPetals: Petal[] = [];
      const petalCount = 20;

      for (let i = 0; i < petalCount; i++) {
        newPetals.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: Math.random() * 15 + 10, // 10-25px
          duration: Math.random() * 10 + 8, // 8-18s
          delay: Math.random() * 10 // 0-10s
        });
      }

      setPetals(newPetals);
    };

    createPetals();

    // Recreate petals every 30 seconds to keep animation fresh
    const interval = setInterval(createPetals, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`
          }}
        />
      ))}
    </>
  );
};

export default FallingPetals;