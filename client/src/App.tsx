import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingCrystal from './components/FloatingCrystal';

import logo from './assets/logo.png';
import axios from 'axios';
import AnimeCard from './components/AnimeCard';
import Footer from './components/Footer';

export default function App() {
  const [mood, setMood] = useState('');
  const [animes, setAnimes] = useState<{ title: string; description: string; image: string; url: string; reason: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef<HTMLDivElement | null>(null);


  const handleSubmit = async () => {
    if (mood.trim()) {
      try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/recommend`, { mood });
        const data = response.data;
        if (data && data.recommendations) {
          setAnimes(data.recommendations);

          // Scroll la rezultate după setare
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100); // Mic delay pentru a asigura că DOM-ul s-a actualizat
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };


  return (<div className=' bg-gradient-to-br from-black via-purple-900 to-pink-900 backdrop-blur-3xl'> <div className="min-h-screen text-white flex items-center justify-center px-4 relative overflow-hidden">
    {/* Fundal: Cristale plutitoare  */}
    <FloatingCrystal className="top-20 left-10" />
    <FloatingCrystal className="top-[60%] right-16 scale-125" />
    <FloatingCrystal className="top-[30%] left-[60%] scale-90" />
    <FloatingCrystal className="top-[70%] left-[25%] scale-60" />

    <motion.div
      className="text-center max-w-2xl w-full z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-center mb-6 glow">
        <img src={logo}
          alt="MoodiNeko Logo"
          className="h-44 w-auto rounded-full border-2 border-pink-400/60 shadow-lg shadow-pink-500/40" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">
        How are you feeling today?
      </h1>
      <p className="text-lg mb-6 text-pink-300 drop-shadow-[0_0_4px_rgba(255,0,255,0.5)]">
        Tell us your mood and we’ll find the perfect anime for you!
      </p>

      {/* Input cu buton integrat */}
      <div className="flex items-center bg-black/50 border border-pink-500 rounded-full p-1 max-w-xl mx-auto shadow-lg shadow-pink-500/30">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder={loading ? 'Loading...' : "I'm feeling..."}
          disabled={loading}
          className={`flex-grow bg-transparent text-white placeholder-pink-400 px-4 py-2 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={'bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full transition shadow-md shadow-pink-500/40 ' + (loading ? 'cursor-not-allowed opacity-70' : '')}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </div>
          ) : (
            'Recommend'
          )}
        </button>
      </div>

    </motion.div>

    {/* Carduri anime */}


  </div>
    {animes && (
      <motion.div
        ref={resultRef}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {animes.map((anime, index) => (
          <AnimeCard
            key={index}
            title={anime.title}
            description={anime.description}
            image={anime.image}
            url={anime.url}
            reason={anime.reason}
          />
        ))}
      </motion.div>
    )}

    <Footer />
  </div>
  );
}
