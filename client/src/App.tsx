import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

// Components
import AnimeCard from './components/AnimeCard';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import MoodEmoji from './components/MoodEmoji';
import FallingPetals from './components/FallingPetals';
import ShootingStars from './components/ShootingStars';
import Sparkle from './components/Sparkle';
import Confetti from './components/Confetti';
import MoodQuiz from './components/MoodQuiz';
import FilterModal from './components/FilterModal';
import ShareModal from './components/ShareModal';
import { useToast } from './context/ToastContext';

// Assets
import logo from './assets/logo.png';

interface AnimeData {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  reason: string;
  genres?: string[];
  episodes?: number;
  type?: string;
}

interface FilterState {
  genres: string[];
  length: string[];
}

export default function App() {
  const [mood, setMood] = useState('');
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedMoodEmoji, setSelectedMoodEmoji] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { showToast } = useToast();
  
  const resultRef = useRef<HTMLDivElement | null>(null);
  const mangaPanelsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Apply random rotations to manga panels
  useEffect(() => {
    if (mangaPanelsRef.current) {
      const panels = mangaPanelsRef.current.querySelectorAll('.manga-panel');
      panels.forEach(panel => {
        const rotate = (Math.random() * 2) - 1; // -1 to 1 degrees
        (panel as HTMLElement).style.setProperty('--panel-rotate', `${rotate}deg`);
      });
    }
  }, []);
  
  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter key to trigger recommendations
      if (e.key === 'Enter' && !loading && mood.trim()) {
        // Only trigger if not in a modal
        if (!showQuiz && !showFilterModal && !showShareModal) {
          handleSubmit();
        }
      }
      
      // Escape key to close share modal
      if (e.key === 'Escape') {
        if (showShareModal) {
          setShowShareModal(false);
        } else if (showFilterModal) {
          setShowFilterModal(false);
        } else if (showQuiz) {
          setShowQuiz(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loading, mood, showQuiz, showFilterModal, showShareModal]);
  
  // Update filtered animes when animes change
  useEffect(() => {
    setFilteredAnimes(animes);
  }, [animes]);
  
  // Focus on input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleMoodEmojiSelect = (emoji: string) => {
    setSelectedMoodEmoji(emoji);
    setMood(emoji);
  };
  
  const handleCustomMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMood(e.target.value);
    if (e.target.value.trim()) {
      setSelectedMoodEmoji(null);
    }
  };
  
  const handleSubmit = async () => {
    if (mood.trim()) {
      try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/recommend`, { mood });
        const data = response.data;
        if (data && data.recommendations) {
          console.log('Received anime data:', data.recommendations);
          setAnimes(data.recommendations);
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
            // Trigger confetti when results are shown
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }, 100);
          showToast(`Found ${data.recommendations.length} anime recommendations for your mood!`, 'success');
        } else {
          showToast('No recommendations found for this mood. Try a different one!', 'error');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        showToast('Failed to fetch recommendations. Please try again later.', 'error');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      showToast('Please enter a mood or select an emoji first', 'error');
    }
  };
  
  const handleQuizSubmit = (quizMood: string) => {
    setMood(quizMood);
    setShowQuiz(false);
    // Auto-submit after quiz
    setTimeout(() => {
      handleSubmit();
    }, 100);
  };
  
  const handleApplyFilters = (filters: FilterState) => {
    console.log('Applying filters:', filters);
    console.log('Current animes:', animes);
    
    if (filters.genres.length === 0 && filters.length.length === 0) {
      // No filters applied, show all recommendations
      console.log('No filters applied, showing all recommendations');
      setFilteredAnimes(animes);
    } else {
      // Filter animes based on selected genres and length
      const filtered = animes.filter(anime => {
        // Check if anime has any of the selected genres
        const genreMatch = filters.genres.length === 0 || 
          (anime.genres && anime.genres.some(genre => {
            const match = filters.genres.includes(genre);
            console.log(`Genre check for ${anime.title}: ${genre} - Match: ${match}`);
            return match;
          }));
        
        // Check if anime matches the selected length criteria
        let lengthMatch = filters.length.length === 0;
        
        if (!lengthMatch && anime.episodes !== undefined) {
          for (const lengthFilter of filters.length) {
            let match = false;
            if (
              (lengthFilter === 'Short (< 13 eps)' && anime.episodes < 13) ||
              (lengthFilter === 'Medium (13-26 eps)' && anime.episodes >= 13 && anime.episodes <= 26) ||
              (lengthFilter === 'Long (> 26 eps)' && anime.episodes > 26) ||
              (lengthFilter === 'Movie' && anime.type === 'OVA')
            ) {
              match = true;
              lengthMatch = true;
            }
            console.log(`Length check for ${anime.title}: ${lengthFilter} (episodes: ${anime.episodes}, type: ${anime.type}) - Match: ${match}`);
            if (match) break;
          }
        }
        
        const finalMatch = genreMatch && lengthMatch;
        console.log(`Final match for ${anime.title}: ${finalMatch} (genreMatch: ${genreMatch}, lengthMatch: ${lengthMatch})`);
        return finalMatch;
      });
      
      console.log('Filtered animes:', filtered);
      setFilteredAnimes(filtered.length > 0 ? filtered : animes);
    }
  };

  return (
    <div>
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Animations */}
      <FallingPetals />
      <ShootingStars />
      <Confetti active={showConfetti} />
      
      <div className="container" ref={mangaPanelsRef}>
        <div className="header">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="MoodiNeko Logo"
              className="h-32 md:h-44 w-auto rounded-full border-2 border-primary-color shadow-lg"
            />
          </div>
          <Sparkle>
            <h1>How are you feeling today?</h1>
          </Sparkle>
          <p>Tell us your mood and we'll find the perfect anime for you!</p>
        </div>
        
        {/* Main Content */}
        <div className="manga-panel">
          <div className="tape top-left"></div>
          <div className="tape top-right"></div>
          <div className="sound-effect top-right">BOOM!</div>
          
          <div className="speech-bubble">
            Select a mood emoji or describe how you're feeling!
          </div>
          
          {/* Mood Emoji Selection */}
          <div className="mood-emoji-container">
            <MoodEmoji 
              emoji="😊" 
              isSelected={selectedMoodEmoji === "😊"} 
              onClick={() => handleMoodEmojiSelect("happy")} 
              label="Happy"
            />
            <MoodEmoji 
              emoji="😢" 
              isSelected={selectedMoodEmoji === "😢"} 
              onClick={() => handleMoodEmojiSelect("sad")} 
              label="Sad"
            />
            <MoodEmoji 
              emoji="😡" 
              isSelected={selectedMoodEmoji === "😡"} 
              onClick={() => handleMoodEmojiSelect("angry")} 
              label="Angry"
            />
            <MoodEmoji 
              emoji="😴" 
              isSelected={selectedMoodEmoji === "😴"} 
              onClick={() => handleMoodEmojiSelect("tired")} 
              label="Tired"
            />
            <MoodEmoji 
              emoji="🤔" 
              isSelected={selectedMoodEmoji === "🤔"} 
              onClick={() => handleMoodEmojiSelect("thoughtful")} 
              label="Thoughtful"
            />
            <MoodEmoji 
              emoji="😍" 
              isSelected={selectedMoodEmoji === "😍"} 
              onClick={() => handleMoodEmojiSelect("in love")} 
              label="In Love"
            />
            <MoodEmoji 
              emoji="😎" 
              isSelected={selectedMoodEmoji === "😎"} 
              onClick={() => handleMoodEmojiSelect("cool")} 
              label="Cool"
            />
            <MoodEmoji 
              emoji="🥺" 
              isSelected={selectedMoodEmoji === "🥺"} 
              onClick={() => handleMoodEmojiSelect("emotional")} 
              label="Emotional"
            />
          </div>
          
          {/* Custom Mood Input */}
          <div className="mt-4 mb-6">
            <input
              type="text"
              id="customMood"
              ref={inputRef}
              value={mood}
              onChange={handleCustomMoodChange}
              placeholder="Or describe your mood here..."
              className="w-full p-3 border-2 border-secondary-color rounded-lg focus:outline-none focus:border-primary-color"
              disabled={loading}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="manga-button" 
              id="recommendBtn"
              onClick={handleSubmit}
              disabled={loading || !mood.trim()}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Loading...
                </>
              ) : (
                'Get Recommendations'
              )}
            </button>
            
            <button 
              className="manga-button" 
              id="takeQuizBtn"
              onClick={() => setShowQuiz(true)}
              disabled={loading}
            >
              Take Mood Quiz
            </button>
          </div>
        </div>
        
        {/* Quiz Section */}
        <MoodQuiz 
          isVisible={showQuiz} 
          onClose={() => setShowQuiz(false)} 
          onSubmit={handleQuizSubmit} 
        />
        
        {/* Results Section */}
        {filteredAnimes.length > 0 && (
          <div id="resultsSection" ref={resultRef}>
            <div className="manga-panel">
              <div className="recommendation-pin"></div>
              <h2 className="text-2xl font-bold mb-4 font-title-font text-primary-color">Your Anime Recommendations</h2>
              
              <div className="flex flex-wrap justify-between mb-4">
                <button 
                  className="manga-button" 
                  id="filterBtn"
                  onClick={() => setShowFilterModal(true)}
                >
                  🔍 Filter
                </button>
                
                <button 
                  className="manga-button" 
                  id="shareBtn"
                  onClick={() => setShowShareModal(true)}
                >
                  📤 Share
                </button>
                
                <button 
                  className="manga-button" 
                  id="newRecommendationBtn"
                  onClick={handleSubmit}
                >
                  🔄 New Recommendations
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredAnimes.map((anime, index) => (
                  <AnimeCard
                    key={index}
                    id={anime.id}
                    title={anime.title}
                    description={anime.description}
                    image={anime.image}
                    url={anime.url}
                    reason={anime.reason}
                    genres={anime.genres}
                  />
                ))}
              </div>
            </div>
            
            {/* Anime of the Day */}
            {filteredAnimes.length > 0 && (
              <div className="manga-panel mt-8">
                <div className="manga-ribbon">
                  <span>Featured</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-title-font text-primary-color">Anime of the Day</h2>
                
                <div className="manga-frame">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img 
                      src={filteredAnimes[0].image} 
                      alt={filteredAnimes[0].title} 
                      className="w-full md:w-1/3 h-auto object-cover rounded"
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-title-font text-primary-color">{filteredAnimes[0].title}</h3>
                      <p className="mb-4">{filteredAnimes[0].description}</p>
                      <a 
                        href={filteredAnimes[0].url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="manga-button inline-block"
                      >
                        Watch Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Modals */}
        <FilterModal 
          isVisible={showFilterModal} 
          onClose={() => setShowFilterModal(false)} 
          onApply={handleApplyFilters} 
        />
        
        <ShareModal 
          isVisible={showShareModal} 
          onClose={() => setShowShareModal(false)} 
          recommendations={animes} 
          mood={mood} 
        />
      </div>
      
      <Footer />
    </div>

  );
}
