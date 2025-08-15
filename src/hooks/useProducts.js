import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { mockAPI } from '../data/products';
import { ACTIONS } from '../context/AppContext';

export const useProducts = () => {
  const { state, dispatch } = useApp();
  
  // Load all products
  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const products = await mockAPI.getProducts();
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [dispatch]);

  // Load featured products
  const loadFeaturedProducts = useCallback(async () => {
    try {
      const featuredProducts = await mockAPI.getFeaturedProducts();
      dispatch({ type: ACTIONS.SET_FEATURED_PRODUCTS, payload: featuredProducts });
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  }, [dispatch]);
  
  // Get product by ID
  const getProductById = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const product = await mockAPI.getProductById(id);
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      return product;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return null;
    }
  };
  
  // Search products
  const searchProducts = async (query, language = 'th') => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const products = await mockAPI.searchProducts(query, language);
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };
  
  // Get products by category
  const getProductsByCategory = async (categoryId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const products = await mockAPI.getProductsByCategory(categoryId);
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
      dispatch({ type: ACTIONS.SET_SELECTED_CATEGORY, payload: categoryId });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };
  
  return {
    products: state.products,
    featuredProducts: state.featuredProducts,
    loading: state.loading,
    error: state.error,
    searchQuery: state.searchQuery,
    selectedCategory: state.selectedCategory,
    sortBy: state.sortBy,
    filters: state.filters,
    loadProducts,
    loadFeaturedProducts,
    getProductById,
    searchProducts,
    getProductsByCategory
  };
};
