
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

type AnimeCardProps = {
  id?: number;
  title: string;
  description: string;
  image: string;
  url: string;
  reason: string;
  genres?: string[];
};

export default function AnimeCard({ id, title, description, image, url, reason, genres = [] }: AnimeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ratings, setRatings] = useState<{ upvotes: number; downvotes: number }>({ upvotes: 0, downvotes: 0 });
  const [userRating, setUserRating] = useState<'up' | 'down' | null>(null);
  const [isRating, setIsRating] = useState(false);
  
  useEffect(() => {
    // Apply random rotation to the card
    if (cardRef.current) {
      const rotate = (Math.random() * 4) - 2; // -2 to 2 degrees
      cardRef.current.style.setProperty('--card-rotate', `${rotate}deg`);
    }
    
    // Fetch initial ratings if we have an anime ID
    if (id) {
      fetchRatings();
      
      // Check if user has previously rated this anime
      const savedRating = localStorage.getItem(`anime-rating-${id}`) as 'up' | 'down' | null;
      if (savedRating) {
        setUserRating(savedRating);
      }
    }
  }, [id, title, genres]);
  
  // Fetch ratings from the server
  const fetchRatings = async () => {
    if (!id) return;
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/anime/${id}/ratings`);
      if (response.data && response.data.ratings) {
        setRatings(response.data.ratings);
      }
    } catch (error) {
      console.error('Error fetching anime ratings:', error);
    }
  };
  
  // Handle rating submission
  const handleRate = async (rating: 'up' | 'down') => {
    if (!id || isRating) return;
    
    // If user already rated the same way, do nothing
    if (userRating === rating) return;
    
    setIsRating(true);
    
    try {
      // If user is switching their vote, we need to handle both removing the old vote and adding the new one
      const previousRating = userRating;
      const isSwitch = previousRating !== null;
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/rate-anime`, {
        animeId: id,
        rating,
        previousRating: isSwitch ? previousRating : null
      });
      
      if (response.data && response.data.ratings) {
        setRatings(response.data.ratings);
        setUserRating(rating);
        
        // Save the user's rating in localStorage
        localStorage.setItem(`anime-rating-${id}`, rating);
      }
    } catch (error) {
      console.error('Error rating anime:', error);
    } finally {
      setIsRating(false);
    }
  };
  
  return (
    <div ref={cardRef} className="anime-card">
      <div className="recommendation-pin"></div>
      <img 
        src={image} 
        alt={title} 
        className="anime-card-image" 
      />
      <div className="anime-card-content">
        <h3 className="anime-card-title">{title}</h3>
        <p className="anime-card-description">{description}</p>
        <div className="anime-card-reason">"{reason}"</div>
        
        {genres.length > 0 && (
          <div className="mb-3">
            {genres.map((genre, index) => (
              <span key={index} className="genre-chip">{genre}</span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="anime-card-link"
          >
            Watch Now
          </a>
          
          {id && (
            <div className="rating-buttons">
              <button 
                onClick={() => handleRate('up')} 
                className={`rating-button ${userRating === 'up' ? 'active' : ''}`}
                disabled={isRating}
                aria-label="Like"
              >
                👍 <span className="rating-count">{ratings.upvotes}</span>
              </button>
              <button 
                onClick={() => handleRate('down')} 
                className={`rating-button ${userRating === 'down' ? 'active' : ''}`}
                disabled={isRating}
                aria-label="Dislike"
              >
                👎 <span className="rating-count">{ratings.downvotes}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

