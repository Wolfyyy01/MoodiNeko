// FloatingCrystal.tsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function FloatingCrystal({ className, style }: Props) {
  const variantIndex = useMemo(() => Math.floor(Math.random() * 3), []);

  const shapes = [
    // === SHAPE 1: rombic sharp
    `<path d="M100,0 L140,30 L180,90 L160,160 L100,200 L40,160 L20,90 L60,30 Z"/>`,
    // === SHAPE 2: pointy shard
    `<path d="M100,0 L130,50 L120,130 L100,200 L80,130 L70,50 Z"/>`,
    // === SHAPE 3: spiky uneven
    `<path d="M100,0 L150,20 L170,100 L130,180 L70,180 L30,100 L50,20 Z"/>`,
  ];

  const cracks = [
    `<path d="M100,0 L100,200" stroke="#f0f" stroke-opacity="0.2" stroke-width="1"/>`,
    `<path d="M60,30 L160,160" stroke="#f0f" stroke-opacity="0.1" stroke-width="1"/>`,
    `<path d="M140,30 L40,160" stroke="#f0f" stroke-opacity="0.1" stroke-width="1"/>`,
  ];

  const fullCrystalSVG = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crystalGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ec4899" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.9" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      ${shapes[variantIndex].replace(
        '/>',
        ` fill="url(#crystalGradient)" stroke="#fff" stroke-opacity="0.05" stroke-width="3" filter="url(#glow)" />`
      )}
      ${cracks.join('\n')}
    </svg>
  `;

  return (
    <motion.div
      className={`absolute w-40 h-40 ${className}`}
      style={style}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      dangerouslySetInnerHTML={{ __html: fullCrystalSVG }}
    />
  );
}
