import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage, generateId } from '../utils/helpers';

// Initial state
const initialState = {
  // Language settings
  language: 'th',
  
  // Products
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  
  // Cart
  cart: {
    items: [],
    total: 0,
    itemCount: 0
  },
  
  // User
  user: null,
  
  // UI state
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'featured',
  filters: {
    inStock: false,
    priceRange: null,
    sizes: []
  }
};

// Action types
export const ACTIONS = {
  // Language
  SET_LANGUAGE: 'SET_LANGUAGE',
  
  // Products
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_FEATURED_PRODUCTS: 'SET_FEATURED_PRODUCTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  
  // Cart
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  
  // User
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  
  // UI
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_FILTERS: 'SET_FILTERS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };
      
    case ACTIONS.SET_FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: action.payload
      };
      
    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
      
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case ACTIONS.ADD_TO_CART: {
      const { product, size, color, quantity = 1 } = action.payload;
      const currentItems = state.cart?.items || [];
      const existingItemIndex = currentItems.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          id: product.id,
          cartItemId: generateId(),
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity,
          inStock: product.inStock
        };
        newItems = [...currentItems, newItem];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0);
      
      const newCart = {
        items: newItems,
        total,
        itemCount
      };
      
      // Save to localStorage
      storage.set('cart', newCart);
      
      return {
        ...state,
        cart: newCart
      };
    }
    
    case ACTIONS.REMOVE_FROM_CART: {
      const currentItems = state.cart?.items || [];
      const newItems = currentItems.filter(item => item.cartItemId !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0);

      const newCart = {
        items: newItems,
        total,
        itemCount
      };

      storage.set('cart', newCart);

      return {
        ...state,
        cart: newCart
      };
    }
    
    case ACTIONS.UPDATE_CART_ITEM: {
      const { cartItemId, quantity } = action.payload;
      const currentItems = state.cart?.items || [];
      const newItems = currentItems.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0);

      const newCart = {
        items: newItems,
        total,
        itemCount
      };

      storage.set('cart', newCart);

      return {
        ...state,
        cart: newCart
      };
    }
    
    case ACTIONS.CLEAR_CART:
      storage.remove('cart');
      return {
        ...state,
        cart: {
          items: [],
          total: 0,
          itemCount: 0
        }
      };
      
    case ACTIONS.LOAD_CART: {
      const savedCart = storage.get('cart');
      return {
        ...state,
        cart: savedCart || {
          items: [],
          total: 0,
          itemCount: 0
        }
      };
    }
    
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };
      
    case ACTIONS.LOGOUT_USER:
      return {
        ...state,
        user: null
      };
      
    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
      
    case ACTIONS.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
      
    case ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };
      
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    dispatch({ type: ACTIONS.LOAD_CART });
    
    // Load saved language preference
    const savedLanguage = storage.get('language');
    if (savedLanguage) {
      dispatch({ type: ACTIONS.SET_LANGUAGE, payload: savedLanguage });
    }
  }, []);
  
  // Save language preference when it changes
  useEffect(() => {
    storage.set('language', state.language);
  }, [state.language]);
  
  const value = {
    state,
    dispatch
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
