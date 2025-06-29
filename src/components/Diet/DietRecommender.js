import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiClipboard, FiPlus, FiMinus } from 'react-icons/fi';
import { getDietRecommendation } from '../../services/diet';
import '../../styles.css';

const DietRecommender = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState({
    studyTime: '',
    mood: '',
    diet: '',
    preferences: '',
    allergies: '',
    nutrition: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (name, value) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answers.studyTime || !answers.mood || !answers.diet) return;
    
    setIsLoading(true);
    try {
      const result = await getDietRecommendation(answers);
      setRecommendation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`diet-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button 
          className="diet-toggle"
          onClick={() => setIsOpen(true)}
        >
          <FiClipboard /> Diet Tips
        </button>
      ) : (
        <motion.div 
          className="diet-window"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="diet-header">
            <h3>AI Diet Recommender</h3>
            <button onClick={() => setIsOpen(false)} title="Close">
              <FiX />
            </button>
          </div>

          {!recommendation ? (
            <form onSubmit={handleSubmit} className="diet-form">
              <div className="diet-question">
                <p>When are you studying?</p>
                <div className="diet-options">
                  {['Morning', 'Afternoon', 'Night'].map(time => (
                    <label key={time}>
                      <input
                        type="radio"
                        name="studyTime"
                        checked={answers.studyTime === time}
                        onChange={() => handleInputChange('studyTime', time)}
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </div>

              <div className="diet-question">
                <p>How are you feeling?</p>
                <div className="diet-options">
                  {['Sleepy', 'Stressed', 'Focused', 'Tired', 'Energetic'].map(mood => (
                    <label key={mood}>
                      <input
                        type="radio"
                        name="mood"
                        checked={answers.mood === mood}
                        onChange={() => handleInputChange('mood', mood)}
                      />
                      {mood}
                    </label>
                  ))}
                </div>
              </div>

              <div className="diet-question">
                <p>Your diet preference?</p>
                <div className="diet-options">
                  {['Veg', 'Non-Veg', 'Vegan', 'Keto', 'Gluten-Free'].map(diet => (
                    <label key={diet}>
                      <input
                        type="radio"
                        name="diet"
                        checked={answers.diet === diet}
                        onChange={() => handleInputChange('diet', diet)}
                      />
                      {diet}
                    </label>
                  ))}
                </div>
              </div>

              <div className="diet-advanced-toggle">
                <button 
                  type="button" 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? <FiMinus /> : <FiPlus />}
                  Additional Preferences
                </button>
              </div>

              {showAdvanced && (
                <div className="diet-advanced">
                  <div className="diet-input-group">
                    <label>Preferred Ingredients:</label>
                    <input
                      type="text"
                      value={answers.preferences}
                      onChange={(e) => handleInputChange('preferences', e.target.value)}
                      placeholder="e.g., oats, berries, chicken"
                    />
                  </div>

                  <div className="diet-input-group">
                    <label>Allergies/Restrictions:</label>
                    <input
                      type="text"
                      value={answers.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      placeholder="e.g., nuts, dairy, gluten"
                    />
                  </div>

                  <div className="diet-input-group">
                    <label>Nutritional Focus:</label>
                    <input
                      type="text"
                      value={answers.nutrition}
                      onChange={(e) => handleInputChange('nutrition', e.target.value)}
                      placeholder="e.g., high protein, low carb"
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="diet-submit"
                disabled={!answers.studyTime || !answers.mood || !answers.diet || isLoading}
              >
                {isLoading ? 'Generating...' : 'Get Recommendation'}
              </button>
            </form>
          ) : (
            <div className="diet-result">
              <h4>🥗 Recommended for {answers.studyTime.toLowerCase()}:</h4>
              <p><strong>Snack:</strong> {recommendation.snack}</p>
              <p><strong>Drink:</strong> {recommendation.drink}</p>
              {recommendation.ingredients && (
                <p><strong>Ingredients:</strong> {recommendation.ingredients}</p>
              )}
              <p><strong>Why?</strong> {recommendation.reason}</p>
              <button 
                onClick={() => setRecommendation(null)}
                className="diet-back"
              >
                Start Over
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DietRecommender;