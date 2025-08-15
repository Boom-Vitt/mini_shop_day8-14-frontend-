// Utility functions for the Thai clothing store

// Format price in Thai Baht
export const formatPrice = (price) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get text based on current language
export const getText = (textObj, language = 'th') => {
  return textObj[language] || textObj.th || textObj.en || '';
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate Thai phone number
export const isValidThaiPhone = (phone) => {
  const phoneRegex = /^(\+66|0)[0-9]{8,9}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Format Thai phone number
export const formatThaiPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('66')) {
    return `+66 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
};

// Calculate cart total
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Calculate cart item count
export const calculateCartItemCount = (cartItems) => {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if product is in stock
export const isProductInStock = (product) => {
  return product && product.inStock;
};

// Get available sizes for a product
export const getAvailableSizes = (product) => {
  return product?.sizes || [];
};

// Get available colors for a product
export const getAvailableColors = (product) => {
  return product?.colors || [];
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Convert image URL to different sizes (for responsive images)
export const getImageUrl = (url, size = 'medium') => {
  if (!url) return '';
  
  const sizeMap = {
    small: 'w=200',
    medium: 'w=400',
    large: 'w=800'
  };
  
  if (url.includes('unsplash.com')) {
    return url.includes('?') 
      ? `${url}&${sizeMap[size]}` 
      : `${url}?${sizeMap[size]}`;
  }
  
  return url;
};

// Sort products
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-th':
      return sorted.sort((a, b) => a.name.th.localeCompare(b.name.th, 'th'));
    case 'name-en':
      return sorted.sort((a, b) => a.name.en.localeCompare(b.name.en));
    case 'featured':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    default:
      return sorted;
  }
};

// Filter products
export const filterProducts = (products, filters) => {
  let filtered = [...products];
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock);
  }
  
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filtered = filtered.filter(product => 
      product.price >= min && product.price <= max
    );
  }
  
  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(product => 
      product.sizes.some(size => filters.sizes.includes(size))
    );
  }
  
  return filtered;
};
