import React, { useState } from 'react';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  genres: string[];
  length: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    length: []
  });

  // Common anime genres from Jikan API
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
    'Sports', 'Supernatural', 'Music', 'Thriller', 'Psychological',
    'Mecha', 'Shounen', 'Shoujo', 'Seinen', 'Josei',
    'Ecchi', 'Harem', 'Isekai', 'Magic', 'School'
  ];

  const lengths = [
    'Short (< 13 eps)', 'Medium (13-26 eps)', 'Long (> 26 eps)', 'Movie'
  ];

  const toggleGenre = (genre: string) => {
    setFilters(prev => {
      const newGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: newGenres };
    });
  };

  const toggleLength = (length: string) => {
    setFilters(prev => {
      const newLengths = prev.length.includes(length)
        ? prev.length.filter(l => l !== length)
        : [...prev.length, length];
      return { ...prev, length: newLengths };
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="modal show" id="filterModal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Filter Recommendations</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="filter-group">
            <h4 className="filter-title">Genres</h4>
            <div className="filter-options">
              {genres.map(genre => (
                <div 
                  key={genre}
                  className={`filter-chip ${filters.genres.includes(genre) ? 'selected' : ''}`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4 className="filter-title">Length</h4>
            <div className="filter-options">
              {lengths.map(length => (
                <div 
                  key={length}
                  className={`filter-chip ${filters.length.includes(length) ? 'selected' : ''}`}
                  onClick={() => toggleLength(length)}
                >
                  {length}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="manga-button" onClick={onClose} id="cancelFilterBtn">Cancel</button>
          <button className="manga-button" onClick={handleApply} id="applyFilterBtn">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;