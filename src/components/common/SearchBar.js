import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useLanguage } from '../../hooks/useLanguage';
import { debounce } from '../../utils/helpers';
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { searchProducts } = useProducts();
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery) => {
    const debouncedFn = debounce((query) => {
      if (query.trim()) {
        if (onSearch) {
          onSearch(query);
        } else {
          searchProducts(query, language);
          navigate(`/products?search=${encodeURIComponent(query)}`);
        }
      }
    }, 500);
    debouncedFn(searchQuery);
  }, [onSearch, searchProducts, language, navigate]);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        searchProducts(query, language);
        navigate(`/products?search=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsExpanded(false);
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="search-input"
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="search-clear"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          
          <button
            type="submit"
            className="search-button"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
