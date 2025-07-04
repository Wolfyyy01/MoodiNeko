import { useState } from 'react';

interface MoodQuizProps {
  onSubmit: (mood: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

interface QuizOption {
  text: string;
  value: string;
}

const MoodQuiz: React.FC<MoodQuizProps> = ({ onSubmit, onClose, isVisible }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  
  const quizQuestions = [
    {
      question: "What would you prefer to do on a weekend?",
      options: [
        { text: "Watch a thrilling action movie", value: "excited energetic" },
        { text: "Curl up with a good book", value: "relaxed peaceful" },
        { text: "Go on an adventure with friends", value: "happy social" },
        { text: "Reflect and meditate alone", value: "introspective calm" }
      ]
    },
    {
      question: "Which color resonates with you today?",
      options: [
        { text: "Vibrant Red", value: "passionate energetic" },
        { text: "Calming Blue", value: "melancholic peaceful" },
        { text: "Cheerful Yellow", value: "optimistic happy" },
        { text: "Deep Purple", value: "mysterious thoughtful" }
      ]
    },
    {
      question: "Which anime trope do you enjoy most?",
      options: [
        { text: "Epic battles and tournaments", value: "excited determined" },
        { text: "Slice of life and heartwarming moments", value: "nostalgic content" },
        { text: "Comedy and lighthearted fun", value: "amused cheerful" },
        { text: "Deep philosophical themes", value: "contemplative serious" }
      ]
    }
  ];
  
  const totalSteps = quizQuestions.length;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleOptionSelect = (value: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentStep]: value
    });
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    // Combine all selected options into a mood string
    const moodValues = Object.values(selectedOptions).join(' ');
    onSubmit(moodValues);
    // Reset quiz state
    setCurrentStep(1);
    setSelectedOptions({});
  };
  
  if (!isVisible) return null;
  
  const currentQuestion = quizQuestions[currentStep - 1];
  
  return (
    <div className="quiz-section" id="quizSection">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="quiz-panel active" data-step={currentStep}>
        <h3 className="quiz-question">{currentQuestion.question}</h3>
        
        <div className="quiz-options">
          {currentQuestion.options.map((option: QuizOption, index: number) => (
            <div 
              key={index}
              className={`quiz-option ${selectedOptions[currentStep] === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
      
      <div className="quiz-navigation">
        <button 
          className={`manga-button ${currentStep === 1 ? 'hidden' : ''}`}
          onClick={handlePrev}
          id="quizPrev"
        >
          Previous
        </button>
        
        {currentStep < totalSteps ? (
          <button 
            className="manga-button"
            onClick={handleNext}
            id="quizNext"
            disabled={!selectedOptions[currentStep]}
          >
            Next
          </button>
        ) : (
          <button 
            className="manga-button"
            onClick={handleSubmit}
            id="quizSubmit"
            disabled={!selectedOptions[currentStep]}
          >
            Get Recommendations
          </button>
        )}
        
        <button 
          className="manga-button"
          onClick={onClose}
          style={{ marginLeft: 'auto' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MoodQuiz;