import { useApp } from '../context/AppContext';
import { ACTIONS } from '../context/AppContext';
import { getText } from '../utils/helpers';

export const useLanguage = () => {
  const { state, dispatch } = useApp();
  
  // Change language
  const setLanguage = (language) => {
    dispatch({ type: ACTIONS.SET_LANGUAGE, payload: language });
  };
  
  // Toggle between Thai and English
  const toggleLanguage = () => {
    const newLanguage = state.language === 'th' ? 'en' : 'th';
    setLanguage(newLanguage);
  };
  
  // Get text in current language
  const t = (textObj) => {
    return getText(textObj, state.language);
  };
  
  // Get text in specific language
  const getTextInLanguage = (textObj, language) => {
    return getText(textObj, language);
  };
  
  // Check if current language is Thai
  const isThaiLanguage = () => {
    return state.language === 'th';
  };
  
  // Check if current language is English
  const isEnglishLanguage = () => {
    return state.language === 'en';
  };
  
  return {
    language: state.language,
    setLanguage,
    toggleLanguage,
    t,
    getTextInLanguage,
    isThaiLanguage,
    isEnglishLanguage
  };
};
